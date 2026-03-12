import {
	CustomParameterLocationParams,
	CustomParameterResponse,
	CustomParameterScopeTypeParams,
	CustomParameterTypeParams,
} from "@/serverApi/v3";
import { Factory } from "fishery";

export const customParameterResponseFactory =
	Factory.define<CustomParameterResponse>(({ sequence }) => ({
		scope: CustomParameterScopeTypeParams.CONTEXT,
		type: CustomParameterTypeParams.STRING,
		location: CustomParameterLocationParams.BODY,
		name: `CustomParameter${sequence}`,
		isOptional: false,
		isProtected: false,
		displayName: `Custom Parameter ${sequence}`,
	}));
