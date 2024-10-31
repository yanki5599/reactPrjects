export interface Mission {
  _id: string;
  name: string;
  status: MissionStatus;
  priority: Priority;
  description: string;
}

enum MissionStatus {
  Pending = "Pending",
  Progress = "In Progress",
  Completed = "Completed",
}

enum Priority {
  High = "High",
  Low = "Low",
}
