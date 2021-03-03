import React from 'react'
import { useStateValue } from "../StateProvider";
import CheckIcon from '@material-ui/icons/Check';
import {backgrounds} from './data'

import "../styles/AddChat.scss";

const AddChat = ({open, setOpen}) => {
  const [{ user, active, color, usersList }, dispatch] = useStateValue();
  return (
    open &&
    <div className={`addChat__container ${color}`}>
      <form className="addChat__form" onSubmit={() => console.log('submit')}>
        <label htmlFor="roomName">Room Name:</label>
        <input
                name="series"
                label="series"
                type="text"
                className={`addChat__input ${color}`}
                value=''
                onChange={(e) => console.log(e.target.value )}
              />

       <label htmlFor="backgrounds">Background:</label> 
       <div className="addChat__form-bg" id="backgrounds">
       {backgrounds.map(bg => 
       <div className={`addChat__form-bg-item ${color} `} onClick={() => console.log(bg)}>
         {<span className="addChat__form-bg-check"><CheckIcon style={{fontSize: 40}} /></span>}
         <img src={bg} alt="bg" className="addChat__form-bg-img" />
       </div>)}
       </div>
       <label htmlFor="users">Users:</label> 
         <p className="addChat__userselect">Open Chat</p>

      
       <div onClick={() => console.log('add user')} className="addChat__userselect-add">+</div>
        <div className="addChat__userlist">
          <div className={`addChat__select ${color}`} onClick={() => console.log()}>Open Chat</div>
          <div className={`addChat__select ${color}`} onClick={() => console.log()}>Speed</div>
          <div className={`addChat__select ${color}`} onClick={() => console.log()}>Tomo Tom</div>
        </div>
        <div className="addChat__buttons">
        <button type="submit" className="addChat__add">Add Room</button>
        <div className="addChat__cancel" onClick={() => setOpen(!open)}>Cancel</div>
        </div>
      </form>
    </div>
  )
}

export default AddChat
