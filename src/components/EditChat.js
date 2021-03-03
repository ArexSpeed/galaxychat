import React, {useState, useEffect} from 'react'
import { useStateValue } from "../StateProvider";
import db from "../firebase";

import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import "../styles/EditChat.scss";

const EditChat = ({room}) => {
  const [{color}] = useStateValue();
  const [editBox, setEditBox] = useState(false)
  const [roomData, setRoomData] = useState([])
  const [newName, setNewName] = useState('')

  useEffect(() => {
    if (room) {
      db.collection("rooms")
        .doc(room)
        .onSnapshot(snapshot => setRoomData(snapshot.data()));
    }
  }, [room])
  //another useEffect cause it will change even when we switch chat
  useEffect(() => {
  setNewName(roomData.name)
  }, [roomData])

  const editName = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(room).update({
      name: newName,
    });
    setEditBox(!editBox)
  }

  return (
    <div>
      <EditIcon onClick={() => setEditBox(!editBox)} />
      {editBox && 
      (<form onSubmit={editName} className={`editChat__form ${color}`}>
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="editChat__input" />
        <button type="submit" className="editChat__button">
          <CheckIcon />
        </button>
      </form>)
      }
    </div>
  )
}

export default EditChat
