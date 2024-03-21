import React, { useState } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md"
import { AiOutlineEdit } from "react-icons/ai";
import { BsCheckSquareFill } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ImCheckboxUnchecked } from "react-icons/im";
import './Action.css'

const Action = ( {task, onComplete, onDelete, onEdit } ) => {

    const [editingTitle, setEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [editMode, setEditMode] = useState(false);
    const [showModalItem, setShowModalItem] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleEdit = () => {
        if (!editingTitle) {
            setEditingTitle(true);
            setEditMode(true);
        } else {
            if (newTitle.trim() !== "") {
                setEditingTitle(false);
                onEdit(task.id, newTitle);
                setEditMode(false);
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        }
    };

    const handleChange = (e) => {
        setNewTitle(e.target.value);
        setIsValid(true);
    };

    const handleConfirmDeleteItem = () => {
        onDelete(task.id);
        setShowModalItem(false);
    };

  return (
    <div class="container custom-container">
        <div className='box'>
            <div class="task-box p-3 mb-3 rounded">
                <div class="row row-cols-2 border border-0">
                    <div class="col-md-8 ps-3">
                        <div class="d-flex align-items-center">
                            {!editingTitle && (
                                <button class='box-icon my-1 me-2 bg-transparent border border-0' onClick={() => onComplete(task.id)}>
                                    {task.isCompleted ? <BsCheckSquareFill size={25}/> : <ImCheckboxUnchecked size={25}/>}
                                </button>
                            )}

                            {editingTitle ? (
                                <div class="input-container">
                                        <input
                                            class={`edit-input ms-2 bg-transparent border border-0 ${isValid ? '' : 'is-invalid'}`}
                                            type="text"
                                            value={newTitle}
                                            onChange={handleChange}
                                            onBlur={handleEdit}
                                            autoFocus
                                        />
                                        {!isValid && (
                                            <div class="invalid-feedback d-block ms-2 border-top fw-italic" style={{ color: '#F4512C'}}>
                                                !Task cannot be empty
                                            </div>
                                        )}
                                </div>
                                
                            ) : (
                                <p class={task.isCompleted ? "textCompleted mb-0 d-flex align-items-center justify-content-start border border-0 bg-transparent" : "textUncompleted mb-0 fw-bold d-flex align-items-center justify-content-start"}>
                                    {task.title}
                                </p>
                            )}
                        </div>
                    </div>

                    <div class="col-md-4 pe-3 d-flex align-items-center justify-content-end">
                        {editMode ? (
                            <button class='check-circle pe-5 border border-0 bg-transparent' onClick={handleEdit}>
                                <AiOutlineCheckCircle size={30}/>
                            </button>
                        ) : (
                            <button class='edit-icon border border-0 bg-transparent' onClick={handleEdit}>
                                <AiOutlineEdit size={30}/>
                            </button>
                        )}
                        
                        {!editingTitle && (
                            <button class='de-icon border border-0 bg-transparent' onClick={() => setShowModalItem(task)} data-bs-toggle="modal" data-bs-target="#deleteModal">
                                <MdOutlineDeleteOutline size={30}/>
                            </button>
                            
                        )}
                    </div>

                    <div class="col-md-8 ps-3 border-border-5 d-flex align-items-center">
                        <p class={task.isCompleted ? "completed-date mb-0 ps-2 pt-2" : " uncompleted-date mb-0 ps-2 pt-2"}>
                            Created at {task.createdAt}
                        </p>
                                        
                    </div>

                    <div class="col-md-4 border border-0"></div>
                </div>
            </div>
        </div>
        
        {showModalItem && (
            <div class="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">    
                        <div class="modal-header">
                            <h5 class="modal-title fw-bold" id='ModalLabel'>{`Confirm Deletion of '${showModalItem.title}'`}</h5>
                            <button type="button" className="btn-close" onClick={() => setShowModalItem(false)} data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="ps-0.5">Are you sure you want to delete this task?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="delete-button" onClick={handleConfirmDeleteItem} data-bs-dismiss="modal">Yes, Delete</button>
                            <button type="button" className="cancel-button" onClick={() => setShowModalItem(false)} data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Action
