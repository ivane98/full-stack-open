import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(anecdotes[0]);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    setSelected(anecdotes[Math.floor(Math.random() * anecdotes.length)]);
  };

  const handleVote = () => {
    const newPoints = [...vote];
    newPoints[anecdotes.indexOf(selected)] += 1;
    setVote(newPoints);
  };
  const maxVotes = () => {
    const max = Math.max(...vote);
    const index = vote.indexOf(max);
    return anecdotes[index];
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {selected}
      <br />
      <button style={{ margin: "10px" }} onClick={handleVote}>
        vote
      </button>
      <button onClick={handleClick}>next anecdote</button>
      <br />
      <h1>Anecdote with the most votes</h1>
      <div>{maxVotes()}</div>
    </div>
  );
};

export default App;
