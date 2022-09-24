import { useState } from "react";

export const Question = () => {
	const [isEditing, setIsEditing] = useState(true);
	const [type, setType] = useState();
	const [text, setText] = useState("Question text");

	return (
		<>
			<button onClick={() => setIsEditing((prevState) => !prevState)}>
				Toggle Editing
			</button>
			{isEditing && (
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
			)}
			{isEditing && (
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			)}
			{!isEditing && <p>{text}</p>}
			{/* show answers and editable answer text */}
		</>
	);
};
