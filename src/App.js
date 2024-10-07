import React, { useState } from 'react';
import Button from './components/Button';
import Display from './components/Display';
import './App.css';
import { evaluate } from 'mathjs';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isNewInput, setIsNewInput] = useState(false); // To track if a new operation is starting

  const handleClick = (label) => {
    if (label === '=') {
      try {
        const calculatedResult = evaluate(input).toString();
        setResult(calculatedResult);
        setInput(calculatedResult);
        setIsNewInput(true); // Flag to indicate a new operation can start
      } catch (error) {
        setResult('Error');
      }
    } else if (label === 'C') {
      setInput('');
      setResult('');
      setIsNewInput(false);
    } else {
      if (isNewInput) {
        if (['+', '-', '*', '/'].includes(label)) {
          setInput(result + label);
        } else {
          setInput(label);
        }
        setIsNewInput(false);
      } else {
        setInput(input + label);
      }
    }
  };

  return (
    <div className="app">
      <h1 className="title">Calculator</h1> {/* Add the title here */}
      <div className="calculator">
        <Display value={input || result || '0'} />
        <div className="buttons">
          {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'].map((label) => (
            <Button key={label} label={label} onClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
