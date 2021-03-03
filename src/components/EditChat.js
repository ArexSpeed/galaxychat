import React, {useState, useEffect} from 'react'
import { useStateValue } from "../StateProvider";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import "../styles/EditChat.scss";

const EditChat = ({room}) => {
  const [{color}, dispatch] = useStateValue();
  const [editBox, setEditBox] = useState(false)
  const [roomData, setRoomData] = useState([])
  const [newName, setNewName] = useState('Chat Name')
  return (
    <div>
      <EditIcon onClick={() => setEditBox(!editBox)} />
      {editBox && 
      (<form onSubmit={() => console.log('edit')} className={`editChat__form ${color}`}>
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
