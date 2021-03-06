import React, {useState, useEffect} from 'react'
import { useStateValue } from "../StateProvider";
import ImageIcon from '@material-ui/icons/Image';
import CheckIcon from '@material-ui/icons/Check';
import db from "../firebase";
import { backgrounds } from './data';
import "../styles/EditChat.scss";

const EditChatBg = ({room}) => {
  const [{color}, dispatch] = useStateValue();
  const [editBox, setEditBox] = useState(false)
  const [roomData, setRoomData] = useState([])
  const [newBg, setNewBg] = useState('')

  useEffect(() => {
    if (room) {
      db.collection("rooms")
        .doc(room)
        .onSnapshot(snapshot => setRoomData(snapshot.data()));
    }
  }, [room])
  useEffect(() => {
  setNewBg(roomData.background)
  }, [roomData])

  const editBg = () => {
    db.collection("rooms").doc(room).update({
      background: newBg,
    });
    setEditBox(!editBox)
    console.log(newBg, "newName")
  }


  return (
    <>
      <ImageIcon onClick={() => setEditBox(!editBox)} />
      {editBox && 
     <div className={`editChatBg__container ${color}`}>
     <div className={`editChatBg__wrapper ${color}`}>
     {backgrounds.map(bg => 
     <div className={`editChatBg__item ${color}`} onClick={() => setNewBg(bg)}>
       {newBg === bg && <span className="editChatBg__check"><CheckIcon style={{fontSize: 40}} /></span>}
       <img src={bg} alt="bg" className="editChatBg__img" />
     </div>)}
     </div>
     <butto className="editChatBg__button" onClick={editBg}>OK</butto>
     </div>
      }
    </>
  )
}

export default EditChatBg
