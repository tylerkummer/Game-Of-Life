import React, { useState, useRef, useCallback } from "react";
import "./Universal.css";
import Grid from "./Grid";
import Buttons from "./Buttons";
import Rules from "./Rules";

// Class Components
const arrayClone = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

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

  normal = () => {
    this.speed = 100;
    this.playButton();
  };

  fast = () => {
    this.speed = 50;
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
          normal={this.normal}
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
        <Rules />
      </div>
    );
  }
}

// Functional Components
// const App = () => {
//   const arrayClone = (arr) => {
//     return JSON.parse(JSON.stringify(arr));
//   };

//   const [speed, setSpeed] = useState(100);
//   const [rows, setRows] = useState(25);
//   const [cols, setCols] = useState(25);
//   const [run, setRun] = useState(true);
//   const [generation, setGeneration] = useState(0);

//   const [gridFull, setGridFull] = useState(
//     Array(rows)
//       .fill()
//       .map(() => Array(cols).fill(false))
//   );

//   const rowsRef = useRef(rows);
//   const colsRef = useRef(cols);
//   const genCount = useRef(generation);
//   const gridRef = useRef(gridFull);
//   const runRef = useRef(run);
//   const speedRef = useRef(speed);

//   gridRef.current = gridFull;
//   genCount.current = generation;
//   rowsRef.current = rows;
//   colsRef.current = cols;
//   runRef.current = run;
//   speedRef.current = speed;

//   const selectBox = (row, col) => {
//     setGridFull(
//       gridFull.map((rowArr, rowIdx) =>
//         rowArr.map((item, colIdx) =>
//           rowIdx === row && colIdx === col ? !item : item
//         )
//       )
//     );
//   };

//   const random = () => {
//     setGridFull(
//       gridFull.map((rowArr) =>
//         rowArr.map(() => Math.floor(Math.random() * 4) === 1)
//       )
//     );
//   };

//   const playButton = () => {
//     setRun(true);
//     runRef.current = true;
//     play();
//   };

//   const pauseButton = () => {
//     setRun(false);
//   };

//   const slow = () => {
//     setSpeed(1000);
//   };

//   const normal = () => {
//     setSpeed(100);
//   };

//   const fast = () => {
//     setSpeed(50);
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
//         setCols(25);
//         setRows(25);
//         break;
//       case "2":
//         setCols(50);
//         setRows(50);
//         break;
//       default:
//         setCols(75);
//         setRows(75);
//     }
//     clear();
//   };

//   const play = useCallback(() => {
//     if (runRef.current) {
//       let g = gridRef.current;
//       let g2 = arrayClone(gridRef.current);
//       for (let i = 0; i < rowsRef.current; i++) {
//         for (let j = 0; j < colsRef.current; j++) {
//           let count = 0;
//           if (i > 0) if (g[i - 1][j]) count++;
//           if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
//           if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++;
//           if (j < cols - 1) if (g[i][j + 1]) count++;
//           if (j > 0) if (g[i][j - 1]) count++;
//           if (i < rows - 1) if (g[i + 1][j]) count++;
//           if (i < rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
//           if (i < rows - 1 && cols - 1) if (g[i + 1][j + 1]) count++;
//           if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
//           if (!g[i][j] && count === 3) g2[i][j] = true;
//         }
//       }
//       setGridFull(g2);
//       setGeneration(genCount.current + 1);
//       setTimeout(play, speedRef.current);
//     } else {
//       return;
//     }
//   });

//   return (
//     <div className="App">
//       <h1>The Game of Life</h1>
//       <h2>Generations: {generation}</h2>
//       <Buttons
//         playButton={playButton}
//         pauseButton={pauseButton}
//         normal={normal}
//         slow={slow}
//         fast={fast}
//         clear={clear}
//         random={random}
//         gridSize={gridSize}
//       />
//       <Grid gridFull={gridFull} rows={rows} cols={cols} selectBox={selectBox} />
//       <Rules />
//     </div>
//   );
// };

export default App;
