const operators: string[] = ['+', '-', '×', '/']
const numbers: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const parseExp = (exp:string):string => {
    if (exp[0] === '/' || exp[0] === '×' || exp[0] === '%' || exp[0] === '+') exp = exp.slice(1)
    if (exp[0] === ',') exp = '0' + exp.split('0')
    if (operators.includes(exp[exp.length-1]) || '√' === exp[exp.length-1]) {
        exp = exp.slice(0, -1)
    }
    return exp
}

// Сделать рекурсию

export const parseExpToAnswer = (exp: string):string => {
    let expression:string[] = exp.split('')

    // Замена всех запятых на точки
    for (let i = 0; i <= expression.length; i++) {
        if (expression[i] === ',') expression[i] = '.'
    }

    // Вычисление
    for (let i = 0; i <= expression.length; i++) {
        // Замена знака умножения
        if (expression[i] === '×') expression[i] = '*'

        // Вычисление корня
        if (expression[i] === '√' && numbers.includes(expression[i+1])) {
            // Обработка корня без скобок
            let expressionSqrt:string = ''
            let indexSqrt:number = i+1
            while (numbers.includes(expression[indexSqrt])) {
                expressionSqrt = expressionSqrt+expression[indexSqrt]
                indexSqrt++
            }
            const sqrt:string = Math.sqrt(eval(expressionSqrt)).toString()
            expression[i] = sqrt
            expression = expression.slice(0, i+1).concat(expression.slice(i+expressionSqrt.length+1))
        } else if (expression[i] === '√' && expression[i+1] === '(') {
            // Обработка корня со скобками
            let expressionSqrt:string = ''
            let indexSqrt:number = i+2
            while (expression[indexSqrt] !== ')') {
                expressionSqrt = expressionSqrt+expression[indexSqrt]
                indexSqrt++
            }
            const sqrt:string = Math.sqrt(parseInt(parseExpToAnswer(expressionSqrt))).toString()
            expression[i] = sqrt
            expression = expression.slice(0, i+1).concat(expression.slice(i+3+expressionSqrt.length))
        }
    }
    let answer:string[] = eval(expression.join('')).toString().split('')
    for (let i = 0; i <= answer.length; i++) {
        if (answer[i] === '.') answer[i] = ','
    }
    return answer.join('')
}