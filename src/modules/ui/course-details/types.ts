import { Lesson } from "@/store/types/course";

export type MenuItem = {
	icon: string;
	action: () => void;
	name: string;
	dataTestId: string;
};

export type LessonData = Lesson & {
	numberOfDraftTasks: number;
	numberOfPlannedTasks: number;
	numberOfPublishedTasks: number;
};

export type PickerOption = {
	icon: string;
	label: string;
	eventName: string;
	dataTestId: string;
	ariaLabel: string;
};
