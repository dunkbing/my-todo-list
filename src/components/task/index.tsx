import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css';
import { TaskFormProps } from './task.model';
import TaskItem from './task-item';
import TaskProvider, { useTasks, withTaskContext } from './context';
import { FirebaseContextProp, withFirebase } from '../firebase';
import { UserContextProp, withAuthentication } from '../session/context';

const TaskList: React.FC<FirebaseContextProp> = ({firebase}) => {

  const [showForm, setShowForm] = useState<boolean>(false);
  const { tasks } = useTasks()!;

  const openForm = () => {
    setShowForm(!showForm);
  }

  const TaskFormComponent = withFirebase(withAuthentication(TaskForm));

  return (
    <div className="task-list">
      {tasks.map(({title, content, timeStamp, task_id, user_id}, index) => <TaskItem key={task_id} title={title} timeStamp={timeStamp} content={content} />)}
      {!showForm ? 
        <Button variant="text" onClick={openForm}>
          Add task
        </Button> : null}
      {showForm ? <TaskFormComponent /> : null}
    </div>
  );
}

const TaskForm: React.FC<TaskFormProps & FirebaseContextProp & UserContextProp> = ({openForm, firebase, authUser}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { tasks, setTasks } = useTasks()!;
  const addTask = () => {
    firebase.task().add({user_id: authUser?.uid, title, content, timeStamp: new Date()})
      .then(({id}) => {
        setTasks([...tasks, {task_id: id, user_id: authUser?.uid, title, content, timeStamp: new Date()}]);
        console.log(id)
      });
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


export default () => {
  const TaskConsumer = withTaskContext(withFirebase(TaskList));
  return (
    <TaskProvider>
      <TaskConsumer />
    </TaskProvider>
  );
};