import { ObjectId } from "mongoose";
import userModel from "../models/userModel";
import ErrorResponse from "../utils/ErrorResponse";
import organizationModel, { Organization } from "../models/organizationModel";
import AttackingMissileModel, {
  AttackingMissile,
  MissileStatus,
} from "../models/AttackingMissileModel";
import missileModel from "../models/missileModel";
import { ConcurrentArray } from "../utils/ConcurrentArray";

export interface AttackDto {
  attackerId: string | ObjectId;
  destination: string;
  missileId: string;
}

export interface DefenderDto {
  defenderId: ObjectId;
  missileId: ObjectId;
  attackerMissileId: ObjectId;
}

const attackingMissiles = new ConcurrentArray<AttackingMissile>();

export default class MissileService {
  public static attack = async (attacker: AttackDto) => {
    // validate fields
    if (
      !attacker ||
      !attacker.attackerId ||
      !attacker.destination ||
      !attacker.missileId
    )
      throw new ErrorResponse("missing fields", 400);

    // validate
    const attackerDoc = userModel.findById(attacker.attackerId);
    if (!attackerDoc) throw new ErrorResponse("unable to find attacker", 400);

    // validate destination
    const idfOrganizations = (
      await organizationModel.where((org: Organization) =>
        org.name.startsWith("IDF")
      )
    ).map((org) => org.name.slice(5));

    if (!idfOrganizations.includes(attacker.destination))
      throw new ErrorResponse("invalid destination", 400);

    this.launchMissile(
      attacker.attackerId,
      attacker.destination,
      attacker.missileId
    );
  };

  public static interceptMissile = async (def: DefenderDto) => {
    const defender = await userModel.findById(def.defenderId);
    if (!defender) throw new ErrorResponse("defender not exist", 404);

    const attackerMissile = await AttackingMissileModel.findById(
      def.attackerMissileId
    );
    if (!attackerMissile)
      throw new ErrorResponse("attackerMissile not exist", 404);
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
      destination,
      status: MissileStatus.Launched,
      eta: eta,
    });

    // add to array
    attackingMissiles.add(launched);
    this.SetExplosionTimer(missileType.speed, launched.id);

    // add socket event
  }

  private static SetExplosionTimer(
    timeout: number,
    id: string
  ): NodeJS.Timeout {
    return setTimeout(async () => {
      // explode missile
      // save to db
      // send to socket
    }, timeout);
  }
}
