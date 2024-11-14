export interface IUser {
  _id: string;
  username: string;
  organizationId: Organization;
  arsenal: Arsenal;
}

export interface Arsenal {
  resources: Resource[];
  budget: number;
}
export interface Resource {
  missileId: Missile;
  amount: number;
}
export interface Organization {
  _id: string;
  name: string;
  resources: Resource[];
  budget: Number;
}
export interface Missile {
  _id: string;
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  price: number;
}
