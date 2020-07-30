import React from "react";
import "./Universal.css";

const Rules = () => {
  return (
    <div>
      <h3>About this Algorithm:</h3>
      <p>
        The Game of Life is a cellular automaton devised by the British
        mathematician John Horton Conway in 1970. It is a zero-player game,
        meaning that its evolution is determined by its initial state, requiring
        no further input. One interacts with the Game of Life by creating an
        initial configuration and observing how it evolves. It is Turing
        complete and can simulate a universal constructor or any other Turing
        machine.
      </p>
      <h3>Rules</h3>
      <ol>
        <li>
          Any live cell with fewer than two live neighbours dies, as if by
          underpopulation.
        </li>
        <li>
          Any live cell with two or three live neighbours lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than three live neighbours dies, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly three live neighbours becomes a live cell,
          as if by reproduction.
        </li>
        <li>Any live cell with two or three live neighbours survives.</li>
        <li>Any dead cell with three live neighbours becomes a live cell.</li>
        <li>
          All other live cells die in the next generation. Similarly, all other
          dead cells stay dead.
        </li>
      </ol>
    </div>
  );
};

export default Rules;
