import React from 'react'

import "../styles/Messages.scss";

const Messages = () => {
  return (
    <>
      <p className={`message`}>
        <span className="message__name">Maark</span>
        Hello
        <span className="message__timestamp">
          10.10.10
        </span>
      </p>
      <p className={`message message__reciever`}>
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
