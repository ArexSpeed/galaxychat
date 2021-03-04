import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import db from '../firebase';

import AddIcon from '@material-ui/icons/Add';
import AddChat from './AddChat';

import '../styles/SidebarChat.scss'

const SidebarChat = ({addNewChat, id,name, bg}) => {
  const [{ active,color }, dispatch] = useStateValue();
  const [openAddChat, setOpenAddChat] = useState(false);
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
  }, [id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`} onClick={() => dispatch({ type: actionTypes.SET_ACTIVE, payload: !active })}>
      <div className={`sidebarChat ${color}`} style={{background: bg ? `url(${bg}) no-repeat center center / cover` : `transparent`}}>

      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{messages[0]?.message.slice(0,100)}</p>
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
