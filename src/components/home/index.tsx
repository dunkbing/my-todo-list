import React from 'react';
import TaskList from '../task';
import TaskProvider from '../task/context';

const HomePage: React.FC = () => (
  <TaskProvider>
    <TaskList />
  </TaskProvider>
);

export default HomePage;