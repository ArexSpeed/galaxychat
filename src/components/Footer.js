import React, {useState} from 'react'
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import firebase from "firebase";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import SendIcon from '@material-ui/icons/Send';
import MicIcon from "@material-ui/icons/Mic";
import PauseIcon from '@material-ui/icons/Pause';

import '../styles/Footer.scss';

const Footer = ({roomId}) => {
  const [{user,color}] = useStateValue();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [input, setInput] = useState('')
  const [voiceOn, setVoiceOn] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput("")
  }

  // Speech recognition
  const speechToText = () => {
    setVoiceOn(true)
    resetTranscript();
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }
    SpeechRecognition.startListening({ continuous: true })
  }
  const speechCancel = () => {
    setVoiceOn(false);
    setInput(transcript)
    SpeechRecognition.stopListening();
    resetTranscript();
  }

  return (
    <>
      <form onSubmit={sendMessage} className="footer__form">
        <button type="submit" className={`footer__send ${color}`}>
            <SendIcon />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Type or record a message"
            className={`footer__input ${color}`}
          />  
        </form>
        {!voiceOn ?
         ( <MicIcon className={`footer__mic ${color}`} onClick={speechToText}/>)
        : ( <PauseIcon className={`footer__mic ${color}`} onClick={speechCancel} />) } 
        
    </>
  )
}

export default Footer
