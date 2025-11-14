import { FilesStorageConfigResponse } from "@/fileStorageApi/v3";
import { ConfigResponse } from "@/serverApi/v3";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { defaultConfigEnvs, useEnvStore } from "@data-env";
import { Factory } from "fishery";
import { Pinia } from "pinia";

export const envsFactory = Factory.define<ConfigResponse>(() => defaultConfigEnvs);

export const createTestEnvStore = (
	config?: Partial<ConfigResponse>,
	fileConfig?: Partial<FilesStorageConfigResponse>,
	pinia?: Pinia
) => {
	const env = envsFactory.build(config);
	const envFile = fileConfig;
	const store = useEnvStore(pinia);

	store.$patch({ env });
	if (fileConfig) {
		store.$patch({ envFile });
	}
	const envStore = mockedPiniaStoreTyping(useEnvStore);
	return { envStore, env, envFile };
};
