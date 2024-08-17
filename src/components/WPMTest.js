import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--secondary-color);
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--secondary-color);
`;

const TextDisplay = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  line-height: 1.6;
  position: relative;
  height: 100px;
  overflow: hidden;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const FadedText = styled(TextOverlay)`
  color: #ccc;
`;

const TypedText = styled(TextOverlay)`
  color: transparent;
  caret-color: black;

  & > span {
    color: black;
  }

  & > span.correct {
    background-color: #d4edda;
  }

  & > span.incorrect {
    background-color: #f8d7da;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const texts = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question."
  ],
  medium: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "The function of education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.",
    "In the end, we will remember not the words of our enemies, but the silence of our friends."
  ],
  hard: [
    "The mind is not a vessel to be filled, but a fire to be kindled. The task of the modern educator is not to cut down jungles, but to irrigate deserts.",
    "I have a dream that one day this nation will rise up and live out the true meaning of its creed: 'We hold these truths to be self-evident, that all men are created equal.'",
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity."
  ]
};

function WPMTest({ user }) {
  const [difficulty, setDifficulty] = useState('medium');
  const [duration, setDuration] = useState(60);
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timer, setTimer] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setText(texts[difficulty][Math.floor(Math.random() * texts[difficulty].length)]);
  }, [difficulty]);

  const endTest = useCallback(() => {
    setIsRunning(false);
    const words = userInput.trim().split(/\s+/).length;
    const accuracy = calculateAccuracy(text, userInput);
    const wpm = Math.round((words / duration) * 60);
    setResults({ wpm, accuracy });
  }, [userInput, text, duration]);

  useEffect(() => {
    if (isRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      endTest();
    }
  }, [isRunning, timer, endTest]);

  const startTest = () => {
    if (!isRunning) {
      setIsRunning(true);
      setTimer(duration);
      setResults(null);
      inputRef.current?.focus();
    }
  };

  const calculateAccuracy = (original, typed) => {
    if (!original || !typed) return 0;
    const originalWords = original.trim().split(/\s+/);
    const typedWords = typed.trim().split(/\s+/);
    let correct = 0;
    for (let i = 0; i < Math.min(originalWords.length, typedWords.length); i++) {
      if (originalWords[i] === typedWords[i]) correct++;
    }
    return Math.round((correct / originalWords.length) * 100);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value !== undefined) {
      setUserInput(value);
      if (!isRunning && value.length === 1) {
        startTest();
      }
    }
  };

  const renderTypedText = () => {
    if (!userInput) return null;
    return userInput.split('').map((char, index) => {
      const isCorrect = char === text[index];
      return (
        <span key={index} className={isCorrect ? 'correct' : 'incorrect'}>
          {char}
        </span>
      );
    });
  };

  return (
    <TestContainer>
      <h2>WPM Test</h2>
      <SettingsContainer>
        <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} disabled={isRunning}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          min="10"
          max="300"
          disabled={isRunning}
        />
      </SettingsContainer>
      <TextDisplay>
        <FadedText>{text}</FadedText>
        <TypedText
          ref={inputRef}
          contentEditable
          onInput={handleInputChange}
          suppressContentEditableWarning
        >
          {renderTypedText()}
        </TypedText>
      </TextDisplay>
      <p>Time remaining: {timer} seconds</p>
      {results && (
        <ResultsContainer>
          <h3>Results</h3>
          <p>WPM: {results.wpm}</p>
          <p>Accuracy: {results.accuracy}%</p>
        </ResultsContainer>
      )}
    </TestContainer>
  );
}

export default WPMTest;