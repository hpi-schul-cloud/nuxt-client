import { openDialog } from "./dialog-manager";

export const askBeforeDelete = async () => {
	console.log("Asking for confirmation...");
	const result = await openDialog("confirm", {
		title: "Delete item",
		message: "Are you sure you want to delete this item?",
	});

	if (!result.completed) {
		console.log("User cancelled");
		return;
	}

	console.log("Confirmed:", result.data); // boolean
};

export const askForName = async () => {
	const result = await openDialog("prompt", {
		title: "Enter your name",
		placeholder: "Name",
		initialValue: "",
	});

	if (!result.completed) {
		console.log("Prompt cancelled");
		return;
	}

	console.log("Name:", result.data); // string
};

export const askDeletion = (
	title: string,
	message?: string,
	messageType: "info" | "warning" = "warning",
	confirmBtnKey = "common.actions.delete"
) =>
	openDialog("confirmation", {
		title,
		message,
		messageType,
		confirmBtnKey,
	});
