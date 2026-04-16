import { ObjectIdMock } from "../ObjectIdMock";
import { RuntimeConfigListItemResponse, RuntimeConfigListItemResponseType } from "@api-server";
import { Factory } from "fishery";

export const runtimeConfigValueFactory = Factory.define<RuntimeConfigListItemResponse>(({ sequence }) => ({
	id: ObjectIdMock(),
	key: `RUNTIME_CONFIG_VALUE_#${sequence}`,
	description: `Description for RUNTIME_CONFIG_VALUE_#${sequence}`,
	value: `Value ${sequence}`,
	type: RuntimeConfigListItemResponseType.STRING,
}));
