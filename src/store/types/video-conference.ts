export type VideoConferenceInfo = {
	scopeId: string;

	state: VideoConferenceState;

	options: VideoConferenceOptions;
};

export enum VideoConferenceState {
	NOT_STARTED = "NOT_STARTED",
	RUNNING = "RUNNING",
	UNKNOWN = "unknown",
}

export interface VideoConferenceOptions {
	everyAttendeeJoinsMuted: boolean;

	everybodyJoinsAsModerator: boolean;

	moderatorMustApproveJoinRequests: boolean;
}
