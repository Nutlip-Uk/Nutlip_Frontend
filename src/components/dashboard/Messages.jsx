import { useState } from "react";
import styles from "../../styles/dashboard/messages.module.css";
import { AiOutlineSend } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";

const Messages = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "James" },
    { id: 2, name: "David" },
    { id: 3, name: "Joshua" },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const onSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
    // Reset messages when a new user is selected
  };

  // const sendMessage = () => {
  //   if (messageInput.trim() !== "") {
  //     const newMessage = {
  //       id: Date.now(),
  //       text: messageInput,
  //       userId: selectedUser.id,
  //     };
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  //     setMessageInput("");
  //     console.log(messages)
  //   }
  // };


  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      // User's message
      const userMessage = { text: messageInput, sender: "user", date: new Date().toLocaleTimeString() };
      setMessages([...messages, userMessage]);

      // Clear input field
      setMessageInput("");

      // Simulate a delay and then receive a response message
      setTimeout(() => {
        const receiverMessage = {
          text: "This is a simulated reply!",
          sender: "receiver", // 'receiver' indicates the other user sent the message
        };
        setMessages((prevMessages) => [...prevMessages, receiverMessage]);
      }, 1000); // Simulates a 1 second delay for the receiver's message
    }
  };


  return (
    <div className={styles.Section}>
      <div className={styles.NavContainer}>
        <h1 className={styles.Header}>Messages</h1>

        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <img src="/navbar/search.svg" />
            <input type="text" placeholder="Search chat" />
          </div>
        </div>
      </div>

      <div className={styles.messageContainer}>
        <div className={styles.chatList}>
          <UserList
            users={users}
            onSelectUser={onSelectUser}
            selectedUser={selectedUser}
          />
        </div>
        <div className={styles.chatBox}>
          <ChatMessages
            selectedUser={selectedUser}
            messages={messages}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;

const UserList = ({ users, onSelectUser, selectedUser }) => {
  return (
    <div className={styles.UsersContainer}>
      <ul className={styles.UsersList}>
        {users.map((user) => (
          <div
            id={styles.User}
            className={selectedUser && selectedUser.id === user.id ? styles.Selected : ""}
            key={user.id}
            onClick={() => onSelectUser(user)}
          >
            <div className={styles.UserImg}>
              <img src="/dashboard/user.png" alt="" />
            </div>

            <div className={styles.UserInfo}>
              <div className={styles.UserNameTime}>
                <p>{user.name}</p>
                <p>12:04 pm</p>
              </div>

              <p className={styles.MessageNofi}>Hi! I’m interested in...</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

const ChatMessages = ({ selectedUser, messages, messageInput, setMessageInput, sendMessage }) => {
  if (selectedUser == null) {
    return (
      <div className={styles.noChat}>
        <p>Select a user to start a conversation</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.chatBoxHeader}>
        <div className={styles.ChatBoxName}>
          <img src="/dashboard/user.png" height={50} width={50} />
          <p>{selectedUser.name}</p>
        </div>

        <button className={styles.call}>
          <img src="/dashboard/call.svg" alt="" />
        </button>
      </div>

      <div className={styles.chatBoxBody}>
        <div className={styles.Messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "user"
                  ? styles.userMessage
                  : styles.receiverMessage
              }
            >
              <p>{msg.text}</p>
              <p className={styles.messageDate}>{msg.date}</p>
            </div>
          ))}
        </div>
        <div className={styles.chatInput}>
          <button>
            <FaPlus size={24} />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>
            <AiOutlineSend color="black" size={25} />
          </button>
        </div>
      </div>
    </>
  );
};