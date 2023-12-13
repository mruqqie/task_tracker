"use client"
import React, { useState } from 'react';
import TaskForm from './TaskForm';

const Header = () => {
  const [isFormVisible, setFormVisibility] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!isFormVisible);
  };

  return (
    <header className="bg-purple-700 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Task Tracker</h1>
      <button
        onClick={toggleFormVisibility}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md"
      >
        <span className="hidden sm:inline">Create New Task</span>
        <span className="sm:hidden">+</span>
      </button>
      {isFormVisible && <TaskForm onClose={toggleFormVisibility} />}
    </header>
  );
};

export default Header