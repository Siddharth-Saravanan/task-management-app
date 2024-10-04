import { v4 as uuidv4 } from 'uuid';

export const initialColumns = {
  todo: {
    name: 'To Do',
    items: [
      { id: uuidv4(), content: 'Task 1' },
      { id: uuidv4(), content: 'Task 2' },
    ],
  },
  inProgress: {
    name: 'In Progress',
    items: [
      { id: uuidv4(), content: 'Task 3' },
    ],
  },
  completed: {
    name: 'Completed',
    items: [],
  },
};
