import { useState } from "react";

const toggleEditing = (setIsEditing) => {
	console.log("CRUD database operations would be performed here");
	setIsEditing((prevState) => !prevState);
};

export const Question = ({ content, dragHandleProps, isDragging }) => {
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
			{/* TODO: form validation? */}
			<div className="flex-grow">
				{isEditing ? (
					<form>
						<input
							type="text"
							className={`block ${isEditing && "bg-slate-200"}`}
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<label className="block">
							Question type:
							<select
								value={type}
								onChange={(e) => setType(e.target.value)}
								className={isEditing && "bg-slate-200"}
							>
								<option value="text">Text</option>
								<option value="number">Number</option>
								<option value="boolean">True/False</option>
								<option value="multiple-choice">Multiple Choice</option>
							</select>
						</label>
					</form>
				) : (
					<>
						<p>{text}</p>
						<p>{type}</p>
					</>
				)}
				{/* TODO: show answers and editable answer text */}
			</div>

			<div className="flex flex-col">
				<button
					onClick={() => toggleEditing(setIsEditing)}
					className="h-11 w-11 p-3"
				>
					{isEditing ? (
						<p>Save</p>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							{/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
							<path d="M421.7 220.3l-11.3 11.3-22.6 22.6-205 205c-6.6 6.6-14.8 11.5-23.8 14.1L30.8 511c-8.4 2.5-17.5 .2-23.7-6.1S-1.5 489.7 1 481.2L38.7 353.1c2.6-9 7.5-17.2 14.1-23.8l205-205 22.6-22.6 11.3-11.3 33.9 33.9 62.1 62.1 33.9 33.9zM96 353.9l-9.3 9.3c-.9 .9-1.6 2.1-2 3.4l-25.3 86 86-25.3c1.3-.4 2.5-1.1 3.4-2l9.3-9.3H112c-8.8 0-16-7.2-16-16V353.9zM453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-14.5 14.5-22.6 22.6-11.3 11.3-33.9-33.9-62.1-62.1L314.3 67.7l11.3-11.3 22.6-22.6 14.5-14.5c25-25 65.5-25 90.5 0z" />
						</svg>
					)}
				</button>
				{/* todo: pass in onDelete handler to set state */}
				<button className="h-11 w-11 p-3">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
						{/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
						<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
					</svg>
				</button>
			</div>
		</section>
	);
};
