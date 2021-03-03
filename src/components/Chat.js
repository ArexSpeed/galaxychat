import React, {useState, useEffect}  from 'react'
import { useParams } from "react-router-dom";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";

import db from "../firebase";
import firebase from "firebase";

import Messages from './Messages';
import EditChat from './EditChat';
import EditChatBg from './EditChatBg';
import Footer from './Footer';

import { IconButton } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MoreVertIcon from "@material-ui/icons/MoreVert";

import "../styles/Chat.scss";

const Chat = () => {
  const [openAddUsers, setOpenAddUsers] = useState(false); // box with users to add
  const [{ user, active, color, usersList }, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [roomBg, setRoomBg] = useState('');
  const [roomName, setRoomName] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([]); //get current users in room and keep add user from checkbox
  const [usersToAdd, setUsersToAdd] = useState([]); //diffrence b'ween userInRoom and userList to show only user who are not in room
  const [messages, setMessages] = useState([]);

  console.log(roomId, 'roomid')
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot(snapshot => {
          setRoomName(snapshot.data().name)
          setUsersInRoom(snapshot.data().users)
          setRoomBg(snapshot.data().background)
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot =>
          setMessages(snapshot.docs.map(doc => doc.data()))
        );
    }
}, [roomId])

//Add new users difference b'tween user in room and users out of room
useEffect(() => {
  const diffUsers = usersList.filter(({ name: id1 }) => !usersInRoom.some(({ name: id2 }) => id2 === id1));
  setUsersToAdd(diffUsers)
}, [usersList, openAddUsers])
//add or delete after checking user and add to db
const addUsersToChat = () => {
  if(roomName) {
    db.collection("rooms").doc(roomId).update({
      users: usersInRoom
    });
  }
  setOpenAddUsers(!openAddUsers)
}

const deleteUserFromRoom = (user) => {
  const deleting = usersInRoom.filter(usr => usr.id !== user.id)
  setUsersInRoom(deleting)
}

  const showUsersToAdd = (  
    usersToAdd.map((user, i) => (
      <>
        <input type="checkbox" id={user.name} className="chat__addUsers-input" onChange={(e) => e.target.checked ? setUsersInRoom(prev => [...prev, user]) : deleteUserFromRoom(user)} />
        <label key={i} htmlFor={user.name} className={`chat__addUsers-label ${color}`}><span>{user.name}</span></label> 
      </>
    )) 
  )


  return (
    <div className={!active ? "chat active" : "chat"}>
      <div className="chat__header">
        <div onClick={() => dispatch({ type: actionTypes.SET_ACTIVE, payload: !active })}
         className={`chat__header-switch ${color}`}>
          <ListIcon  />
        </div>
        <IconButton>
            <EditChat room={roomId} />
        </IconButton>
        <div className="chat__header-info">
          <h3>{roomName}</h3>
          <p>last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
            </p>
        </div>
        <div className="chat__header-right">
        <IconButton>
            <EditChatBg room={roomId} />
        </IconButton>
          <IconButton>
          <GroupAddIcon onClick={() => setOpenAddUsers(!openAddUsers)}/>
            {openAddUsers && (
              <div className={`chat__addUsers ${color}`}>
                {showUsersToAdd}
                <div className="chat__addUsers-buttons">
                  <button className="chat__addUsers-buttons-add" onClick={() => console.log('add')}>Add</button>
                  <button className="chat__addUsers-buttons-cancel" onClick={() => setOpenAddUsers(!openAddUsers)}>Cancel</button>
                </div>
              </div>
            )}
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
          <Messages />
      </div>
      <div className={`chat__footer ${color}`}>
      
        <Footer />
      </div>
    </div>
  );
}

export default Chat
