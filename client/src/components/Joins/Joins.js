import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// hooks are a new addition to function-based components
import './Joins.css';

const Joins = () => {
    // passing empty string for intial value of name
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=>setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)} /></div>
                <Link onClick={event=>(!name || !room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

// at line 16, we will be able to read the name and the room from our chat component // we actually see data entered
// now we need to prevent user to go to chat page without entering room and name
export default Joins;
