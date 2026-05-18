import { openDialog } from "./dialog-stack";

export const useDialogs = () => ({
	openDialog,

	confirmDelete(message: string) {
		return openDialog("confirm", {
			title: "Confirm",
			message,
		});
	},

	promptName() {
		return openDialog("prompt", {
			title: "Enter name",
			placeholder: "Name",
		});
	},
});
