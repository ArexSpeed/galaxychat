import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import AddChat from './AddChat';

import '../styles/SidebarChat.scss'

const SidebarChat = ({addNewChat, id}) => {
  const [openAddChat, setOpenAddChat] = useState(false);


  return !addNewChat ? (
    <Link to={`/rooms/${id}`} onClick={() => console.log('click')}>
      <div className="sidebarChat">

      <Avatar />
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
  <div onClick={() => setOpenAddChat(!openAddChat)} className="sidebarChat add">
    <AddIcon />
  </div>
    <AddChat open={openAddChat} setOpen={setOpenAddChat} />
  </>
  )
}

export default SidebarChat
