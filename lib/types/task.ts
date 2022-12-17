export type TaskStatusId = 1 | 2 | 3;

export const TaskStatusEnum: Record<string, TaskStatusId> = {
  TODO: 1,
  INPROGRESS: 2,
  DONE: 3,
};

export interface Task {
  id: string;
  name: string;
  statusId: TaskStatusId;
}
