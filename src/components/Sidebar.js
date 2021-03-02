import React from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import SidebarChat from './SidebarChat'

import '../styles/Sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar active">
      <div className="sidebar__header">
        <Avatar />
        <h3 className="sidebar__header-name">Arex</h3>
        <div className="sidebar__header-right">
          <IconButton>
            <InvertColorsIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <SearchOutlined />
        <input type="text" placeholder="Find your chat" />
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
      </div>
    </div>
  );
}

export default Sidebar
