import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import styles from "../styles/prueba.module.css";

const socket = io("http://localhost:4000");

const ChatComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("conectado al chat");

      setIsConnected(true);
    });

    socket.on("chat_message", (data) => {
      console.log(data);
      setMensajes((mensajes) => [...mensajes, data]);
      console.log("Segun el id", data.usuario, typeof data.usuario);
    });

    return () => {
      socket.off("connect");
      socket.off("chat_message");
    };
  }, []);

  const enviarMensaje = () => {
    socket.emit("chat_message", {
      usuario: socket.id,
      mensaje: nuevoMensaje,
    });
    const input = document.getElementById("inputChat");
    input.value = "";
  };

  const GoRoom = () => {
    const inpuntGR = document.getElementById("goRoom");
    console.log("INPUT GOOO ROOMS", inpuntGR.value);
    if (inpuntGR.value === "cesar") {
      window.location.assign("/ChatRoom");
    } else {
      alert("No existe la sala a la que quieres entrar");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        margin: "10px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Chat Global
      </h1>
      <p style={{
          textAlign: "center",
        }}>
        {isConnected ? "Estas conectado al Chat" : "No estas conectado al Chat"}
      </p>
      <div
        style={{
          textAlign: "center",
        }}
      >
        {mensajes.map((mensaje) => (
          <li key={mensaje}>
            {mensaje.usuario}: {mensaje.mensaje}
          </li>
        ))}
      </div>
      <textarea
        style={{
          maxWidth: "420px",
          padding: "5px",
          textAlign: "center",
          borderRadius:"5px",
          alignContent:"center",
          margin:"5px"
          
        }}
        rows="4"
        cols="33"
        placeholder="Envía un mensaje"
        id="inputChat"
        type="text"
        onChange={(e) => setNuevoMensaje(e.target.value)}
      />
      <button  style={{
          maxWidth: "435px",
          padding: "5px",
          textAlign: "center",
          borderRadius:"5px",
          alignContent:"center",
          margin:"5px"
          
        }} onClick={enviarMensaje}>
        Enviar
      </button>
      
      <h3 style={{
          textAlign: "center",
        }}>Ingresa el codigo de la room </h3>
      <input    style={{
          maxWidth: "420px",
          padding: "5px",
          textAlign: "center",
          borderRadius:"5px",
          alignContent:"center",
          margin:"5px"
          
        }} id="goRoom" type="text"></input>
      <button  style={{
          maxWidth: "435px",
          padding: "5px",
          textAlign: "center",
          borderRadius:"5px",
          alignContent:"center",
          margin:"5px"
          
        }} onClick={GoRoom}>
        Entrar a la room
      </button>
    </div>
  );
};

export default ChatComponent;
