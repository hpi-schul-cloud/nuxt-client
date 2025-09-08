import { ConfigResponse } from "@/serverApi/v3";
import { defaultConfigEnvs } from "@/store/env-config-defaults";
import { Factory } from "fishery";
import { createPinia, setActivePinia, getActivePinia } from "pinia";
import { useEnvStore } from "@data-env";

export const envsFactory = Factory.define<ConfigResponse>(
	() => defaultConfigEnvs
);

export const createTestEnvStore = (config?: Partial<ConfigResponse>) => {
	if (!getActivePinia()) {
		setActivePinia(createPinia());
	}
	useEnvStore().setEnvs(envsFactory.build(config));
};
