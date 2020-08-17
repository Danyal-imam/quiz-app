import {ApiQuestions,Question} from '../Types/quizTypes'

const shuffleArray = ((array:any[]) => {
    return [...array].sort(()=>Math.random()  - 0.5)
})
export const quizData = async(totalQuestion: number, difficulty:string):Promise<Question[]> =>{
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestion}&difficulty=${difficulty}&type=multiple`)
    let {results} = await res.json();
    const quiz:Question[] = await results.map((questionObj:ApiQuestions) => {
        return {
            difficulty:questionObj.difficulty,
            question:questionObj.question,
            answer:questionObj.correct_answer,
            options:shuffleArray(questionObj.incorrect_answers.concat(questionObj.correct_answer))
        }
  })
  return quiz

}


