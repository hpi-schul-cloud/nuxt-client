import {
	VideoConferenceInfoResponse,
	VideoConferenceStateResponse,
} from "@/generated/serverApi/v3";
import { Factory } from "fishery";

export const videoConferenceInfoResponseFactory =
	Factory.define<VideoConferenceInfoResponse>(() => ({
		state: VideoConferenceStateResponse.NOT_STARTED,
		options: {
			everyAttendeeJoinsMuted: false,
			moderatorMustApproveJoinRequests: false,
			everybodyJoinsAsModerator: false,
		},
	}));
