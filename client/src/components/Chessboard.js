import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { useEffect, useState, useRef } from "react";

function AppChessboard() {
  // Variables
  const [fen, updateFen] = useState("start");
  const [formMessage, updateFormMessage] = useState(null);
  const [chessUsername, updateChessUsername] = useState("");
  const [pgn, updatePgn] = useState(
    "1. c4 {[%clk 0:03:00]} 1... e5 {[%clk 0:02:59.9]} 2. Nc3 {[%clk 0:02:59.5]} 2... Nf6 {[%clk 0:02:58.7]} 3. g3 {[%clk 0:02:57.8]} 3... d5 {[%clk 0:02:57.6]} 4. cxd5 {[%clk 0:02:56.7]} 4... Nxd5 {[%clk 0:02:56.7]} 5. Bg2 {[%clk 0:02:56.5]} 5... Be6 {[%clk 0:02:55.9]} 6. e3 {[%clk 0:02:54.9]} 6... Nxc3 {[%clk 0:02:54.9]} 7. bxc3 {[%clk 0:02:53.7]} 7... c6 {[%clk 0:02:48.9]} 8. Ne2 {[%clk 0:02:52.3]} 8... Bd6 {[%clk 0:02:46.3]} 9. O-O {[%clk 0:02:49.7]} 9... O-O {[%clk 0:02:44.6]} 10. Bb2 {[%clk 0:02:48.8]} 10... Nd7 {[%clk 0:02:42.3]} 11. d4 {[%clk 0:02:48.1]} 11... exd4 {[%clk 0:02:40]} 12. cxd4 {[%clk 0:02:48]} 12... Nb6 {[%clk 0:02:27.8]} 13. Nf4 {[%clk 0:02:46.2]} 13... Bxf4 {[%clk 0:02:25.7]} 14. exf4 {[%clk 0:02:44.7]} 14... Bd5 {[%clk 0:02:23.8]} 15. Bxd5 {[%clk 0:02:40.7]} 15... Nxd5 {[%clk 0:02:21.5]} 16. Re1 {[%clk 0:02:37.4]} 16... Qb6 {[%clk 0:02:16.8]} 17. Rb1 {[%clk 0:02:30.1]} 17... Qc7 {[%clk 0:02:14.3]} 18. Qb3 {[%clk 0:02:28]} 18... Rab8 {[%clk 0:02:09.8]} 19. Qc4 {[%clk 0:02:26.2]} 19... b5 {[%clk 0:01:55.8]} 20. Qd3 {[%clk 0:02:19.3]} 20... a5 {[%clk 0:01:51]} 21. a3 {[%clk 0:02:14.2]} 21... b4 {[%clk 0:01:36.6]} 22. axb4 {[%clk 0:02:11.8]} 22... Nxb4 {[%clk 0:01:34.8]} 23. Qc3 {[%clk 0:02:04]} 23... h6 {[%clk 0:01:30.9]} 24. d5 {[%clk 0:02:02.7]} 24... c5 {[%clk 0:01:28.7]} 25. Qxg7# {[%clk 0:02:01.4]} 1-0"
  );
  const [username, updateUsername] = useState("Dippyville");
  const game = {
    url: "https://www.chess.com/game/live/105035409227",
    pgn: '[Event "Live Chess"]\n[Site "Chess.com"]\n[Date "2024.03.24"]\n[Round "-"]\n[White "Smoppy9"]\n[Black "Dippyville"]\n[Result "1-0"]\n[CurrentPosition "1r3rk1/2q2pQ1/7p/p1pP4/1n3P2/6P1/1B3P1P/1R2R1K1 b - -"]\n[Timezone "UTC"]\n[ECO "A22"]\n[ECOUrl "https://www.chess.com/openings/English-Opening-Carls-Bremen-Reversed-Dragon-Variation-4.cxd5-Nxd5-5.Bg2-Be6"]\n[UTCDate "2024.03.24"]\n[UTCTime "16:04:30"]\n[WhiteElo "1130"]\n[BlackElo "981"]\n[TimeControl "180"]\n[Termination "Smoppy9 won by checkmate"]\n[StartTime "16:04:30"]\n[EndDate "2024.03.24"]\n[EndTime "16:07:13"]\n[Link "https://www.chess.com/game/live/105035409237"]\n\n1. c4 {[%clk 0:03:00]} 1... e5 {[%clk 0:02:59.9]} 2. Nc3 {[%clk 0:02:59.5]} 2... Nf6 {[%clk 0:02:58.7]} 3. g3 {[%clk 0:02:57.8]} 3... d5 {[%clk 0:02:57.6]} 4. cxd5 {[%clk 0:02:56.7]} 4... Nxd5 {[%clk 0:02:56.7]} 5. Bg2 {[%clk 0:02:56.5]} 5... Be6 {[%clk 0:02:55.9]} 6. e3 {[%clk 0:02:54.9]} 6... Nxc3 {[%clk 0:02:54.9]} 7. bxc3 {[%clk 0:02:53.7]} 7... c6 {[%clk 0:02:48.9]} 8. Ne2 {[%clk 0:02:52.3]} 8... Bd6 {[%clk 0:02:46.3]} 9. O-O {[%clk 0:02:49.7]} 9... O-O {[%clk 0:02:44.6]} 10. Bb2 {[%clk 0:02:48.8]} 10... Nd7 {[%clk 0:02:42.3]} 11. d4 {[%clk 0:02:48.1]} 11... exd4 {[%clk 0:02:40]} 12. cxd4 {[%clk 0:02:48]} 12... Nb6 {[%clk 0:02:27.8]} 13. Nf4 {[%clk 0:02:46.2]} 13... Bxf4 {[%clk 0:02:25.7]} 14. exf4 {[%clk 0:02:44.7]} 14... Bd5 {[%clk 0:02:23.8]} 15. Bxd5 {[%clk 0:02:40.7]} 15... Nxd5 {[%clk 0:02:21.5]} 16. Re1 {[%clk 0:02:37.4]} 16... Qb6 {[%clk 0:02:16.8]} 17. Rb1 {[%clk 0:02:30.1]} 17... Qc7 {[%clk 0:02:14.3]} 18. Qb3 {[%clk 0:02:28]} 18... Rab8 {[%clk 0:02:09.8]} 19. Qc4 {[%clk 0:02:26.2]} 19... b5 {[%clk 0:01:55.8]} 20. Qd3 {[%clk 0:02:19.3]} 20... a5 {[%clk 0:01:51]} 21. a3 {[%clk 0:02:14.2]} 21... b4 {[%clk 0:01:36.6]} 22. axb4 {[%clk 0:02:11.8]} 22... Nxb4 {[%clk 0:01:34.8]} 23. Qc3 {[%clk 0:02:04]} 23... h6 {[%clk 0:01:30.9]} 24. d5 {[%clk 0:02:02.7]} 24... c5 {[%clk 0:01:28.7]} 25. Qxg7# {[%clk 0:02:01.4]} 1-0\n',
    time_control: "180",
    end_time: 1711296433,
    rated: true,
    tcn: "kA0Kbs!TowZJAJTJfo6SmuJsjsYQgm9Reg8!cj5ZlBKBsBZPmDRDuDSJoJPJfe7PabPYdr45rAXHAtWGiqHzqzJzts3VBJQIs2",
    uuid: "32ddc5f4-e9f8-11ee-bd0d-6cfe544c0428",
    initial_setup: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    fen: "1r3rk1/2q2pQ1/7p/p1pP4/1n3P2/6P1/1B3P1P/1R2R1K1 b - -",
    time_class: "blitz",
    rules: "chess",
    white: {
      rating: 1130,
      result: "win",
      "@id": "https://api.chess.com/pub/player/smoppy9",
      username: "Smoppy9",
      uuid: "9925b25c-4ed3-11eb-b68b-2b5ff93353ff",
    },
    black: {
      rating: 981,
      result: "checkmated",
      "@id": "https://api.chess.com/pub/player/dippyville",
      username: "Dippyville",
      uuid: "e5691e7a-e9f7-11ee-b5d3-b3b75f908e42",
    },
  };
  const chess = useRef(new Chess());

  // Functions
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

  const processGame = async () => {
    const response = await fetch("http://localhost:8080/process-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game }, { username }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const lowercaseUsername = chessUsername.toLowerCase();
    const response = await fetch(
      `https://api.chess.com/pub/player/${lowercaseUsername}/games/archives`
    );

    if (!response.ok) {
      console.log("response not ok");
      const data = await response.json();
      updateFormMessage(data.message);
      return;
    }

    const data = await response.json();
    console.log(data);
    updateFormMessage(
      "Thanks for submitting your username, we will process your games, check back shortly"
    );
  };

  return (
    <div>
      <Chessboard position={fen} draggable={true} onDrop={pieceDrop} />
      <button onClick={resetBoard}>Reset</button>
      <button onClick={sendFen}>Send Fen</button>
      <button onClick={processGame}>Process games</button>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="type your chess.com username"
          onChange={(e) => updateChessUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {formMessage}
    </div>
  );
}

export default AppChessboard;
