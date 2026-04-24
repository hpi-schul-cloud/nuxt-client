import { oauthConfigResponseFactory } from "./oauthConfigResponseFactory";
import { PublicSystemResponse } from "@api-server";
import { Factory } from "fishery";

export const publicSystemResponseFactory = Factory.define<PublicSystemResponse>(({ sequence }) => ({
	id: `id-${sequence}`,
	displayName: `soundsystem-${sequence}`,
	oauthConfig: oauthConfigResponseFactory.build(),
}));
