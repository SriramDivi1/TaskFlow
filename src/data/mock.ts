import { Task, User } from '../types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Mclaren Audi',
  email: 'mclaren@gmail.com',
  role: 'UI/UX Designer',
  avatar: 'https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwZmFjZXxlbnwxfHx8fDE3Njk4NzExNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
};

export const MOCK_USERS: User[] = [
  CURRENT_USER,
  {
    id: 'u2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1680104073282-8462cdf70b6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUybWFuJTIwcHJvZmVzc2lvbmFsJTIwZmFjZXxlbnwxfHx8fDE3Njk4NzExNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 'u3',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Web Designing',
    description: 'Design the new landing page for the marketing campaign.',
    date: new Date(),
    startTime: '10:00 AM',
    endTime: '12:30 PM',
    category: 'Designing',
    priority: 'High',
    progress: 60,
    assignees: [MOCK_USERS[0], MOCK_USERS[1]],
    completed: false
  },
  {
    id: 't2',
    title: 'UX Research',
    description: 'Conduct user interviews and analyze feedback.',
    date: new Date(),
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    category: 'Academics',
    priority: 'Medium',
    progress: 30,
    assignees: [MOCK_USERS[0]],
    completed: false
  },
  {
    id: 't3',
    title: 'Client Meeting',
    description: 'Discuss project requirements with the client.',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    category: 'Business',
    priority: 'High',
    progress: 0,
    assignees: [MOCK_USERS[2]],
    completed: false
  }
];
