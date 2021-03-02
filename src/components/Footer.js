import React from 'react'
import SendIcon from '@material-ui/icons/Send';
import MicIcon from "@material-ui/icons/Mic";
import PauseIcon from '@material-ui/icons/Pause';

import '../styles/Footer.scss';

const Footer = () => {
  const voiceOn = true
  return (
    <>
      <form className="footer__form">
        <button type="submit" className="footer__send">
            <SendIcon />
          </button>
          <input
            value=""
            onChange={e => console.log(e.target.value)}
            type="text"
            placeholder="Type or record a message"
            className="footer__input"
          />
          
        </form>
        {!voiceOn ?
         ( <MicIcon className="footer__mic"/>)
        : ( <PauseIcon className="footer__mic" />) } 
        
    </>
  )
}

export default Footer
