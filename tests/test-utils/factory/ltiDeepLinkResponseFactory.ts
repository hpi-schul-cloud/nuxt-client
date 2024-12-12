import { Factory } from "fishery";
import { LtiDeepLinkResponse } from "@/serverApi/v3";

export const ltiDeepLinkResponseFactory = Factory.define<LtiDeepLinkResponse>(
	() => ({
		mediaType: "mediaType",
	})
);
