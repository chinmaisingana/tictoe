"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import Square from "./square";
import { GameState, initialGameState } from "./game";
import Info from "./info";


export default function Home() {
  let [gameState, setGameState] = useState<GameState>(initialGameState)
  let square_elements = [];
  for (var i = 0; i < 9; i++) {
    const props = {
      squareNumber: i,
      gameState: gameState,
      setGameState: setGameState
    }
    square_elements.push(
      <Square key={i} {...props}></Square>
    )
  }
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Info gameState={gameState} setGameState={setGameState}></Info>
        <div className={styles.board}>
          <div className={styles.square_grid}>
            {square_elements}
          </div>
        </div>
      </main>
    </div>
  );
}
