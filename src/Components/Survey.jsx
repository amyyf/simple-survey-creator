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
			<h1>I am a survey</h1>
			<p>Number of questions: {questions.length}</p>
			<Droppable droppableId="questions-container">
				{(provided, snapshot) => (
					<ul ref={provided.innerRef} {...provided.droppableProps}>
						{questions.map((question, i) => (
							<Draggable key={question} draggableId={question} index={i}>
								{(provided, snapshot) => (
									<li
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<Question content={question} />
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
			>
				Add a question
			</button>
		</DragDropContext>
	);
};
