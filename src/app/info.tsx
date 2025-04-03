import { GameState, initialGameState } from "./game";
import styles from './page.module.css';







export default function Info({ gameState, setGameState }: { gameState: GameState, setGameState: (gameState: GameState) => void }) {
    return (
        <div className={styles.info}>
            <p>current player: </p>
            
            <p>player-{gameState.currentPlayer}</p>

            <p>status</p>
            {
                gameState.winOrDraw === null ?
                    <p>Game in progress.</p> :
                    gameState.winOrDraw === true ?
                        <p>player-{gameState.winner} is winner.</p> :
                        <p>Game ended in Draw.</p>
            }
            <button className={styles.reset_button} onClick={() => setGameState(initialGameState)}>Reset Game</button>

        </div>
    )
}
