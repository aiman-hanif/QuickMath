import './App.css';
import { useState, useEffect, useRef } from 'react';

import commify from './commify';

function App() {
  const [current, setCurrent] = useState("0");
  const [memory, setMemory] = useState(null);
  const [op, setOp] = useState(null);
  const [isOp, setIsOp] = useState(false);
  const [decPresent, setDecPresent] = useState(false);
  const [neg, setNeg] = useState(1);
  const [clearBtn, setClearBtn] = useState('AC');
  const [pressedBtn, setPressedBtn] = useState(null);

  const handlePress = (val) => {
    setPressedBtn(val);
    setClearBtn('C');
    const num = parseFloat(current);
    if (isOperator(val)) {
        setNeg(1);
        setIsOp(true);
        setDecPresent(false);
    } else {
        setIsOp(false);
    }
    if (val === '+/-') {
        if (current === "0" || isOp) {
            setCurrent("-0");
        }
        else if (current === '-0') {
            setCurrent("0");
        }
        else {
            setCurrent((num*-1).toString());
        }
        setNeg(-1*neg);
        return;
    }
    if (val === '%') {
        setCurrent((num/100).toString());
        return;
    }
    if (val === '+') {
        setMemory(current);
        setOp('+');
        setCurrent(calculate(op).toString());
        setMemory(calculate(op).toString());
        return;
    }
    if (val === '-') {
        setMemory(current);
        setOp('-');
        setCurrent(calculate(op).toString());
        setMemory(calculate(op).toString());
        return;
    }
    if (val === 'x') {
        setMemory(current);
        setOp('x');
        setCurrent(calculate(op).toString());
        setMemory(calculate(op).toString());
        return;
    }
    if (val === '/') {
        setMemory(current);
        setOp('/');
        setCurrent(calculate(op).toString());
        setMemory(calculate(op).toString());
        return;
    }
    if (val === '=') {
        setMemory(current);
        setOp(null);
        setDecPresent(false);
        setCurrent(calculate(op).toString());
        setMemory(calculate(op).toString());
        setNeg(1);
        return;
    }
    if (isOp) {
        if (val === '.') {
            if (!decPresent) {
                setCurrent(('0' + val).toString());
                setDecPresent(true);
            }
            
        }
        else {
            let temp = parseFloat(val);
            neg*temp > 0 
            ? setCurrent(temp.toString()) 
            : setCurrent((neg*temp).toString());
        }
    }
    else {
        if (val === '.') {
            if (!decPresent) {
                if (commify(current).toString().length < 11) {
                    setCurrent(num + val.toString());
                    setDecPresent(true);
                }
            }
        }
        else {
            
            if (commify(current).toString().length < 11) {
                let temp = parseFloat(num + val);
                neg*temp > 0 
                ? setCurrent(temp.toString()) 
                : setCurrent((neg*temp).toString());
            }
        }
    }
  }
  
  const isOperator = (val) => {
    return ['x', '-', '+', '/'].includes(val);
    };

  const calculate = (op) => {
    if (op === null) {
        return current;
    }
    if (op === '+') {
        console.log(memory + "+" + parseFloat(current));
        return parseFloat((parseFloat(memory) + parseFloat(current)).toFixed(8));
    }
    if (op === '-') {
        return parseFloat((parseFloat(memory) - parseFloat(current)).toFixed(8));
    }
    if (op === 'x') {
        return parseFloat((parseFloat(memory) * parseFloat(current)).toFixed(8));
    }
    if (op === '/') {
        return parseFloat((parseFloat(memory) / parseFloat(current)).toFixed(8));
    }
  }
  
  const handleClear = (clearBtn) => {
    if (clearBtn === 'AC') {
        setMemory(null);
        setIsOp(false);
        setOp(null);
        setPressedBtn('AC');
    }
    else {
        setPressedBtn(op);
    }
    setClearBtn('AC');
    setCurrent("0");
    setDecPresent(false);
    setNeg(1);
    return;
  }

  return (
    <div className='flex-container'>
      <div className='card'>
        <div>
          <p className={commify(current).length <= 10 ? `default-display` : `longer-display`}>{commify(current)}</p>
        </div>
        <div className="row1">
          <button className="white-btn" onClick={() => handleClear(clearBtn)}>{clearBtn}</button>
          <button className="white-btn" onClick={() => handlePress('+/-')}>+/-</button>
          <button className="white-btn" onClick={() => handlePress('%')}>%</button>
          <button className={`orange-btn ${pressedBtn === '/' ? 'pressed' : ''}`} onClick={() => handlePress('/')}><i className="fa-solid fa-divide"></i></button>
        </div>
        <div className="row2">
          <button onClick={() => handlePress('7')}>7</button>
          <button onClick={() => handlePress('8')}>8</button>
          <button onClick={() => handlePress('9')}>9</button>
          <button className={`orange-btn ${pressedBtn === 'x' ? 'pressed' : ''}`} onClick={() => handlePress('x')}>x</button>
        </div>
        <div className="row3">
          <button onClick={() => handlePress('4')}>4</button>
          <button onClick={() => handlePress('5')}>5</button>
          <button onClick={() => handlePress('6')}>6</button>
          <button className={`orange-btn ${pressedBtn === '-' ? 'pressed' : ''}`} onClick={() => handlePress('-')}>-</button>
        </div>
        <div className="row4">
          <button onClick={() => handlePress('1')}>1</button>
          <button onClick={() => handlePress('2')}>2</button>
          <button onClick={() => handlePress('3')}>3</button>
          <button className={`orange-btn ${pressedBtn === '+' ? 'pressed' : ''}`} onClick={() => handlePress('+')}>+</button>
        </div>
        <div className="row5">
          <button className="zero" onClick={() => handlePress('0')}>0</button>
          <button className='period' onClick={() => handlePress('.')}>.</button>
          <button className='equal' onClick={() => handlePress('=')}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
