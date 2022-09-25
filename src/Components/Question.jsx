import { useState } from "react";
import { prettyPrintType } from "../util";
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
			className={`bg-white flex space-between gap-8 border-2 border-solid border-slate-900 rounded p-4 relative ${
				isDragging && "bg-cyan-300"
			}`}
		>
			<div
				{...dragHandleProps}
				className="block absolute inset-0 h-full w-11 bg-cyan-300 border-r-2 border-r-cyan-500 hover:bg-cyan-500"
			></div>
			<div className="flex-grow ml-10 space-y-2">
				{isEditing ? (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							console.log("CRUD operations performed here.");
						}}
						className="space-y-2"
					>
						<textarea
							className={`w-full ${isEditing && "bg-yellow-200"}`}
							value={text}
							onChange={(e) => setText(e.target.value)}
							required
						/>
						<select
							value={type}
							onChange={(e) => setType(e.target.value)}
							className={`h-8 ${isEditing && "bg-yellow-200"}`}
							required
						>
							<option value="">-- Select question type: --</option>
							<option value="text">{prettyPrintType("text")}</option>
							<option value="number">{prettyPrintType("number")}</option>
							<option value="boolean">{prettyPrintType("boolean")}</option>
							<option value="multiple-choice">
								{prettyPrintType("multiple-choice")}
							</option>
						</select>
					</form>
				) : (
					<>
						<p>
							<span className="font-bold">{prettyPrintType(type)}: </span>
							{text}
						</p>
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

			<div className="flex flex-col self-start">
				<button
					onClick={() => toggleEditing(setIsEditing)}
					className={`h-11 w-11 ${
						!isEditing && "p-3"
					} rounded group transition hover:bg-cyan-800 hover:text-slate-50`}
				>
					{isEditing ? <p>Save</p> : <Pencil />}
				</button>
				<button
					className="h-11 w-11 p-3 rounded group transition hover:bg-cyan-800 hover:text-slate-50"
					onClick={deleteQuestion}
				>
					<Trash />
				</button>
			</div>
		</section>
	);
};
