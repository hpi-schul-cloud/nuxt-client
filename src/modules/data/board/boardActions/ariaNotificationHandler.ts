import { useAriaLive } from "@/composables/ariaLiveNotifier";

const { notifyOnScreenReader } = useAriaLive();

const ariaMessageMap: Record<
	string,
	{ message: string; importance: "off" | "polite" | "assertive" }
> = {
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
	"delete-column-success": {
		message: "A column was deleted successfully",
		importance: "polite",
	},

	// and so on...
};

export const actionToAriaMessage = (actionType: string) => {
	const action = ariaMessageMap[actionType];
	if (!action) return;

	notifyOnScreenReader(action.message, action.importance);
};
