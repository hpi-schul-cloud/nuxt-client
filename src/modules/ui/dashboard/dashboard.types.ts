export interface DashBoardTask {
	availableDate: string; // ISO Date string
	background: string; // Hex-Farbe, z.B. "#54616e"
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
	secondaryTitle: string; // z.B. "in 5 Stunden"
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
	currentTime: string; // "07:30"
	currentTimePercentage: number; // 5
	// events: any[]; // Array mit Events, falls Struktur bekannt, hier definieren
	// eventsDate: string; // "Dienstag, 17. März 2026"
	homeworksFeedbackRequired: DashBoardTask[];
	homeworksWithFeedback: DashBoardTask[];
	hours: number[]; // [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
	privateHomeworks: DashBoardTask[];
	showNewReleaseModal: boolean;
}
