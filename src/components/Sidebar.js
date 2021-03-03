import React, {useState} from 'react';
import { useStateValue } from "../StateProvider";
import { Avatar, IconButton } from "@material-ui/core";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import SidebarChat from './SidebarChat'

import {backgrounds} from './data'
import '../styles/Sidebar.scss';

const Sidebar = () => {
  const [openColors, setOpenColors] = useState(false)
  const [{ user, active, color, usersList }, dispatch] = useStateValue();

  //Change color
  const changeColor = e => {
    let colorVal = e.target.value;
    dispatch({ type: "SET_COLOR", payload: colorVal });
    setOpenColors(!openColors)
  };
  
  return (
    <div className={!active ? "sidebar" : "sidebar active"}>
      <div className="sidebar__header">
        <Avatar />
        <h3 className="sidebar__header-name">Arex</h3>
        <div className="sidebar__header-right">
          <IconButton>
          <InvertColorsIcon onClick={() => setOpenColors(!openColors)}/>
            {openColors && (
              <div className="sidebar__header-colors">
                <button value='blue' onClick={changeColor} className='sidebar__header-colors-button color-blue'></button>
                <button value='green' onClick={changeColor} className='sidebar__header-colors-button color-green'></button>
                <button value='red' onClick={changeColor} className='sidebar__header-colors-button color-red'></button>
              </div>
            )}
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
      <div className={`sidebar__chats ${color}`}>
        <SidebarChat addNewChat />

        <SidebarChat />
        <SidebarChat bg={backgrounds[2]}/>
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar
