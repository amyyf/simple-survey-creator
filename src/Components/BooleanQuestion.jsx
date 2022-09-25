import { useState } from "react";

export const BooleanQuestion = ({ isEditing }) => {
	const [answerText, setAnswerText] = useState([
		"Option 1 Text",
		"Option 2 Text",
	]);

	return isEditing ? (
		<>
			{answerText.map((option, i) => (
				<input
					key={option}
					type="text"
					value={option}
					className="block h-8 w-full bg-yellow-200 max-w-[200px] xs:max-w-none"
					onChange={(e) =>
						setAnswerText((prevState) => {
							const newState = [...prevState];
							newState.splice(i, 1, e.target.value);
							return newState;
						})
					}
				/>
			))}
		</>
	) : (
		<>
			{answerText.map((option, i) => (
				<label
					htmlFor={`bool-${i}`}
					key={`bool-${i}`}
					className="block space-x-2"
				>
					<input type="radio" name={`bool-${i}`} disabled />
					<span>{option}</span>
				</label>
			))}
		</>
	);
};
