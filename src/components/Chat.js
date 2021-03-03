import React, {useState, useEffect}  from 'react'
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";

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

  const showUsersToAdd = (  
      <>
      <input type="checkbox" id="Arek" className="chat__addUsers-input" onChange={(e) => console.log(e.target.value)} />
      <label htmlFor="Arek" className={`chat__addUsers-label ${color}`}><span>Arek</span></label> 
      <input type="checkbox" id="Tom" className="chat__addUsers-input" onChange={(e) => console.log(e.target.value)} />
      <label htmlFor="Tom" className={`chat__addUsers-label ${color}`}><span>Tom</span></label> 
      <input type="checkbox" id="Sven" className="chat__addUsers-input" onChange={(e) => console.log(e.target.value)} />
      <label htmlFor="Sven" className={`chat__addUsers-label ${color}`}><span>Sven</span></label> 
      </>  
  )


  return (
    <div className={!active ? "chat active" : "chat"}>
      <div className="chat__header">
        <div onClick={() => dispatch({ type: actionTypes.SET_ACTIVE, payload: !active })}
         className={`chat__header-switch ${color}`}>
          <ListIcon  />
        </div>
        <IconButton>
            <EditChat room={'room'} />
        </IconButton>
        <div className="chat__header-info">
          <h3>Room Name</h3>
          <p>last seen </p>
        </div>
        <div className="chat__header-right">
        <IconButton>
            <EditChatBg room={'room'} />
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
