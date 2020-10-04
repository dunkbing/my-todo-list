import React from 'react';
import { TaskItemProps } from './task.model';

const TaskItem: React.FC<TaskItemProps> = ({title, content, timeStamp}) => {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{content}</h4>
      <span>{timeStamp?.toDateString()}</span>
    </div>
  );
}

export default TaskItem;