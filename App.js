import React, { useState } from "react";
import confetti from "canvas-confetti";
import "./styles.css";

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [answeredYes, setAnsweredYes] = useState(false);
  const [shake, setShake] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const yesScale = Math.min(1 + noCount * 0.2, 5);

  const handleNo = () => {
    setNoCount((c) => c + 1);
    setShake(true);

    // Stop shake efter 300ms
    setTimeout(() => setShake(false), 300);

    // Flyt Nej-knap tilfældigt indenfor container (300x60)
    const maxX = 220;
    const x = Math.random() * maxX;
    const y = 0; // Hold lodret fast for pænhed
    setNoPos({ x, y });
  };

  const handleYes = () => {
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
      colors: ["#ff69b4", "#ff1493", "#ffb6c1", "#ff69b4"],
    });

    setAnsweredYes(true);
  };

  return (
    <div className={`App ${shake ? "shake" : ""}`}>
      {!answeredYes ? (
        <>
          <h1>Thea, vil du være min valentin? ❤️</h1>
          <div className="buttons">
            <button
              id="yes"
              style={{ transform: `scale(${yesScale})` }}
              onClick={handleYes}
            >
              Ja 😍
            </button>
            <button
              id="no"
              onClick={handleNo}
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                position: "absolute",
              }}
            >
              Nej 😢
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Jubiiii, Thea! ❤️ Anders elsker dig!</h1>
        </>
      )}
    </div>
  );
}
