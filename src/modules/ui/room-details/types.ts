import { Lesson } from "@/store/types/room";

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
