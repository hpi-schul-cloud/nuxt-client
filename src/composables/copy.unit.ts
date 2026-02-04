import { useCopy } from "./copy";
import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import CopyModule, { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import { COPY_MODULE_KEY } from "@/utils/inject";
import { expectNotification, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useLoadingStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

vi.mock("./loadingState");

describe("copy composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({}));
	});

	const setup = () => {
		const payload: CopyParams = {
			id: "testId",
			type: CopyParamsTypeEnum.Lesson,
		};

		const copyModuleMock = createModuleMocks(CopyModule);

		const { copy } = mountComposable(() => useCopy(), {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				},
			},
		});

		const loadingStore = mockedPiniaStoreTyping(useLoadingStore);

		return {
			copy,
			payload,
			copyModuleMock,
			loadingStore,
		};
	};

	it("should call copyModule.copy()", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = vi.fn().mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload);

		expect(copyModuleMock.copy).toBeCalledWith(payload);
		expect(copyModuleMock.copy).toHaveBeenCalledWith(payload);
	});

	it("should open and close loading dialog", async () => {
		const { copy, copyModuleMock, payload, loadingStore } = setup();
		copyModuleMock.copy = vi.fn().mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload);

		expect(loadingStore.setLoadingState).toHaveBeenNthCalledWith(
			1,
			true,
			"components.molecules.copyResult.title.loading"
		);
		expect(loadingStore.setLoadingState).toHaveBeenNthCalledWith(2, false);
	});

	it.each([[CopyParamsTypeEnum.Lesson], [CopyParamsTypeEnum.Task]])(
		"should open success alert notification on a successful %s copy",
		async (copyParamsType: CopyParamsTypeEnum) => {
			const { copy, copyModuleMock } = setup();
			const payload: CopyParams = {
				id: "testId",
				type: copyParamsType,
			};
			copyModuleMock.copy = vi.fn().mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

			await copy(payload);

			expectNotification("success");
		}
	);

	it("should open copyResultModal on a successful course copy", async () => {
		const { copy, copyModuleMock } = setup();
		const payload: CopyParams = {
			id: "testId",
			type: CopyParamsTypeEnum.Course,
		};

		copyModuleMock.copy = vi.fn().mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload);

		expect(copyModuleMock.setResultModalOpen).toBeCalledWith(true);
	});

	it("should open failure alert notification on failed copy", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = vi.fn().mockResolvedValue({ status: CopyApiResponseStatusEnum.Failure });

		await copy(payload);

		expectNotification("error");
	});

	it("should open copyResultModal notification on partially failed copy", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = vi.fn().mockResolvedValue({ status: CopyApiResponseStatusEnum.Partial });

		await copy(payload);

		expect(copyModuleMock.setResultModalOpen).toBeCalledWith(true);
	});

	it("should open failure alert notification on server error", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = vi.fn().mockRejectedValue(false);

		await copy(payload);

		expectNotification("info");
	});
});
