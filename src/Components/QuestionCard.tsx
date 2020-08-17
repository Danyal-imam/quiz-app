import React, { useState } from 'react';
import './../App.css'


type QuestionPropsType = {
	question: string;
	options: string[];
	callback: (e: React.FormEvent<EventTarget>,ans:string,questionN0:number) => void;
};

const QuestionCard: React.FC<QuestionPropsType> = ({ question, options, callback}) => {
	let [ selectedAns, setSelectedAns ] = useState('');
	let [qNumber, setqNmuber] =useState(0)
	const handleSelection = (e: any) => {
        
		setSelectedAns(e.target.value)
		setqNmuber(++qNumber)
    };
	return (
		<div className='container2'>
			<p dangerouslySetInnerHTML={{ __html: question }} />
			<form onSubmit={(e:React.FormEvent<EventTarget>)=>callback(e,selectedAns,qNumber)}>
				{options.map((opt: string, ind: number) => {
					return (
						<div key={ind}>
							<label>
								<input
									type="radio"
									value={opt}
									name="opt"
									required
                                    onChange={handleSelection}
                                    checked={selectedAns===opt}
								/>
								{opt}
							</label>
						</div>
					);
				})}
				<input type="submit" className='submitBtn'/>
			</form>
		</div>
	);
};

export default QuestionCard;
