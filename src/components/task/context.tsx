import React, { useState, createContext, useContext, useEffect } from 'react';
import { Task } from './task.model';

type TaskContextType = {
  tasks: Task[];
  setTasks: (value: Task[]) => void;
};
const TaskContext = createContext<TaskContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode
};

const TaskProvider: React.FC<Props> = ({children}: Props) => {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks([]);
  }, []);

  return (
    <TaskContext.Provider value={{tasks, setTasks}}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
export const useTasks = () => useContext(TaskContext);
export const withTaskContext = (Component: React.FC<any>) => (props: any) => {
  return (
    <TaskContext.Consumer>
      {() => <Component {...props} />}
    </TaskContext.Consumer>
  );
};
