import { Factory } from "fishery";
import {
	ContentElementType,
	VideoConferenceElementResponse,
} from "@api-server";
import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { videoConferenceElementContentFactory } from "./videoConferenceElementContentFactory";

export const videoConferenceElementResponseFactory =
	Factory.define<VideoConferenceElementResponse>(({ sequence }) => ({
		id: `videoConferenceElementResponse${sequence}`,
		type: ContentElementType.VIDEO_CONFERENCE,
		content: videoConferenceElementContentFactory.build(),
		timestamps: timestampsResponseFactory.build(),
	}));
