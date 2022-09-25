import { useState } from "react";
import { Pencil } from "./Icons/Pencil";
import { Trash } from "./Icons/Trash";

const toggleEditing = (setIsEditing) => {
	console.log("CRUD database operations would be performed here");
	setIsEditing((prevState) => !prevState);
};

export const Question = ({ deleteQuestion, dragHandleProps, isDragging }) => {
	const [isEditing, setIsEditing] = useState(true);
	const [type, setType] = useState();
	const [text, setText] = useState("Question text");
	const [booleanAnswerText, setBooleanAnswerText] = useState([
		"Option 1 Text",
		"Option 2 Text",
	]);
	const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState([
		"Option 1 text",
	]);
	const [multipleChoiceAllowMultiple, setMultipleChoiceAllowMultiple] =
		useState(false);

	return (
		<section
			{...dragHandleProps}
			className={`bg-white flex space-between gap-2 border-2 border-solid border-slate-900 rounded p-4 ${
				isDragging && "bg-slate-300"
			}`}
		>
			<div className="flex-grow">
				{isEditing ? (
					<form
						onSubmit={() => console.log("CRUD operations performed here.")}
						className="space-y-2"
					>
						<input
							type="text"
							className={`block ${isEditing && "bg-slate-200"}`}
							value={text}
							onChange={(e) => setText(e.target.value)}
							required
						/>
						<select
							value={type}
							onChange={(e) => setType(e.target.value)}
							className={`block ${isEditing && "bg-slate-200"}`}
							required
						>
							{/* make util to convert from type to pretty print */}
							<option value="">-- Select question type: --</option>
							<option value="text">Text</option>
							<option value="number">Number</option>
							<option value="boolean">Boolean</option>
							<option value="multiple-choice">Multiple Choice</option>
						</select>
						{/* set message on hover about why inputs are disabled */}
						{type === "text" && (
							<input type="text" placeholder="text answer" disabled />
						)}
						{type === "number" && (
							<input type="number" placeholder="0" disabled />
						)}
						{type === "boolean" && (
							<>
								<input
									type="text"
									value={booleanAnswerText[0]}
									onChange={(e) =>
										setBooleanAnswerText((prevState) => {
											const newState = [...prevState];
											newState.splice(0, 1, e.target.value);
											return newState;
										})
									}
								/>
								<input
									type="text"
									value={booleanAnswerText[1]}
									onChange={(e) =>
										setBooleanAnswerText((prevState) => {
											const newState = [...prevState];
											newState.splice(1, 1, e.target.value);
											return newState;
										})
									}
								/>
							</>
						)}
						{type === "multiple-choice" && (
							<>
								<input
									type="checkbox"
									name="select-opt"
									checked={multipleChoiceAllowMultiple}
									onChange={(e) =>
										setMultipleChoiceAllowMultiple(e.target.checked)
									}
								/>
								<label htmlFor="select-opt">
									Allow selecting multiple answers
								</label>
								{multipleChoiceAnswers.map((option, i) => (
									<>
										<input
											key={`multiple-choice-${i}`}
											type="text"
											value={option}
											required
											onChange={(e) => {
												setMultipleChoiceAnswers((prevState) => {
													const newState = [...prevState];
													newState.splice(i, 1, e.target.value);
													return newState;
												});
											}}
										/>
										<button
											onClick={(e) => {
												e.preventDefault();
												setMultipleChoiceAnswers((prevState) => {
													const newState = [...prevState];
													newState.splice(i, 1);
													return newState;
												});
											}}
										>
											-
										</button>
									</>
								))}
								<button
									onClick={(e) => {
										e.preventDefault();
										setMultipleChoiceAnswers((prevState) => [
											...prevState,
											`Option ${prevState.length + 1} text`,
										]);
									}}
								>
									+
								</button>
							</>
						)}
					</form>
				) : (
					<>
						<p>{text}</p>
						<p>{type}</p>
						{type === "boolean" && (
							<>
								<input type="radio" name="bool-1" disabled />
								<label htmlFor="bool-1">{booleanAnswerText[0]}</label>
								<input type="radio" name="bool-2" disabled />
								<label htmlFor="bool-2">{booleanAnswerText[1]}</label>
							</>
						)}
						{type === "multiple-choice" && (
							<>
								<p>
									{multipleChoiceAllowMultiple
										? "Multiple options may be selected."
										: "Only one option may be selected."}
								</p>
								{multipleChoiceAnswers.map((option, i) => (
									<>
										<input
											type={multipleChoiceAllowMultiple ? "checkbox" : "radio"}
											key={`option-${i}`}
											name={`option-${i}`}
											disabled
										/>
										<label htmlFor={`option-${i}`}>{option}</label>
									</>
								))}
							</>
						)}
					</>
				)}
			</div>

			<div className="flex flex-col">
				<button
					onClick={() => toggleEditing(setIsEditing)}
					className="h-11 w-11 p-3"
				>
					{isEditing ? <p>Save</p> : <Pencil />}
				</button>
				<button className="h-11 w-11 p-3" onClick={deleteQuestion}>
					<Trash />
				</button>
			</div>
		</section>
	);
};
