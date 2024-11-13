import mongoose, { Schema } from "mongoose";
import organizations from "../data/organizations.json";
import missiles from "../data/missiles.json";
import missileModel, { Missile } from "../models/missileModel";
import organizationModel, { Resource } from "../models/organizationModel";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    await seedDB();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

async function seedDB() {
  if ((await missileModel.find()).length === 0) await seedMissiles();
  if ((await missileModel.find()).length === 0) await seedOrganizations();
}

async function seedMissiles() {
  await missileModel.insertMany(
    missiles.map((jsonMissile) => ({
      name: jsonMissile.name,
      description: jsonMissile.description,
      speed: jsonMissile.speed,
      intercepts: [], // fill up later
      price: jsonMissile.price,
    }))
  );

  // fill intercepts
  (await missileModel.find()).forEach(async (missile: Missile) => {
    missile.intercepts = await getIntercepts(missile.name);
  });
}
async function seedOrganizations() {
  organizationModel.insertMany(
    organizations.map(async (org) => ({
      name: org.name,
      budget: org.budget,
      resources: await getResourcesByName(org.name),
    }))
  );
}

async function getResourcesByName(orgName: string): Promise<Resource[]> {
  const jsonOrg = organizations.find((org) => org.name === orgName);
  if (!jsonOrg) throw new Error("failed to load resources");

  const missilesFromDB: Missile[] = await missileModel.find();

  const resources: Resource[] = jsonOrg.resources.map((r) => ({
    amount: r.amount,
    missileId: missilesFromDB.find((m) => m.name === r.name)?._id!,
  }));

  return resources;
}

async function getIntercepts(
  missileName: string
): Promise<Schema.Types.ObjectId[]> {
  const interceptsNames = await missiles.find((m) => m.name === missileName)
    ?.intercepts;

  if (!interceptsNames) return [];

  const interceptsMissiles = await missileModel.find(
    (missile: Missile) => missile.name in interceptsNames
  );

  const interceptsIds = interceptsMissiles.map((m) => m._id);

  return interceptsIds;
}
