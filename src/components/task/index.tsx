import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css';
import { TaskFormProps } from './task.model';
import TaskItem from './task-item';
import TaskProvider, { useTasks } from './context';

const TaskList: React.FC = () => {

  const [showForm, setShowForm] = useState<boolean>(false);
  const { tasks, setTasks } = useTasks()!;

  const openForm = () => {
    setShowForm(!showForm);
  }

  return (
    <div className="task-list">
      {tasks.map(({title, content, timeStamp}, index) => <TaskItem key={title+index} title={title} timeStamp={timeStamp} content={content} />)}
      {!showForm ? 
        <Button variant="text" onClick={openForm}>
          Add task
        </Button> : null}
      {showForm ? <TaskForm openForm={openForm} /> : null}
    </div>
  );
}

const TaskForm: React.FC<TaskFormProps> = ({openForm}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { tasks, setTasks } = useTasks()!;
  const addTask = () => {
    setTasks([...tasks, {title, content, timeStamp: new Date()}]);
    console.log(title)
  }

  const titleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const contentChange = (event: ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

  return (
    <div>
      <TextField label="title" onChange={titleChange} />
      <TextField label="content" onChange={contentChange} />
      <div className="button">
        <Button variant="contained" color="secondary" onClick={addTask}>
          Add task
        </Button>
        <Button variant="contained" onClick={openForm}>
          Cancel
        </Button>
      </div>
    </div>
  )
};


export default TaskList;