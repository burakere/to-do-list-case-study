export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  deadline?:string; // ✅ yeni alan
}
