import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import AddIcon from '@material-ui/icons/Add';
import AddChat from './AddChat';

import '../styles/SidebarChat.scss'

const SidebarChat = ({addNewChat, id, bg}) => {
  const [{ active,color }, dispatch] = useStateValue();
  const [openAddChat, setOpenAddChat] = useState(false);



  return !addNewChat ? (
    <Link to={`/rooms/${id}`} onClick={() => dispatch({ type: actionTypes.SET_ACTIVE, payload: !active })}>
      <div className={`sidebarChat ${color}`} style={{background: bg ? `url(${bg}) no-repeat center center / cover` : `transparent`}}>

      <div className="sidebarChat__info">
        <h2>Chat</h2>
        <p>Last message</p>
      </div>
    </div>
    </Link>
  ) 
  :
  (
    <>
  <div onClick={() => setOpenAddChat(!openAddChat)} className={`sidebarChat add ${color}`}>
    <AddIcon />
  </div>
    <AddChat open={openAddChat} setOpen={setOpenAddChat} />
  </>
  )
}

export default SidebarChat
