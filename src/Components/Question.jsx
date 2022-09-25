import { useState } from "react";
import { BooleanQuestion } from "./BooleanQuestion";
import { Pencil } from "./Icons/Pencil";
import { Trash } from "./Icons/Trash";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

const toggleEditing = (setIsEditing) => {
	console.log("CRUD database operations would be performed here");
	setIsEditing((prevState) => !prevState);
};

export const Question = ({ deleteQuestion, dragHandleProps, isDragging }) => {
	const [isEditing, setIsEditing] = useState(true);
	const [type, setType] = useState();
	const [text, setText] = useState("Question text");

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
					</form>
				) : (
					<>
						<p>{text}</p>
						<p>{type}</p>
					</>
				)}
				{type === "text" && (
					<input type="text" placeholder="Answer input" disabled />
				)}
				{type === "number" && <input type="number" placeholder="0" disabled />}
				{type === "boolean" && <BooleanQuestion isEditing={isEditing} />}
				{type === "multiple-choice" && (
					<MultipleChoiceQuestion isEditing={isEditing} />
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
