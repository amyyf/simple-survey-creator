export const prettyPrintType = (type) => {
	switch (type) {
		case "text":
			return "Text";
		case "number":
			return "Number";
		case "boolean":
			return "Boolean";
		case "multiple-choice":
			return "Multiple Choice";
		default:
			return; // This should be sufficient since types are essentially an enum
	}
};
