export type Priority = 'High' | 'Medium' | 'Low';
export type Category = 'Marketing' | 'Family' | 'Sports' | 'Academics' | 'Entertainment' | 'Art' | 'Business' | 'Designing';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  category: Category;
  priority: Priority;
  progress: number; // 0-100
  assignees: User[];
  completed: boolean;
}
