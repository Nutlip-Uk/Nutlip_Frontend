import { useState } from "react";
import styles from "../../styles/dashboard/messages.module.css";

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
    setMessages([]); // Clear messages when a new user is selected
  };

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      // Add logic to send message to the selected user
      // You may want to update the messages state or make an API call to your backend
      console.log(`Message sent to ${selectedUser.name}: ${messageInput}`);
      setMessageInput("");
    }
  };

  return (
    <>
      <div className={styles.Section}>
        <div className={styles.NavContainer}>
          <h1 className={styles.Header}>Messages</h1>

          <div className={styles.searchContainer}>
            <div className={styles.search}>
              <img src="/navbar/search.svg" />
              <input type="text" placeHolder="Search chat" />
            </div>
          </div>
        </div>

        <div className={styles.messageContainer}>
          <div className={styles.chatList}>
            <UserList users={users} onSelectUser={onSelectUser} selectedUser={selectedUser}/>
          </div>
          <div className={styles.chatBox}>
            <ChatMessages
              selectedUser={selectedUser}
              messages={messages}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;

const UserList = ({ users, onSelectUser ,selectedUser}) => {
  return (
    <div className={styles.UsersContainer}>
      <ul className={styles.UsersList}>
        {users.map((user) => (
          <div id={styles.User} className={selectedUser && selectedUser.id === user.id ? styles.Selected : ""} key={user.id} onClick={() => onSelectUser(user)}>
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

const ChatMessages = ({ selectedUser, messages, sendMessage }) => {
  return (
    <>
      <div className={styles.chatBoxHeader}>
        <div className={styles.ChatBoxName}>
          <img src="/dashboard/user.png" height={50} width={50}/>
          <p>{selectedUser && <p>{selectedUser.name}</p>}</p>
        </div>

        <button className={styles.call}>
              <img src="/dashboard/call.svg" alt="" />
            </button>
      </div>

      <div>
        
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        {selectedUser && (
          <div>
            <input type="text" />
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
    </>
  );
};
