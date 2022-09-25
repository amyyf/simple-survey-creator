import { useState } from "react";
import { Trash } from "./Icons/Trash";

export const MultipleChoiceQuestion = ({ isEditing }) => {
	const [answers, setAnswers] = useState(["Option 1 text"]);
	const [allowMultiple, setAllowMultiple] = useState(false);

	return isEditing ? (
		<>
			<label htmlFor="select-opt" className="block space-x-2">
				<input
					type="checkbox"
					name="select-opt"
					checked={allowMultiple}
					onChange={(e) => setAllowMultiple(e.target.checked)}
				/>
				<span>Allow selecting multiple options</span>
			</label>
			{answers.map((option, i) => (
				<div key={`multiple-choice-${i}`} className="flex">
					<input
						type="text"
						value={option}
						className={`h-8 w-full ${
							isEditing && "bg-yellow-200"
						} max-w-[200px] xs:max-w-none`}
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
						className="h-8 w-8 p-2 rounded group transition hover:bg-cyan-800 hover:text-slate-50"
						onClick={(e) => {
							e.preventDefault();
							setAnswers((prevState) => {
								const newState = [...prevState];
								newState.splice(i, 1);
								return newState;
							});
						}}
					>
						<Trash />
					</button>
				</div>
			))}
			<button
				className="p-2 rounded transition hover:bg-cyan-800 hover:text-slate-50"
				onClick={(e) => {
					e.preventDefault();
					setAnswers((prevState) => [
						...prevState,
						`Option ${prevState.length + 1} text`,
					]);
				}}
			>
				+ Add another option
			</button>
		</>
	) : (
		<>
			<p className="italic">
				{allowMultiple
					? "Multiple options may be selected."
					: "Only one option may be selected."}
			</p>
			{answers.map((option, i) => (
				<label
					key={`option-${i}`}
					htmlFor={`option-${i}`}
					className="block space-x-2"
				>
					<input
						type={allowMultiple ? "checkbox" : "radio"}
						name={`option-${i}`}
						disabled
					/>
					<span>{option}</span>
				</label>
			))}
		</>
	);
};
