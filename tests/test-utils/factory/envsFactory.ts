import { ConfigResponse } from "@/serverApi/v3";
import { Factory } from "fishery";
import { setActivePinia, getActivePinia } from "pinia";
import { defaultConfigEnvs, useEnvStore } from "@data-env";
import { FilesStorageConfigResponse } from "@/fileStorageApi/v3";
import { createTestingPinia } from "@pinia/testing";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";

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

	const env = envsFactory.build(config);
	const envFile = fileConfig;

	useEnvStore().$patch({ env });
	if (fileConfig) {
		useEnvStore().$patch({ envFile });
	}
	const envStore = mockedPiniaStoreTyping(useEnvStore);
	return { envStore, env, envFile };
};
