export type Status = "completed" | "open" | "expired";
export type TeacherSubmission = {
	status: Status;
	firstName: string;
	lastName: string;
};
export type StudentSubmission = {
	completed: boolean;
};
