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
			<main className="bg-cyan-50 border-slate-900 border-solid border-2 rounded p-4 md:p-8 mx-8 md:mx-auto mt-12 mb-16 max-w-2xl">
				<div className="flex sm:gap-4">
					<h1 className="text-3xl mb-4">
						{isEditingTitle ? (
							<form
								className="block"
								onSubmit={(e) => {
									e.preventDefault();
									setSurveyTitle(surveyTitle);
									setIsEditingTitle(false);
								}}
							>
								<input
									type="text"
									autoFocus
									className="border-solid border-2 border-slate-900 text-slate-900 max-w-[200px] sm:max-w-none"
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
						className={`h-11 w-11 ${
							!isEditingTitle && "p-3"
						} group transition hover:bg-cyan-800 rounded`}
					>
						{isEditingTitle ? "Save" : <Pencil />}
					</button>
				</div>
				{questionIds.length > 0 && (
					<p className="mb-4">Number of questions: {questionIds.length}</p>
				)}
				<Droppable droppableId="questions-container">
					{(provided, snapshot) => (
						<ul
							ref={provided.innerRef}
							{...provided.droppableProps}
							className="space-y-4"
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
					className="text-lg mt-4 bg-white rounded transition hover:bg-cyan-800 hover:text-slate-50 border-slate-900 border-solid border-2 p-2"
				>
					Add a question
				</button>
			</main>
		</DragDropContext>
	);
};
