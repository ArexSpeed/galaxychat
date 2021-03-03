import React from 'react'
import { useStateValue } from "../StateProvider";
import "../styles/Messages.scss";

const Messages = () => {
  const [{ user, active, color, usersList }, dispatch] = useStateValue();
  return (
    <>
      <p className={`message`}>
        <span className="message__name">Maark</span>
        Hello
        <span className="message__timestamp">
          10.10.10
        </span>
      </p>
      <p className={`message message__reciever ${color}`}>
        <span className="message__name">Maark</span>
        Hello
        <span className="message__timestamp">
          10.10.10
        </span>
      </p>
      <p className={`message`}>
        <span className="message__name">Maark</span>
        Hello
        <span className="message__timestamp">
          10.10.10
        </span>
      </p>
    </>
  )
}

export default Messages
