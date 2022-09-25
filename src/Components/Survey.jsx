import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Pencil } from "./Icons/Pencil";
import { Question } from "./Question";

const addQuestion = (setQuestions) => {
	const id = Math.random() * 100; // TODO: safer way to generate ids?
	return setQuestions((prevState) => [...prevState, id.toFixed(2).toString()]);
};

const deleteQuestion = (question, setQuestions) => {
	return setQuestions((prevState) => {
		const deleteIndex = prevState.findIndex((q) => q === question);
		const newState = [...prevState];
		newState.splice(deleteIndex, 1);
		return newState;
	});
};

const reorderQuestions = (result, setQuestions) => {
	if (result.reason === "CANCEL") return;

	const questionId = result.draggableId;
	const oldPosition = result.source.index;
	const newPosition = result.destination.index;

	return setQuestions((prevState) => {
		const newState = [...prevState];
		newState.splice(oldPosition, 1); // remove repositioned Q from original index
		newState.splice(newPosition, 0, questionId); // add repositioned Q at new index
		return newState;
	});
};

export const Survey = () => {
	const [surveyTitle, setSurveyTitle] = useState("New Survey");
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	// for a production, full-stack application, would get the questions from a database
	const [questionIds, setQuestions] = useState([]);

	return (
		<DragDropContext
			onDragEnd={(result) => reorderQuestions(result, setQuestions)}
		>
			<main className="my-12 mx-8 lg:mx-auto max-w-4xl">
				<div className="flex">
					<h1 className="text-3xl">
						{isEditingTitle ? (
							<form
								onSubmit={(e) => {
									e.preventDefault();
									setSurveyTitle(surveyTitle);
									setIsEditingTitle(false);
								}}
							>
								<input
									type="text"
									autoFocus
									className="border-solid border-2 border-slate-900"
									value={surveyTitle}
									onChange={(e) => setSurveyTitle(e.target.value)}
									required
								/>
							</form>
						) : (
							<p>{surveyTitle}</p>
						)}
					</h1>
					<button
						onClick={() => setIsEditingTitle(!isEditingTitle)}
						className="h-11 w-11 p-3"
					>
						{isEditingTitle ? "Save" : <Pencil />}
					</button>
				</div>
				{questionIds.length > 0 && (
					<p>Number of questions: {questionIds.length}</p>
				)}
				<Droppable droppableId="questions-container">
					{(provided, snapshot) => (
						<ul
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="max-w-2xl mx-auto py-8 space-y-4"
						>
							{questionIds.map((question, i) => (
								<Draggable key={question} draggableId={question} index={i}>
									{(provided, snapshot) => (
										<li ref={provided.innerRef} {...provided.draggableProps}>
											<Question
												deleteQuestion={() =>
													deleteQuestion(question, setQuestions)
												}
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
