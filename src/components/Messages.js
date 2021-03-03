import React, {useEffect, useRef} from 'react'
import { useStateValue } from "../StateProvider";
import "../styles/Messages.scss";

const Messages = ({messages}) => {
  const [{ user, color}] = useStateValue();
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  return (
    <>
    {messages.map((message, i) => (
      <p key={i} className={`message ${message.name === user.displayName && 'message__reciever'} ${color}`}>
        <span className="message__name">{message.name}</span>
          {message.message}
        <span className="message__timestamp">
          {new Date(message.timestamp?.toDate()).toUTCString()}
        </span>
      </p>
    ))}
      <div ref={messagesEndRef} />
    </>
  )
}

export default Messages
