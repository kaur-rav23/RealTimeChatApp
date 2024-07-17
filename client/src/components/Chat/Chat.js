import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import TextContainer from '../TextContainer/TextContainer';
// import Message from '../Message/Message';

let socket;

const Chat = () => {
  const location = useLocation(); // Use useLocation hook to get location
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('joins', { name, room }, () => {

    });

    return () => {
      // Disconnect the Socket.IO client
      socket.disconnect();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {   // listening for messages
      setMessages([...messages, message]);  // adding every new message send by anyone to our messages array
    });
  }, [messages]);   // we want to run this use effect only when messages array changes

  // function for sending messages
  const sendMessage = (event) => {
    // preventing the default action of the form
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => {
        setMessage('');  // clearing the input field after sending the message
      });
    }
  };
   
  console.log(message,messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      {/* <TextContainer users={users}/> */}
    </div>
  );
};

export default Chat;

