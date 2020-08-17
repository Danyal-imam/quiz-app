
export type ApiQuestions = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type Question = {
    question: string,
    answer: string,
    options:string[]
}

