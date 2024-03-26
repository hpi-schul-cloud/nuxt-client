import { ConfigResponse } from "@/serverApi/v3";
import { defaultConfigEnvs } from "@/store/env-config-defaults";
import { Factory } from "fishery";

export const envsFactory = Factory.define<ConfigResponse>(
	() => defaultConfigEnvs
);
