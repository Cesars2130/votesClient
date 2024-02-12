import { useState } from "react";
import React from "react";
import ChatComponent from "./components/Chat";
import Game from "./components/Game";


export default function App() {

  const isLoggedIn = null;
  return (
    <>
      <section>
        <div
          style={{
            height: "100px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "gray",
            alignContent: "center",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
            }}
          >
            Tonoto Game
          </h1>
        </div>

        <div
          style={{
            width: "100%",
            height: "600px",
            backgroundColor: "gray",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              width: "70%",
              backgroundColor: "white",
            }}
          >
              <Game>

              </Game>
          </div>
          <div
            style={{
              width: "30%",
              backgroundColor: "grey",
              borderRadius:"5px"
            }}
          >
            <ChatComponent>

            </ChatComponent>
          </div>
        </div>
      </section>
    </>
  );
}
