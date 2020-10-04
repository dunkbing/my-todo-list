export interface Task {
  task_id: string;
  title: string;
  content: string;
  user_id?: string;
  timeStamp?: Date;
}

export interface TaskItemProps {
  title: string;
  content: string;
  timeStamp?: Date;
}

export interface TaskFormProps {
  openForm: () => void;
}