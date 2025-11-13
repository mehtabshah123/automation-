import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", {
        message: input,
      });
      const botReply = res.data.reply;

      // Add bot reply
      setMessages([
        ...newMessages,
        { sender: "Bot", text: botReply },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "Bot", text: "⚠️ Sorry, I couldn't connect to the server." },
      ]);
    }

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🧠 AI Mental Health Support Chatbot</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "You" ? "#007bff" : "#e5e5ea",
              color: msg.sender === "You" ? "white" : "black",
            }}
          >
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Type your feelings..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "15px",
    background: "linear-gradient(180deg, #f0f8ff, #e6f2ff)",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    color: "#004aad",
    fontWeight: "bold",
    fontSize: "1.4rem",
    marginBottom: "10px",
  },
  chatBox: {
    height: "400px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    background: "white",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  message: {
    padding: "10px 15px",
    borderRadius: "20px",
    maxWidth: "75%",
    fontSize: "0.95rem",
    lineHeight: "1.4",
  },
  inputBox: {
    display: "flex",
    marginTop: "15px",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    outline: "none",
  },
  button: {
    padding: "10px 18px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Chatbot;
