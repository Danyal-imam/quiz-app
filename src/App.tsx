import React, { useEffect, useState } from 'react';
import { quizData } from './Services/QuizData';
import Questioncard from './Components/QuestionCard';
import { Question } from './Types/quizTypes';
import './App.css';

function App() {
	let [ quiz, setQuiz ] = useState<Question[]>([]);
	let [ currentQuestion, setCurrentQuestion ] = useState(0);
	let [ score, setScore ] = useState(0);
	let [ result, setResult ] = useState(false);
	let [ level, setLevel ] = useState('');
	let [ startQuiz, setStartQuiz ] = useState(true);
	let [ name, setName ] = useState('');
	let [numbering, setNumbering] = useState(1)

	const handleSubmission = (e: React.FormEvent<EventTarget>, userAns: string,questionNo:number) => {
		e.preventDefault();
		console.log(userAns);
		console.log(questionNo)
		setNumbering(++questionNo)
		if (userAns === quiz[currentQuestion].answer) {
			setScore(++score);
		}
		if (currentQuestion !== quiz.length - 1) {
			setCurrentQuestion(++currentQuestion);
		} else setResult(true);
	};
	const playAgain = () => {
		setResult(false);
		setCurrentQuestion(0);
		setScore(0);
		setStartQuiz(true);
		setNumbering(1)
	};
	const beginQuiz = (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();
		setStartQuiz(false);
	};
	useEffect(() => {
		async function getQuestions() {
			const apiData: Question[] = await quizData(10, level);
			console.log(apiData)
			setQuiz(apiData);
		}
		getQuestions();
	}, [level]);
	if (!quiz.length) return <h3 className='loading'>loading......</h3>;

	if (result) {
		return (
			<div className='result'>
				<h3>Quiz score</h3>
				<p>your name : {name}</p>
				<p >
					your score is {score} out of {quiz.length}
				</p>
				<button className='submitBtn' onClick={playAgain}>again{startQuiz}</button>
			</div>
		);
	}
	if (startQuiz) {
		return (
			<div className="container">
				<form onSubmit={beginQuiz}>
					<div className="desc">
						<label className="label">Enter your name:</label>
						<br />
						<input
							className="type"
							type="text"
							placeholder="Enter Your Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<label>Select Level of Difficulty: </label>
					<br />
					<select name="level" id="level" onChange={(e) => setLevel(e.target.value)}>
						<option value="easy">Easy</option>
						<option value="medium">Medium</option>
						<option value="hard">Hard</option>
					</select>
					<br />
					<input type="submit" className="submitBtn" />
				</form>
			</div>
		);
	}

	return (
		<div>
			<div className="title">
			<h1 >Quiz</h1>
	<h3>Question: {numbering}/{quiz.length}</h3>
			</div>

			<Questioncard
				question={quiz[currentQuestion].question}
				options={quiz[currentQuestion].options}
				callback={handleSubmission}
			/>
		</div>
	);
}

export default App;
