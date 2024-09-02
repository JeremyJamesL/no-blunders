import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { useEffect, useState, useRef } from "react";

function AppChessboard() {
  const [fen, updateFen] = useState("start");
  const [pgn, updatePgn] = useState(
    "1. c4 {[%clk 0:03:00]} 1... e5 {[%clk 0:02:59.9]} 2. Nc3 {[%clk 0:02:59.5]} 2... Nf6 {[%clk 0:02:58.7]} 3. g3 {[%clk 0:02:57.8]} 3... d5 {[%clk 0:02:57.6]} 4. cxd5 {[%clk 0:02:56.7]} 4... Nxd5 {[%clk 0:02:56.7]} 5. Bg2 {[%clk 0:02:56.5]} 5... Be6 {[%clk 0:02:55.9]} 6. e3 {[%clk 0:02:54.9]} 6... Nxc3 {[%clk 0:02:54.9]} 7. bxc3 {[%clk 0:02:53.7]} 7... c6 {[%clk 0:02:48.9]} 8. Ne2 {[%clk 0:02:52.3]} 8... Bd6 {[%clk 0:02:46.3]} 9. O-O {[%clk 0:02:49.7]} 9... O-O {[%clk 0:02:44.6]} 10. Bb2 {[%clk 0:02:48.8]} 10... Nd7 {[%clk 0:02:42.3]} 11. d4 {[%clk 0:02:48.1]} 11... exd4 {[%clk 0:02:40]} 12. cxd4 {[%clk 0:02:48]} 12... Nb6 {[%clk 0:02:27.8]} 13. Nf4 {[%clk 0:02:46.2]} 13... Bxf4 {[%clk 0:02:25.7]} 14. exf4 {[%clk 0:02:44.7]} 14... Bd5 {[%clk 0:02:23.8]} 15. Bxd5 {[%clk 0:02:40.7]} 15... Nxd5 {[%clk 0:02:21.5]} 16. Re1 {[%clk 0:02:37.4]} 16... Qb6 {[%clk 0:02:16.8]} 17. Rb1 {[%clk 0:02:30.1]} 17... Qc7 {[%clk 0:02:14.3]} 18. Qb3 {[%clk 0:02:28]} 18... Rab8 {[%clk 0:02:09.8]} 19. Qc4 {[%clk 0:02:26.2]} 19... b5 {[%clk 0:01:55.8]} 20. Qd3 {[%clk 0:02:19.3]} 20... a5 {[%clk 0:01:51]} 21. a3 {[%clk 0:02:14.2]} 21... b4 {[%clk 0:01:36.6]} 22. axb4 {[%clk 0:02:11.8]} 22... Nxb4 {[%clk 0:01:34.8]} 23. Qc3 {[%clk 0:02:04]} 23... h6 {[%clk 0:01:30.9]} 24. d5 {[%clk 0:02:02.7]} 24... c5 {[%clk 0:01:28.7]} 25. Qxg7# {[%clk 0:02:01.4]} 1-0"
  );
  const chess = useRef(new Chess());

  const pieceDrop = ({ sourceSquare, targetSquare }) => {
    try {
      chess.current.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      updateFen(chess.current.fen());
    } catch (err) {
      console.log("Invalid move");
    }
  };

  const resetBoard = () => {
    chess.current.reset();
    updateFen(chess.current.fen());
  };

  const sendFen = async () => {
    const uri =
      "http://localhost:8080/get-eval?fen=3K4/8/1B1R3P/3rqP2/6pp/2NP3P/1k2nPB1/8 w - - 0 1";
    const encoded = encodeURI(uri);
    const response = await fetch(encoded);
    const data = await response.json();
    console.log(data);
  };

  const sendPgn = async () => {
    const response = await fetch("http://localhost:8080/get-fens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pgn }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <Chessboard position={fen} draggable={true} onDrop={pieceDrop} />
      <button onClick={resetBoard}>Reset</button>
      <button onClick={sendFen}>Send Fen</button>
      <button onClick={sendPgn}>Send pgn</button>
    </div>
  );
}

export default AppChessboard;
