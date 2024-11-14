import { ObjectId } from "mongoose";
import userModel from "../models/userModel";
import ErrorResponse from "../utils/ErrorResponse";
import organizationModel, { Organization } from "../models/organizationModel";
import AttackingMissileModel, {
  AttackingMissile,
  MissileStatus,
} from "../models/AttackingMissileModel";
import missileModel, { Missile } from "../models/missileModel";
import { ConcurrentArray } from "../utils/ConcurrentArray";

export interface AttackDto {
  attackerId: string | ObjectId;
  destination: string;
  attackerMissileTypeId: string;
}

export interface DefenderDto {
  defenderId: ObjectId;
  missileId: ObjectId;
  attackerMissileId: ObjectId;
}

const attackingMissiles = new ConcurrentArray<{
  missile: AttackingMissile;
  timer: NodeJS.Timeout;
  _id: ObjectId;
}>();

export default class MissileService {
  public static attack = async ({
    attackerId,
    destination,
    attackerMissileTypeId: missileId,
  }: AttackDto) => {
    // validate fields
    if (!attackerId || !destination || !missileId)
      throw new ErrorResponse("missing fields", 400);

    // validate
    const attackerDoc = userModel.findById(attackerId);
    if (!attackerDoc) throw new ErrorResponse("unable to find attacker", 400);

    // validate destination
    const idfOrganizations = (await organizationModel.find())
      .filter((org) => org.name.startsWith("IDF"))
      .map((org) => org.name.slice(6));
    console.log(idfOrganizations);

    if (!idfOrganizations.includes(destination))
      throw new ErrorResponse("invalid destination", 400);

    return await this.launchMissile(attackerId, destination, missileId);
  };

  public static interceptMissile = async ({
    defenderId,
    missileId,
    attackerMissileId,
  }: DefenderDto) => {
    // defender
    const defender = await userModel.findById(defenderId);
    if (!defender) throw new ErrorResponse("defender not exist", 404);

    // launched missile
    const attackerMissile = await AttackingMissileModel.findById(
      attackerMissileId
    );
    if (!attackerMissile)
      throw new ErrorResponse("attackerMissile not exist", 404);

    // defender's missile
    const defMissile = await missileModel.findById(missileId);
    if (!defMissile) throw new ErrorResponse("missile defender not found", 404);

    if (!defMissile.intercepts.includes(attackerMissile.missileId))
      throw new ErrorResponse(
        `missile:${defMissile.name} cannot intercept missile: ${attackerMissile.id}`,
        404
      );

    // intercept missile
    const attackInArray = (await attackingMissiles.getArray()).find(
      (att) => att._id == attackerMissileId
    );

    if (!attackInArray)
      throw new ErrorResponse("missile already exploded or intercepted", 404);

    clearTimeout(attackInArray.timer);

    const updated = await AttackingMissileModel.findOneAndUpdate(
      attackInArray._id,
      { status: MissileStatus.Intercepted },
      { new: true }
    );
    return updated;
  };

  private static async launchMissile(
    attackerId: ObjectId | string,
    destination: string,
    missileId: ObjectId | string
  ) {
    const missileType = await missileModel.findById(missileId);
    if (!missileType) throw new ErrorResponse("unknown missile", 400);

    const eta = new Date();
    eta.setSeconds(eta.getSeconds() + missileType.speed);

    // add to DB
    const launched = await AttackingMissileModel.create({
      attackerId,
      missileId,
      destination,
      status: MissileStatus.Launched,
      eta: eta,
    });

    // // add to array
    const timer = await this.SetExplosionTimer(missileType.speed, launched.id);

    await attackingMissiles.add({
      missile: launched,
      timer,
      _id: launched._id,
    });

    return launched;
    // add socket event
  }

  private static async SetExplosionTimer(
    timeout: number,
    id: string
  ): Promise<NodeJS.Timeout> {
    console.log(await attackingMissiles.getArray());
    // setInterval(async () => {
    //   const missile = await AttackingMissileModel.findById(id);
    //   console.log("time: ", missile?.status);
    // }, 1000);

    return setTimeout(async () => {
      // explode missile
      attackingMissiles.remove(id);
      const missile = await AttackingMissileModel.findByIdAndUpdate(id, {
        status: MissileStatus.Hit,
      });

      // save to db
      await missile?.save();
      // send to socket
    }, timeout * 5000);
  }
}
