import { useState } from "react";

export const MultipleChoiceQuestion = ({ isEditing }) => {
	const [answers, setAnswers] = useState(["Option 1 text"]);
	const [allowMultiple, setAllowMultiple] = useState(false);

	return isEditing ? (
		<>
			<input
				type="checkbox"
				name="select-opt"
				checked={allowMultiple}
				onChange={(e) => setAllowMultiple(e.target.checked)}
			/>
			<label htmlFor="select-opt">Allow selecting multiple answers</label>
			{answers.map((option, i) => (
				<div key={`multiple-choice-${i}`}>
					<input
						type="text"
						value={option}
						required
						onChange={(e) => {
							setAnswers((prevState) => {
								const newState = [...prevState];
								newState.splice(i, 1, e.target.value);
								return newState;
							});
						}}
					/>
					<button
						onClick={(e) => {
							e.preventDefault();
							setAnswers((prevState) => {
								const newState = [...prevState];
								newState.splice(i, 1);
								return newState;
							});
						}}
					>
						-
					</button>
				</div>
			))}
			<button
				onClick={(e) => {
					e.preventDefault();
					setAnswers((prevState) => [
						...prevState,
						`Option ${prevState.length + 1} text`,
					]);
				}}
			>
				+
			</button>
		</>
	) : (
		<>
			<p>
				{allowMultiple
					? "Multiple options may be selected."
					: "Only one option may be selected."}
			</p>
			{answers.map((option, i) => (
				<div key={`option-${i}`}>
					<input
						type={allowMultiple ? "checkbox" : "radio"}
						name={`option-${i}`}
						disabled
					/>
					<label htmlFor={`option-${i}`}>{option}</label>
				</div>
			))}
		</>
	);
};
