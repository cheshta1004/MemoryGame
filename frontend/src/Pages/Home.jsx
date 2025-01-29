import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext/userContext";
import "../Styles/Home.css";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const cardImages = [
    'img1.png', 'img2.jpeg', 'img3.png', 'img4.jpg',
    'img5.png', 'img6.jpeg', 'img7.png', 'img8.jpeg', 'img9.png',
    'img1.png', 'img2.jpeg', 'img3.png', 'img4.jpg',
    'img5.png', 'img6.jpeg', 'img7.png', 'img8.jpeg', 'img9.png'
  ];

  const shuffleCards = (array) => array.sort(() => Math.random() - 0.5);

  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [cards, setCards] = useState(shuffleCards(cardImages));
  const [flipped, setFlipped] = useState(Array(cardImages.length).fill(false));
  const [selectedCards, setSelectedCards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [matchedCards, setMatchedCards] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [isEditingPlayer1, setIsEditingPlayer1] = useState(false);
  const [isEditingPlayer2, setIsEditingPlayer2] = useState(false);

  const prevPlayer1Score = useRef(player1Score);
  const prevPlayer2Score = useRef(player2Score);

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    prevPlayer1Score.current = player1Score;
    prevPlayer2Score.current = player2Score;
  }, [player1Score, player2Score]);

  const handleReplay = () => {
    setCards(shuffleCards(cardImages));
    setFlipped(Array(cardImages.length).fill(false));
    setSelectedCards([]);
    setMatchedCards(new Set());
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(1);
    setGameOver(false);
  };

  const handleCardClick = (index) => {
    if (flipped[index] || selectedCards.length === 2 || matchedCards.has(index) || gameOver) return;

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
    setSelectedCards([...selectedCards, index]);

    if (selectedCards.length === 1) {
      const [firstIndex] = selectedCards;
      if (cards[firstIndex] !== cards[index]) {
        setTimeout(() => {
          const resetFlipped = [...newFlipped];
          resetFlipped[firstIndex] = false;
          resetFlipped[index] = false;
          setFlipped(resetFlipped);
          setSelectedCards([]);
          setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
        }, 2000);
      } else {
        const currentScore = currentPlayer === 1 ? player1Score + 1 : player2Score + 1;
        currentPlayer === 1 ? setPlayer1Score(currentScore) : setPlayer2Score(currentScore);

        const updatedMatchedCards = new Set(matchedCards.add(firstIndex).add(index));
        setMatchedCards(updatedMatchedCards);
        setSelectedCards([]);

        if (updatedMatchedCards.size === cards.length) {
          setTimeout(() => setGameOver(true), 500);
        } else {
          setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
        }
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="page">
      <span style={{ position: "absolute", right: "30px" }}>
        <p style={{ display: "inline", margin: "0 10px 0 0" }}>
          Hi {user?.name || "Guest"}
        </p>
        <button onClick={handleLogout} style={{ display: "inline" }}>Logout</button>
      </span>

      {gameOver ? (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <h2>{`Game Over! ${
              player1Score > player2Score
                ? `${player1Name.trim() || "Player 1"} Wins!`
                : player1Score < player2Score
                ? `${player2Name.trim() || "Player 2"} Wins!`
                : "It's a Tie!"
            }`}</h2>
            <button className="replay-button" onClick={handleReplay}>Replay</button>
          </div>
        </div>
      ) : (
        <h1>{`${currentPlayer === 1 ? player1Name.trim() || "Player 1" : player2Name.trim() || "Player 2"}'s Turn`}</h1>
      )}

      {/* Game Info and Cards */}
      <div className="game-info">
        <div className={`score-box player-1 ${currentPlayer === 1 ? "active" : ""}`}>
          {isEditingPlayer1 ? (
            <input
              type="text"
              placeholder="Player 1 Name"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
              onBlur={() => setIsEditingPlayer1(false)}
              className="name-input"
            />
          ) : (
            <p onClick={() => setIsEditingPlayer1(true)}>
              {player1Name || "Player 1"}
            </p>
          )}
          <p>{player1Score}</p>
        </div>
        <div className={`score-box player-2 ${currentPlayer === 2 ? "active" : ""}`}>
          {isEditingPlayer2 ? (
            <input
              type="text"
              placeholder="Player 2 Name"
              value={player2Name}
              onChange={(e) => setPlayer2Name(e.target.value)}
              onBlur={() => setIsEditingPlayer2(false)}
              className="name-input"
            />
          ) : (
            <p onClick={() => setIsEditingPlayer2(true)}>
              {player2Name || "Player 2"}
            </p>
          )}
          <p>{player2Score}</p>
        </div>
      </div>

      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleCardClick(index)}
          >
            <img
              src={flipped[index] || matchedCards.has(index) ? card : 'logo.png'}
              alt={`Card ${index}`}
              className="card-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
