import React, {useState, useEffect}  from 'react'

import Messages from './Messages';
import { Avatar, IconButton } from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from '@material-ui/icons/Edit';
import ImageIcon from '@material-ui/icons/Image';
import Footer from './Footer';

import "../styles/Chat.scss";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat__header">
        <div className={`chat__header-switch`}>
          <ListIcon />
        </div>
        <IconButton>
          <EditIcon />
        </IconButton>
        <div className="chat__header-info">
          <h3>Room Name</h3>
          <p>last seen </p>
        </div>
        <div className="chat__header-right">
          <IconButton>
            <ImageIcon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
          <Messages />
      </div>
      <div className="chat__footer">
      
        <Footer />
      </div>
    </div>
  );
}

export default Chat
