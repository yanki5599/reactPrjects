export interface Note {
  id: string;
  title: string;
  content: string;
  category: Category;
  createdAt: string;
}

export enum Category {
  Work = "Work",
  Personal = "Personal",
  Shopping = "Shopping",
}
