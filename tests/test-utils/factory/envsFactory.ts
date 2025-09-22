import { ConfigResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { setActivePinia, getActivePinia } from "pinia";
import { defaultConfigEnvs, useEnvStore } from "@data-env";
import { FilesStorageConfigResponse } from "@/fileStorageApi/v3";
import { createTestingPinia } from "@pinia/testing";

export const envsFactory = Factory.define<ConfigResponse>(
	() => defaultConfigEnvs
);

export const createTestEnvStore = (
	config?: Partial<ConfigResponse>,
	fileConfig?: Partial<FilesStorageConfigResponse>
) => {
	if (!getActivePinia()) {
		setActivePinia(createTestingPinia());
	}
	useEnvStore().$patch({ env: envsFactory.build(config) });
	if (fileConfig) {
		useEnvStore().$patch({ envFile: fileConfig });
	}
};
