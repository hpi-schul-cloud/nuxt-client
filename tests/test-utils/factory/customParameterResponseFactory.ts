import {
	CustomParameterResponse,
	CustomParameterResponseLocationEnum,
	CustomParameterResponseScopeEnum,
	CustomParameterResponseTypeEnum,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const customParameterResponseFactory =
	Factory.define<CustomParameterResponse>(({ sequence }) => ({
		scope: CustomParameterResponseScopeEnum.Context,
		type: CustomParameterResponseTypeEnum.String,
		location: CustomParameterResponseLocationEnum.Body,
		name: `CustomParameter${sequence}`,
		isOptional: false,
		displayName: `Custom Parameter ${sequence}`,
	}));
