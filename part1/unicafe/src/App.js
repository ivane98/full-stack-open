import { useState } from "react";

const Statistics = (props) => {
  return (
    <div>
      <h2>Statistics</h2>

      {!props.all ? (
        <div>No feedback given</div>
      ) : (
        <table>
          <tbody>
            <Statistic text="Good" value={props.good} />
            <Statistic text="Neutral" value={props.neutral} />
            <Statistic text="Bad" value={props.bad} />
            <Statistic text="All" value={props.all} />
            <Statistic text="Average" value={props.average} />
            <Statistic text="Positive" value={props.positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = 0;
  let average = 0;
  let positive = 0;

  const handleGood = () => setGood((prevValue) => prevValue + 1);
  const handleNeutral = () => setNeutral((prevValue) => prevValue + 1);
  const handleBad = () => setBad((prevValue) => prevValue + 1);
  const sum = () => {
    let result = good + bad + neutral;
    all += result;
  };
  sum();
  const avg = () => {
    let result = (good - bad) / (good + bad + neutral);
    average += result;
  };
  avg();

  const pstv = () => {
    let result = good / (good + bad + neutral);
    positive += result;
  };
  pstv();

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <h2>statistics</h2>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
