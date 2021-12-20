import React, {useEffect, useState} from 'react';
import {parseExp, parseExpToAnswer} from "../ariphmeticParse";

const Calculator: React.FC = () => {
    const operations: string[] = ['+', '-', '×', '/', ',']
    const [answer, setAnswer] = useState<string>('0')
    const [actions, setActions] = useState<string>('')
    const [haveCalc, setHaveCalc] = useState(false)

    const calc = (actions:string):void => {
        if (!actions.length) return
        const newExp = parseExp(actions)
        setActions(newExp)
        const answer = parseExpToAnswer(newExp)
        setAnswer(answer)
        setHaveCalc(true)
    }

    const removeAction = () => {
        if (actions.length) setActions(prevState => prevState.slice(0, -1))
    }

    const newAction = (e:KeyboardEvent):void => {
        if (e.key === 'x' || e.key === '*') addAction('×')
        else if (e.key === 'Enter') calc(actions)
        else if (e.key === 'Backspace') removeAction()
        else addAction(e.key)
    }

    const addAction = (e:string) => {
        const keys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '/', '%', '(', ')', ',', '×']
        if (!keys.includes(e)) return
        setActions(prevState => {
            if (haveCalc) return e
            return prevState+e
        })
        setHaveCalc(false)
    }

    const clear = () => {
        setActions('')
        setAnswer('0')
    }

    useEffect(() => {
        const action = actions[actions.length-1]
        if (operations.includes(actions[actions.length-2]) && operations.includes(action)) {
            setActions(prevState => prevState.slice(0, -2)+action)
            return
        }
    }, [actions])

    useEffect(() => {
        document.addEventListener('keydown', newAction)

        return ():void => document.removeEventListener('keydown', newAction)
    }, [newAction])

    return (
        <div className='calc-wrap' >
            <p className='action'>{actions}</p>
            <p className='answer'>{answer}</p>
            <div className='line'></div>
            <div className='btn-wrap'>
                <div className="btn" onClick={clear}>C</div>
                <div className="btn" onClick={() => addAction('√')}>√</div>
                <div className="btn" onClick={() => addAction('%')}>%</div>
                <div className="btn" onClick={() => addAction('/')}>/</div>
                <div className="btn" onClick={() => addAction('7')}>7</div>
                <div className="btn" onClick={() => addAction('8')}>8</div>
                <div className="btn" onClick={() => addAction('9')}>9</div>
                <div className="btn" onClick={() => addAction('×')}>×</div>
                <div className="btn" onClick={() => addAction('4')}>4</div>
                <div className="btn" onClick={() => addAction('5')}>5</div>
                <div className="btn" onClick={() => addAction('6')}>6</div>
                <div className="btn" onClick={() => addAction('-')}>-</div>
                <div className="btn" onClick={() => addAction('1')}>1</div>
                <div className="btn" onClick={() => addAction('2')}>2</div>
                <div className="btn" onClick={() => addAction('3')}>3</div>
                <div className="btn" onClick={() => addAction('+')}>+</div>
                <div className="btn" onClick={() => addAction('00')}>00</div>
                <div className="btn" onClick={() => addAction('0')}>0</div>
                <div className="btn" onClick={() => addAction(',')}>,</div>
                <div className="btn calc" onClick={() => calc(actions)}>=</div>
            </div>
        </div>
    );
};

export default Calculator;