import { useState } from "react";

export const BooleanQuestion = ({ isEditing }) => {
	const [answerText, setAnswerText] = useState([
		"Option 1 Text",
		"Option 2 Text",
	]);

	return isEditing ? (
		<>
			<input
				type="text"
				value={answerText[0]}
				onChange={(e) =>
					setAnswerText((prevState) => {
						const newState = [...prevState];
						newState.splice(0, 1, e.target.value);
						return newState;
					})
				}
			/>
			<input
				type="text"
				value={answerText[1]}
				onChange={(e) =>
					setAnswerText((prevState) => {
						const newState = [...prevState];
						newState.splice(1, 1, e.target.value);
						return newState;
					})
				}
			/>
		</>
	) : (
		<>
			<input type="radio" name="bool-1" disabled />
			<label htmlFor="bool-1">{answerText[0]}</label>
			<input type="radio" name="bool-2" disabled />
			<label htmlFor="bool-2">{answerText[1]}</label>
		</>
	);
};
