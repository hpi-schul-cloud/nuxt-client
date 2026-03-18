export interface DashBoardTask {
	availableDate: string; // ISO Date string
	background: string; // Hex-color, e.g. "#54616e"
	content: string;
	courseId: {
		_id: string;
		name: string;
		color: string;
	};
	description: string;
	dueDate: string; // ISO Date string
	hasEvaluation: boolean;
	lessonHidden: boolean;
	lessonId: {
		hidden: boolean;
	};
	name: string;
	private: boolean;
	secondaryTitle: string; // e.g. "in 5 Stunden"
	stats: {
		userCount: number;
		submissionCount: number;
		gradeCount: number;
	};
	submissions: number;
	title: string;
	url: string;
	_id: string;
}

export interface DashBoardResponse {
	assignedHomeworks: DashBoardTask[];
	homeworksFeedbackRequired: DashBoardTask[];
	homeworksWithFeedback: DashBoardTask[];
	privateHomeworks: DashBoardTask[];
	showNewReleaseModal: boolean;
}
