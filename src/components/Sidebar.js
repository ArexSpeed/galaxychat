import React, {useState} from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import SidebarChat from './SidebarChat'

import '../styles/Sidebar.scss';

const Sidebar = () => {
  const [openColors, setOpenColors] = useState(false)
  return (
    <div className="sidebar active">
      <div className="sidebar__header">
        <Avatar />
        <h3 className="sidebar__header-name">Arex</h3>
        <div className="sidebar__header-right">
          <IconButton>
          <InvertColorsIcon onClick={() => setOpenColors(!openColors)}/>
            {openColors && (
              <div className="sidebar__header-colors">
                <button value='green' onClick={() => console.log('change')} className='sidebar__header-colors-button color-blue'></button>
                <button value='red' onClick={() => console.log('change')} className='sidebar__header-colors-button color-green'></button>
                <button value='blue' onClick={() => console.log('change')} className='sidebar__header-colors-button color-red'></button>
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
      <div className="sidebar__chats">
        <SidebarChat addNewChat />

        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar
