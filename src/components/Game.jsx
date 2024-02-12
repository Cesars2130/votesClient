import React, { useEffect, useState } from "react";

const obtenerJugadoresConectados = async (setConectados) => {
  try {
    const response = await fetch("http://localhost:3001/jugadoresConectados");

    if (!response.ok) {
      throw new Error(
        "No se pudo obtener la información de jugadores conectados."
      );
    }

    const data = await response.json();
    console.log("Jugadores conectados:", data.usuariosConectados);
    setConectados(data.usuariosConectados);
  } catch (error) {
    console.error(
      "Error al obtener la información de jugadores conectados:",
      error
    );
  }
};

export default function Game() {
  const [preguntaActual, setPreguntaActual] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [conectados, setConectados] = useState("");
  const [newSocket, setnewSocket] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      obtenerJugadoresConectados(setConectados);
    }, 5000); // Intervalo de polling de 5 segundos

    // Inicializa la conexión WebSocket al montar el componente
    const socket = new WebSocket("ws://localhost:3002/");

    // Maneja los eventos de la conexión WebSocket
    socket.addEventListener("open", (event) => {
      console.log("Conexión establecida:", event);
    });

    socket.addEventListener("message", (event) => {
      console.log(event.data);
      const mensaje = JSON.parse(event.data);
      console.log("Mensaje recibido:", mensaje);
      setPreguntaActual(mensaje.pregunta);
    });

    socket.addEventListener("close", (event) => {
      console.log("Conexión cerrada:", event);
    });

    socket.addEventListener("error", (event) => {
      console.error("Error de conexión:", event);
    });

    
    setnewSocket(socket);

    // Cierra la conexión al desmontar el componente
    return () => {
      clearInterval(intervalId);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const obtenerJugadoresConectados = async (setConectados) => {
    try {
      const response = await fetch('http://localhost:3001/jugadoresConectados');
  
      if (!response.ok) {
        throw new Error('No se pudo obtener la información de jugadores conectados.');
      }
  
      const data = await response.json();
      console.log('Jugadores conectados:', data.usuariosConectados);
      setConectados(data.usuariosConectados);
    } catch (error) {
      console.error('Error al obtener la información de jugadores conectados:', error);
    }
  };

  const longPolling = async () => {
    while (true) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // Verifica si hay nuevas alertas durante el long polling
        const response = await fetch("http://localhost:3001/obtenerAlertas");
        const data = await response.json();

        if (data.alertas.length > 0) {
          alert("¡Nueva alerta disponible!");
        }
      } catch (error) {
        console.error("Error en el long polling:", error);
      }
    }
  };

  useEffect(() => {
    longPolling();
  }, []);

  const enviarRespuesta = () => {
    try {
      console.log(respuesta);
      newSocket.send(respuesta);
      setRespuesta("");
    } catch (error) {
      console.error("La conexión WebSocket no está abierta.");
    }
  };

  return (
    <div>
      <h1>{"Jugadores conectados: " + conectados}</h1>
      <div
        style={{
          backgroundColor: "grey",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Preguntas
        </h1>
        <h1>{preguntaActual}</h1>
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "460px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={respuesta}
          style={{
            maxWidth: "420px",
            padding: "5px",
            textAlign: "center",
            borderRadius: "5px",
            alignContent: "center",
            margin: "5px",
          }}
          onChange={(e) => setRespuesta(e.target.value)}
        />
        <button onClick={enviarRespuesta}>Enviar Respuesta</button>
      </div>
    </div>
  );
}
