export interface Mission {
  _id?: string;
  name: string;
  status: MissionStatus;
  priority: Priority;
  description: string;
}

export enum MissionStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
}

export enum Priority {
  High = "High",
  Low = "Low",
}
