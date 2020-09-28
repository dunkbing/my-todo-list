import React from 'react';
import { Task } from './task.model';

const TaskItem: React.FC<Task> = ({title, content, timeStamp}) => {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{content}</h4>
      <span>{timeStamp.toDateString()}</span>
    </div>
  );
}

export default TaskItem;