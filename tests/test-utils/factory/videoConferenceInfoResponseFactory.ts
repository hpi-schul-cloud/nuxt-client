import {
	VideoConferenceInfoResponse,
	VideoConferenceStateResponse,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const videoConferenceInfoResponseFactory =
	Factory.define<VideoConferenceInfoResponse>(() => ({
		state: VideoConferenceStateResponse.NotStarted,
		options: {
			everyAttendeeJoinsMuted: false,
			moderatorMustApproveJoinRequests: false,
			everybodyJoinsAsModerator: false,
		},
	}));
