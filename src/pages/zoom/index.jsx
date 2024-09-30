import { useState } from "react";
import axios from "axios";
import styles from "../../styles/zoom/zoom.module.css";

function Zoom() {
  const [topic, setTopic] = useState("");
  const [startTime, setStartTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleCreateMeeting = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-meeting",
        {
          topic,
          startTime,
        }
      );

      setMeetingLink(response.data.meetingLink);
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
        alert(
          `Failed to create meeting: ${
            error.response.data.error || JSON.stringify(error.response.data)
          }`
        );
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        alert("Failed to create meeting: No response from server.");
      } else {
        console.error("Error setting up request:", error.message);
        alert(`Failed to create meeting: ${error.message}`);
      }
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/send-email",
        {
          recipientEmail,
          meetingLink,
        }
      );
      console.log(recipientEmail, meetingLink);
      if (response.data.success) {
        setEmailSent(true);
        alert("Email sent successfully!");
      }
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className={styles.zoomcontainer}>
      {!meetingLink ? (
        <div className={styles.zoomcreatemeeting}>
          <h2 className={styles.h2}>Create Zoom Meeting</h2>
          <div className={styles.formgroup}>
            <label className={styles.label}>Meeting Topic</label>
            <input
              type="text"
              placeholder="Enter meeting topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={styles.forminput}
            />
          </div>
          <div className={styles.formgroup}>
            <label className={styles.label}>Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={styles.forminput}
            />
          </div>
          <button className={styles.btnprimary} onClick={handleCreateMeeting}>
            Create Meeting
          </button>
        </div>
      ) : (
        <div className={styles.zoomcreatemeeting}>
          <h2 className={styles.created}>Meeting Created!</h2>
          <div className={styles.meetingLinkbody}>
            <a
              href={meetingLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnlink}
            >
              Join Meeting
            </a>
          </div>

          <div className={styles.formgroup}>
            <label className={styles.label}>
              Send the Zoom Meeting Link via Email
            </label>
            <div className={styles.formbuttons}>
              <input
                type="email"
                placeholder="Enter recipient's email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className={styles.emailbutton}
              />
              <button className={styles.sendbutton} onClick={handleSendEmail}>
                Send Email
              </button>
            </div>
          </div>
          {emailSent && (
            <p className={styles.successmessage}>Email sent successfully!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Zoom;
