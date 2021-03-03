import React, {useState} from 'react'
import { useStateValue } from "../StateProvider";
import db from '../firebase';

import CheckIcon from '@material-ui/icons/Check';
import {backgrounds} from './data'

import "../styles/AddChat.scss";

const AddChat = ({open, setOpen}) => {
  const [{ user, active, color, usersList }, dispatch] = useStateValue();
  const [selectedUsers, setSelectedUsers] = useState([
    {
      id: user.uid,
      name: user.displayName
    }
  ])
  const [openUsersList, setOpenUsersList] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [roomBg, setRoomBg] = useState('')

  const showUsersList = (
    <>
    <div className={`addChat__select ${color}`} onClick={() => setSelectedUsers([])}>Open Chat</div>
    {usersList.map((user,i) => (
      <div key={i} className={`addChat__select ${color}`}  onClick={() => setSelectedUsers(select => [...select,{id: user.id, name: user.name}])}>{user.name}</div>
    )) }
    </>
  )

  const createChat = (e) => {
    e.preventDefault()
    if(roomName) {
      db.collection("rooms").add({
        name: roomName,
        background: roomBg,
        users: selectedUsers
      });
    }
    setOpen(!open)
  }

  return (
    open &&
    <div className={`addChat__container ${color}`}>
      <form className="addChat__form" onSubmit={createChat}>
        <label htmlFor="roomName">Room Name:</label>
          <input
                name="series"
                label="series"
                type="text"
                className={`addChat__input ${color}`}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value )}
              />

       <label htmlFor="backgrounds">Background:</label> 
       <div className="addChat__form-bg" id="backgrounds">
       {backgrounds.map(bg => 
       <div className={`addChat__form-bg-item ${color} `} onClick={() => setRoomBg(bg)}>
         {roomBg === bg && <span className="addChat__form-bg-check"><CheckIcon style={{fontSize: 40}} /></span>}
         <img src={bg} alt="bg" className="addChat__form-bg-img" />
       </div>)}
       </div>
       <label htmlFor="users">Users:</label> 
        {selectedUsers.length<1 ? 
          (
            <p className="addChat__userselect">Open Chat</p>
          ) :
          (
          selectedUsers.map((user,i) => 
            <p key={i} className="addChat__userselect">{user.name}
            <span className="addChat__userselect-delete"
               onClick={() => {
                const deleting = selectedUsers.filter(usr => usr.id !== user.id)
                setSelectedUsers(deleting)
                }}>
                  -
            </span>
          </p>)
          )
        }

       <div onClick={() => setOpenUsersList(!openUsersList)} className="addChat__userselect-add">+</div>
        <div className="addChat__userlist">
          {openUsersList && showUsersList}
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
