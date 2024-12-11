import {
	VideoConferenceInfo,
	VideoConferenceState,
} from "@/store/types/video-conference";
import { Factory } from "fishery";

export const videoConferenceInfoFactory = Factory.define<VideoConferenceInfo>(
	() => ({
		state: VideoConferenceState.NOT_STARTED,
		options: {
			everyAttendeeJoinsMuted: false,
			moderatorMustApproveJoinRequests: false,
			everybodyJoinsAsModerator: false,
		},
	})
);
