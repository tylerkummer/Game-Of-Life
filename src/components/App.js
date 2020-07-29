import React, { useState, useEffect } from "react";
import "./Universal.css";
import Grid from "./Grid";
import Buttons from "./Buttons";

const arrayClone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

// Class Components
class App extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 25;
    this.cols = 25;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false)),
    };
  }

  componentDidMount() {
    this.random();
    this.playButton();
  }

  selectBox = (row, col) => {
    const gridFull = this.state.gridFull.map((rowArr, rowIdx) =>
      rowArr.map((item, colIdx) =>
        rowIdx === row && colIdx === col ? !item : item
      )
    );
    this.setState(() => ({ gridFull }));
  };

  random = () => {
    const gridFull = this.state.gridFull.map((rowArr) =>
      rowArr.map(() => Math.floor(Math.random() * 4) === 1)
    );
    this.setState(() => ({ gridFull }));
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.playButton();
  };

  fast = () => {
    this.speed = 100;
    this.playButton();
  };

  clear = () => {
    const gridFull = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));

    this.setState(() => ({
      gridFull,
      generation: 0,
    }));
  };

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 25;
        this.rows = 25;
        break;
      case "2":
        this.cols = 50;
        this.rows = 50;
        break;
      default:
        this.cols = 75;
        this.rows = 75;
    }
    this.clear();
  };

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState((prevState) => ({
      gridFull: g2,
      generation: prevState.generation + 1,
    }));
  };

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <h2>Generations: {this.state.generation}</h2>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          random={this.random}
          gridSize={this.gridSize}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
      </div>
    );
  }
}

// Function Components
// const App = () => {
//   let speed = 100;
//   let rows = 25;
//   let cols = 25;

//   const [generation, setGeneration] = useState(0);
//   const [gridFull, setGridFull] = useState(
//     Array(rows)
//       .fill()
//       .map(() => Array(cols).fill(false))
//   );

//   useEffect(() => {
//     setInterval(() => {
//       random();
//       playButton();
//     }, []);
//   });

//   const selectBox = (row, col) => {
//     const gridFull = gridFull.map((rowArr, rowIdx) =>
//       rowArr.map((item, colIdx) =>
//         rowIdx === row && colIdx === col ? !item : item
//       )
//     );
//     setGridFull(gridFull);
//   };

//   const random = () => {
//     const gridFull = gridFull.map((rowArr) =>
//       rowArr.map(() => Math.floor(Math.random() * 4) === 1)
//     );
//     setGridFull(gridFull);
//   };

//   const playButton = () => {
//     clearInterval(intervalId);
//     let intervalId = setInterval(play, speed);
//   };

//   const pauseButton = () => {
//     clearInterval(intervalId);
//   };

//   const slow = () => {
//     speed = 1000;
//     playButton();
//   };

//   const fast = () => {
//     speed = 100;
//     playButton();
//   };

//   const clear = () => {
//     const gridFull = Array(rows)
//       .fill()
//       .map(() => Array(cols).fill(false));

//     setGridFull(gridFull);
//     setGeneration(0);
//   };

//   const gridSize = (size) => {
//     switch (size) {
//       case "1":
//         cols = 25;
//         rows = 25;
//         break;
//       case "2":
//         cols = 50;
//         rows = 50;
//         break;
//       default:
//         cols = 75;
//         rows = 75;
//     }
//     clear();
//   };

//   const play = () => {
//     let g = gridFull;
//     let g2 = arrayClone(gridFull);

//     for (let i = 0; i < rows; i++) {
//       for (let j = 0; j < cols; j++) {
//         let count = 0;
//         if (i > 0) if (g[i - 1][j]) count++;
//         if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
//         if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++;
//         if (j < cols - 1) if (g[i][j + 1]) count++;
//         if (j > 0) if (g[i][j - 1]) count++;
//         if (i < rows - 1) if (g[i + 1][j]) count++;
//         if (i < rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
//         if (i < rows - 1 && cols - 1) if (g[i + 1][j + 1]) count++;
//         if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
//         if (!g[i][j] && count === 3) g2[i][j] = true;
//       }
//     }

//     setGridFull(g2);
//     setGeneration(generation + 1);
//   };

//   return (
//     <div>
//       <h1>The Game of Life</h1>
//       <h2>Generations: {generation}</h2>
//       <Buttons
//         playButton={playButton}
//         pauseButton={pauseButton}
//         slow={slow}
//         fast={fast}
//         clear={clear}
//         random={random}
//         gridSize={gridSize}
//       />
//       <Grid gridFull={gridFull} rows={rows} cols={cols} selectBox={selectBox} />
//     </div>
//   );
// };

export default App;
