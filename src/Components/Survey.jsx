import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Question } from "./Question";

const addQuestion = (setQuestions) => {
	const id = Math.random() * 100; // TODO: safer way to generate ids?
	return setQuestions((prevState) => [...prevState, id.toFixed(2).toString()]);
};

const reorderQuestions = (result, setQuestions) => {
	if (result.reason === "CANCEL") return;

	const questionId = result.draggableId;
	const oldPosition = result.source.index;
	const newPosition = result.destination.index;

	// TODO: checks against current state before reordering?
	return setQuestions((prevState) => {
		prevState.splice(oldPosition, 1); // remove repositioned Q from original index
		prevState.splice(newPosition, 0, questionId); // add repositioned Q at new index
		return prevState;
	});
};

export const Survey = () => {
	// for a production, full-stack application, would get the questions from a database
	const [questions, setQuestions] = useState([]);

	return (
		<DragDropContext
			onDragEnd={(result) => reorderQuestions(result, setQuestions)}
		>
			<main className="my-12 mx-8 lg:mx-auto max-w-4xl">
				<h1 className="text-3xl">I am a survey</h1>{" "}
				{/* TODO: make title editable */}
				{questions.length > 0 && <p>Number of questions: {questions.length}</p>}
				<Droppable droppableId="questions-container">
					{(provided, snapshot) => (
						<ul
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="max-w-2xl mx-auto py-8 space-y-4"
						>
							{questions.map((question, i) => (
								<Draggable key={question} draggableId={question} index={i}>
									{(provided, snapshot) => (
										<li ref={provided.innerRef} {...provided.draggableProps}>
											<Question
												content={question}
												dragHandleProps={provided.dragHandleProps}
												isDragging={snapshot.isDragging}
											/>
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
				<button
					onClick={() => {
						addQuestion(setQuestions);
					}}
					className="text-lg border-slate-900 border-solid border-2 p-2 hover:bg-slate-400"
				>
					Add a question
				</button>
			</main>
		</DragDropContext>
	);
};
