import { ConfigResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { createPinia, setActivePinia, getActivePinia } from "pinia";
import { defaultConfigEnvs, useEnvStore } from "@data-env";
import { FilesStorageConfigResponse } from "@/fileStorageApi/v3";

export const envsFactory = Factory.define<ConfigResponse>(
	() => defaultConfigEnvs
);

export const createTestEnvStore = (
	config?: Partial<ConfigResponse>,
	fileConfig?: Partial<FilesStorageConfigResponse>
) => {
	if (!getActivePinia()) {
		setActivePinia(createPinia());
	}
	useEnvStore().$patch({ env: envsFactory.build(config) });
	if (fileConfig) {
		useEnvStore().$patch({ envFile: fileConfig });
	}
};
