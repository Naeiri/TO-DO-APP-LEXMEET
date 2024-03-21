import React from 'react'
import "./Task.css"
import Action from '../action/Action'
import { PiTrashSimpleBold } from "react-icons/pi";

const Task = ({ 
  tasks, 
  onComplete, 
  onDelete, 
  onEdit, 
  confirmDelete, 
  markAllDone, 
  unmarkAll, 
}) => {
  const tasksQuantity = tasks.length;
  const completedTask = tasks.filter(task => task.isCompleted).length;

  const handleToggleMarkAll = () => {
    if (completedTask === tasksQuantity) {
      unmarkAll();
    } else {
      markAllDone();
    }
  };
  
  return (
    <div class="container custom-container">
      <div className='wrap'>
        <div class='row mt-5 justify-content-between'>
          <div class='col'>
            <div class='task-name'>
              <h6 class="inline-block fw-bolder">Created Task</h6>
              <span class='ms-3 py-1 px-2 rounded-pill'>{tasksQuantity}</span>
            </div>
          </div>

          <div class='col'>
            <div class='task-name text-end'>
              <p class="text-end inline-block fw-bolder">Completed Task</p>
              <span class='ms-3 py-1 px-2 rounded-pill'>{completedTask} / {tasksQuantity}</span>
            </div>         
        </div>
        </div>

        <div>
          {tasks.length > 0 ? (
            <>
              {tasks.map(task => (
                  <Action 
                    key={task.id} 
                    task={task} 
                    onComplete={onComplete} 
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
              ))}
              <div class="row my-4 justify-content-between">
                <div class="col-4" >
                  <button class='markun-button py-1 px-3 rounded' onClick={handleToggleMarkAll} type="button">
                    {completedTask === tasksQuantity ? 'Unmark all done' : 'Mark all done'}
                  </button>
                </div>
                <div class="col-4 text-end">
                  <button class='delall-button py-1 px-3 rounded' data-bs-toggle="modal" data-bs-target="#deleteAllModal">
                    Delete all tasks
                  </button>
                </div>
                
                <div class="modal fade" id="deleteAllModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <PiTrashSimpleBold size={30} color="#5E1B89" />
                        <h5 class="modal-title ms-2 fw-bold" id="exampleModalLabel">Are you sure?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        Do you really want to <b>delete all tasks</b>? This process cannot be undone.
                      </div>
                      <div class="modal-footer">
                        
                        <button type="button" className="delete-button-all" onClick={confirmDelete} data-bs-dismiss="modal">Delete</button>
                        <button type="button" className="cancel-button-all" data-bs-dismiss="modal">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <hr />
              <p class='emp fs-5 fw-lighter mt-5 text-center '>Looks like you haven’t added any tasks yet. Time to get organized!</p>
              <p class='emp fs-6 fw-light text-center '>Take Control of Your Day with LexMeet To-Do List App.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Task
