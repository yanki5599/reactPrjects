export interface Mission {
  id: string;
  name: string;
  status: MissionStatus;
  priority: Priority;
}

enum MissionStatus {
  Pending = "Pending",
  Progress = "Progress",
  Completed = "Completed",
}

enum Priority {
  High = "HIGH",
  Low = "LOW",
}
