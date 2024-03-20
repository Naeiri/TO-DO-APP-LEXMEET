import React, { useState } from 'react'
import "./Header.css"
import lmLogo from '../../assets/lm-logo.svg';

const Header = ( {onAddTask}) => {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onAddTask(title)
    setTitle('');
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  return (
    <header class="container-fluid">
      <div class="px-5 pt-5 d-flex justify-content-center">
        <img src={lmLogo} alt="LexMeet Logo" width="50" class="mb-5 me-2"/>
        <p class="title display-5 text-white fw-bolder mb-5">TO-DO LIST</p>
      </div>

      <div class="container custom-container">
        <form onSubmit={handleSubmit} class='create-cmd' >
          <div class="input-group">
            <input 
            class="form-control"
            style={{ color: '#5E1B89'}}
            type="text" 
            placeholder="Add a new task.." 
            value={title}
            onChange={onChangeTitle}
            required 
            />
            <button class="px-5 btn" type="submit">Add</button> 
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header