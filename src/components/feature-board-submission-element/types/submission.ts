export type Status = "completed" | "open" | "expired";
export type TeacherViewSubmission = {
	status: Status;
	firstName: string;
	lastName: string;
};
export type StudentViewSubmission = {
	completed: boolean;
};
