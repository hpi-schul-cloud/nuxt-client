import { Factory } from "fishery";
import { LtiDeepLinkResponse } from "@/generated/serverApi/v3";

export const ltiDeepLinkResponseFactory = Factory.define<LtiDeepLinkResponse>(
	() => ({
		mediaType: "mediaType",
	})
);
