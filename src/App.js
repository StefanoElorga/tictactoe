import { useState } from "react";
import { motion } from "framer-motion";

const turns = {
  x: "X",
  o: "O",
};

const combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const Box = ({ children, handlePlay, index, winner }) => {
  const handleClick = () => {
    handlePlay(index);
  };

  const symbolColor =
    children === turns.x ? "neon-gradient" : "neon-gradient-o";
  let shadowColor = "";

  if (children === turns.x) {
    shadowColor = "boxes-shadow-x";
  } else if (children === turns.o) {
    shadowColor = "boxes-shadow-o";
  } else if (winner === turns.x) {
    shadowColor = "boxes-shadow-x";
  } else if (winner === turns.o) {
    shadowColor = "boxes-shadow-o";
  } else {
    shadowColor = "boxes-shadow ";
  }

  return (
    <motion.div
      key={index}
      id={index}
      whileHover={{ scale: 1.05 }}
      onClick={() => handleClick()}
      className={`
   h-[120px] font-comico flex items-center justify-center cursor-pointer  ${shadowColor} rounded-md font-bold text-6xl text-white ${symbolColor}`}
    >
      {children}
    </motion.div>
  );
};

const Modal = ({ winner, reset }) => {
  return (
    <motion.div
      className={`gap-10 absolute w-[350px] h-[290px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  rounded-md bg-modal z-20 justify-center items-center flex flex-col`}
    >
      <motion.h1
        className={`${
          winner === turns.x ? "neon-gradient" : "neon-gradient-o"
        } text-8xl font-comico `}
        initial={{ scale: 0 }}
        whileInView={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.7, delay: 0.5, repeat: Infinity }}
      >
        {winner}
      </motion.h1>

      <motion.h1 className="text-white text-4xl font-bold font-comico">
        Gana el juego!
      </motion.h1>

      <motion.button
        className="bg-black w-32 h-12 rounded-md text-white font-bold text-2xl font-comico"
        onClick={() => reset()}
        whileHover={{ scale: 1.2 }}
      >
        Reiniciar
      </motion.button>
    </motion.div>
  );
};

function App() {
  const [ourBoard, setOurBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(turns.x);
  const [winner, setWinner] = useState(null);
  const [pointsX, setPointsX] = useState(0);
  const [pointsO, setPointsO] = useState(0);

  const reset = () => {
    setOurBoard(Array(9).fill(null));
    setTurn(turns.x);
    setWinner(null);
  };

  const getWinner = (boardToCheck) => {
    for (const combo of combination) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        if (boardToCheck[a] === "X") {
          setPointsX(pointsX + 1);
        } else {
          setPointsO(pointsO + 1);
        }
        return boardToCheck[a];
      }
    }
    return null;
  };

  const handlePlay = (index) => {
    if (ourBoard[index] || winner) return;

    const newBoard = [...ourBoard];
    newBoard[index] = turn;
    setOurBoard(newBoard);
    setTurn(turn === turns.x ? turns.o : turns.x);
    if (getWinner(newBoard)) {
      setWinner(getWinner(newBoard));
    }
  };

  const myBoxes = ourBoard.map((_, index) => {
    return (
      <Box index={index} key={index} handlePlay={handlePlay} winner={winner}>
        {ourBoard[index]}
      </Box>
    );
  });

  return (
    <div className="w-full h-screen bg-purple flex justify-center items-center flex-col">
      <motion.div className="mb-12 flex flex-col justify-center items-center gap-4">
        <h1 className="text-6xl font-bold text-white font-comico ">
          ES EL TURNO DE{" "}
          <span
            className={turn === turns.x ? "neon-gradient" : "neon-gradient-o"}
          >
            {turn}
          </span>
        </h1>

        <h1 className="text-white text-4xl font-comico">
          <span className="neon-gradient">{pointsX}</span> -{" "}
          <span className="neon-gradient-o">{pointsO}</span>
        </h1>

        <motion.button
          className="bg-gradient-rainbow w-32 h-12 rounded-md text-white font-bold text-2xl font-comico"
          onClick={() => reset()}
          whileHover={{ scale: 1.2 }}
        >
          Reiniciar
        </motion.button>
      </motion.div>

      <div className="w-[450px] mx-auto my-4">
        <div className="grid grid-cols-3 gap-4 bg-none">{myBoxes}</div>
      </div>
      {winner ? <Modal winner={winner} reset={reset} /> : null}
    </div>
  );
}

export default App;
