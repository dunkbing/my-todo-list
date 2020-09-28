export interface Task {
  title: string;
  content: string;
  timeStamp: Date;
}

export interface TaskFormProps {
  openForm: () => void;
}