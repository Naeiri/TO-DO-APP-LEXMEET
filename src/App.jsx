import React, { useEffect, useState } from 'react'
import {Header, Task} from './components'
import "bootstrap/dist/css/bootstrap.min.css"

const LOCAL_STORAGE_KEY = "todo:savedTasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, [])

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskTitle) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskTitle,
        isCompleted: false,
        isEditing: false,
        createdAt: new Date().toLocaleString()
      }
    ]);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map(task => {
      if(task.id == taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        }
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function editTaskById(taskId, newTitle) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          title: newTitle
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function confirmDeleteTasks(){
    setTasksAndSave([]);
    setShowModal(false);
  }

  function markAllDoneTasks() {
    const newTasks = tasks.map(task => ({
      ...task,
      isCompleted: true
    }));
    setTasksAndSave(newTasks);
  }

  function unmarkAllTasks() {
    const newTasks = tasks.map(task => ({
      ...task,
      isCompleted: false
    }));
    setTasksAndSave(newTasks);
  }


  return (
    <>
      <Header onAddTask={addTask}/>
      <Task 
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        setTasksAndSave={setTasksAndSave}
        onEdit={editTaskById}
        confirmDelete={confirmDeleteTasks}
        markAllDone={markAllDoneTasks}
        unmarkAll={unmarkAllTasks}
      />
      
    </>
  )
}

export default App