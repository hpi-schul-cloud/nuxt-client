import { mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { FilesStorageConfigResponse } from "@api-file-storage";
import { ClientConfig, defaultConfigEnvs, useEnvStore } from "@data-env";
import { Factory } from "fishery";
import { Pinia } from "pinia";

export const envsFactory = Factory.define<ClientConfig>(() => defaultConfigEnvs);

export const createTestEnvStore = (
	config?: Partial<ClientConfig>,
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
