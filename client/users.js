// for managing users joining in and out and keeping track of what users are in what room

const users = [];
const addUser = ({ id, name, room }) => {
    // if user enters ravleen we will change it as all lowercase and as one word
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    // check if user already exists

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (existingUser) {
        return { error: "User already exists" }
    }
    // store user
    const user = { id, name, room };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index != -1) {
        return users.splice(index, 1)[0];  // removing user from users array
    }
}

const getUser = (id) => users.find((user) => user.id === id);
const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room);
}

module.exports = {addUser,removeUser,getUser,getUsersInRoom};