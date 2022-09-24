import { useState } from "react";

const toggleEditing = (setIsEditing) => {
	console.log("CRUD database operations would be performed here");
	setIsEditing((prevState) => !prevState);
};

export const Question = () => {
	const [isEditing, setIsEditing] = useState(true);
	const [type, setType] = useState();
	const [text, setText] = useState("Question text");

	return (
		<>
			<button onClick={() => toggleEditing(setIsEditing)}>
				Toggle Editing
			</button>
			{/* TODO: form validation? */}
			{isEditing ? (
				<form>
					<label>
						Select question type:
						<select value={type} onChange={(e) => setType(e.target.value)}>
							<option value="text">Text</option>
							<option value="number">Number</option>
							<option value="boolean">True/False</option>
							<option value="multiple-choice">Multiple Choice</option>
						</select>
					</label>
				</form>
			) : (
				<p>{type}</p>
			)}
			{isEditing ? (
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			) : (
				<p>{text}</p>
			)}
			{/* TODO: show answers and editable answer text */}
		</>
	);
};
