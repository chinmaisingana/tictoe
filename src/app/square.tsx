"use client";

import Image from "next/image"
import styles from "./page.module.css"
import xPng from "../../public/x.png"
import oPng from "../../public/o.png"
import { useState } from "react";
import { squareStatus, player, GameState, handleMove } from "./game";
const squareColors = [
    "#B0E0E6", // Powder Blue
    "#E6DCE0", // Lavender Blush
    "#98FB98", // Mint Green
    "#FFDAB9", // Peach Puff
    "#F08080", // Light Coral
    "#EEE8AA", // Pale Goldenrod
    "#D8BFD8", // Thistle
    "#87CEEB", // Sky Blue
    "#FFFACD"  // Lemon Chiffon
];

/**
 * The component for each square on the board.
 * 
 * @param {SquareProps} square_props - The props for the Square component. It contains the value of the square and the click handler to the square.
 */
export default function Square({ squareNumber, gameState, setGameState }: { squareNumber: number, gameState: GameState, setGameState: (gameState: GameState) => void }) {
    const value = gameState.squares[squareNumber];
    // alt text to show for the image inside square
    const alt_text: string = (value === 'X') ? "Image of an X symbol" : "Image of an O symbol";
    // image source, imported from ../../public
    const image_src = (value === 'X') ? xPng : oPng;
    // function to be called when the square is clicked
    function square_clicked() {
        handleMove(squareNumber, gameState, setGameState);
    }
    // mouse hover state, which we use to animate when pointer hovers over a square.
    let [isHovered, setIsHovered] = useState(false);
    // null indicates that the game is not over
    const is_game_finished = gameState.winOrDraw !== null;
    const is_game_won = gameState.winOrDraw === true;
    // if game is won and this square is part of the winning combo
    const is_winning_square = is_game_won && gameState.winnerCombo.includes(squareNumber) ;
    // each square in the grid gets a different color.
    const squareColor = squareColors[squareNumber];
    // lets add some alpha, to make it blend with background in dark/light color schemes
    const bgColor = (isHovered || is_game_finished) ? squareColor : (squareColor + "80");
    // a little shadow to give the square some elevation.
    const shadowColor = squareColor + "20";

    let className = styles.square;
    if (is_game_won) {
        if (is_winning_square) {
            className += " " + styles.winning_square;
        } else {
            className += " " + styles.losing_square;
        }
    }

    return <div
        className={className}
        // set hover state via callbacks
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // click handler
        onClick={square_clicked}
        // set bg-color and shadow
        style={
            {
                backgroundColor: bgColor,
                boxShadow: `2px 4px 4px ${shadowColor}`,
            }
        }>
        {
            // IF value is not null, we show the player who claimed this square.
            value !== null ?
                // only show the image if the square is not empty
                <Image src={image_src} alt={alt_text} /> :
                // use an empty span as placeholder when there's no image to show.
                <span />
        }
    </div>
}