import React, {useState, useEffect} from 'react';
import { useStateValue } from "../StateProvider";
import { Avatar, IconButton } from "@material-ui/core";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";

import SidebarChat from './SidebarChat'

import db from '../firebase';
import '../styles/Sidebar.scss';

const Sidebar = () => {
  const [openColors, setOpenColors] = useState(false)
  const [{ user, active, color, usersList }, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([])
  const [userRooms, setUserRooms] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchRooms, setSearchRooms] = useState([]) //users from search

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(
        snapshot.docs.map(doc => ({
          id: doc.id, 
          name: doc.data().name,
          users: doc.data().users,
          background: doc.data().background,
        }))
      )
    ))
    return () => {
      unsubscribe();
    };
  }, [])

  useEffect(() => {
    setUserRooms([])
    rooms.filter(room => 
      room.users.find(name => name.name === user.displayName) ? setUserRooms(prev => [...prev,room]) : ''
    )
    rooms.filter(room => 
      room.users.length<1 ? setUserRooms(prev => [...prev,room]) : ''
    )
   }, [rooms])

   const searchRoom = (e) => {
    setSearchRooms([])
    setSearchValue(e.target.value)
    userRooms.map(room => room.name.toLowerCase().includes(searchValue.toLowerCase()) ? setSearchRooms(prev => [...prev,room]) : '')
  }


  //Change color
  const changeColor = e => {
    let colorVal = e.target.value;
    dispatch({ type: "SET_COLOR", payload: colorVal });
    setOpenColors(!openColors)
  };
  
  return (
    <div className={!active ? "sidebar" : "sidebar active"}>
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <h3 className="sidebar__header-name">{user.displayName}</h3>
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
        <input type="text" placeholder="Find your chat" onChange={(e) => searchRoom(e)}  />
      </div>
      <div className={`sidebar__chats ${color}`}>
        <SidebarChat addNewChat />
        {searchValue ? (
          searchRooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.name} bg={room.background} />
         ))
        )
        : 
        (
          userRooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.name} bg={room.background} />
         ))
        )
        }

      </div>
    </div>
  );
}

export default Sidebar
