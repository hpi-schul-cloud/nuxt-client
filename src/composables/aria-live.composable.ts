export const useAriaLive = () => {
	const actionTypeMap = {
		// list of action types that should be announced to the screen reader
		"create-card-success": {
			message: "A card was created successfully",
			importance: "assertive",
		},
		"create-column-success": {
			message: "A column was created successfully",
			importance: "polite",
		},
		"delete-card-success": {
			message: "A card was deleted successfully",
			importance: "polite",
		},
		"delete-card-failure": {
			message: "Failed to delete a card",
			importance: "assertive",
		},
		"delete-column-success": {
			message: "A column was deleted successfully",
			importance: "polite",
		},
		"delete-column-failure": {
			message: "Failed to delete a column",
			importance: "assertive",
		},
		// and so on...
	};

	const setAriaLive = (actionType: string) => {
		const action = actionTypeMap[actionType as keyof typeof actionTypeMap];
		if (!action) return;

		// should be a div with aria-live="polite | assertive" attribute
		// and should be appended to the root of the application or the main layout
		// the aria-live attribute should be set polite or assertive based on the importance of the message
		const element = document.getElementById("aria-zone");
		if (!element) return;

		element.setAttribute("aria-live", action.importance);
		element.innerHTML = action.message;

		// should have a setTimeout to remove the message after a few seconds
		// that is because to avoid repeating messages
		// and also if the same message is repeated, the screen reader will not read it again
		setTimeout(() => {
			element.innerHTML = "";
		}, 5000);
	};

	return {
		setAriaLive,
	};
};
