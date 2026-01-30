// ----------------------------------------------------------------------

export type KanbanTask = {
  id: string;
  title: string;
  cover: string | null;
  priority: 'low' | 'medium' | 'high';
  status: string;
  assignees: Array<{ id: string; name: string; avatar: string }>;
  commentsCount: number;
  attachmentsCount: number;
  labels: string[];
  dueDate: string;
  description: string;
  subtasks: Array<{ id: string; title: string; completed: boolean }>;
};

export type KanbanColumn = {
  id: string;
  name: string;
  taskIds: string[];
};
