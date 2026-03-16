import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { videoConferenceElementContentFactory } from "./videoConferenceElementContentFactory";
import { ContentElementType, VideoConferenceElementResponse } from "@api-server";
import { Factory } from "fishery";

export const videoConferenceElementResponseFactory = Factory.define<VideoConferenceElementResponse>(({ sequence }) => ({
	id: `videoConferenceElementResponse${sequence}`,
	type: ContentElementType.VIDEO_CONFERENCE,
	content: videoConferenceElementContentFactory.build(),
	timestamps: timestampsResponseFactory.build(),
}));
