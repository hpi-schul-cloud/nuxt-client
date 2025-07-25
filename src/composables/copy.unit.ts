import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import CopyModule, { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { COPY_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { ref, watch } from "vue";
import { useCopy } from "./copy";
import { createTestingI18n } from "@@/tests/test-utils/setup";

vi.mock("./loadingState");

describe("copy composable", () => {
	const setup = () => {
		const payload: CopyParams = {
			id: "testId",
			type: CopyParamsTypeEnum.Lesson,
		};

		const notifierModuleMock = createModuleMocks(NotifierModule);
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		const copyModuleMock = createModuleMocks(CopyModule);

		const isLoadingDialogOpen = ref(false);

		const { copy } = mountComposable(() => useCopy(isLoadingDialogOpen), {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
					loadingStateModule: loadingStateModuleMock,
				},
			},
		});

		return {
			copy,
			payload,
			notifierModuleMock,
			loadingStateModuleMock,
			copyModuleMock,
			isLoadingDialogOpen,
		};
	};

	it("should call copyModule.copy()", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = vi
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload);

		expect(copyModuleMock.copy).toBeCalledWith(payload);
		expect(copyModuleMock.copy).toHaveBeenCalledWith(payload);
	});

	it("should open and close loading dialog", async () => {
		const { copy, copyModuleMock, payload, isLoadingDialogOpen } = setup();
		copyModuleMock.copy = vi
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		const isLoadingDialogOpenStates: boolean[] = [];
		watch(isLoadingDialogOpen, (newValue) => {
			isLoadingDialogOpenStates.push(newValue);
		});

		await copy(payload);

		expect(isLoadingDialogOpenStates).toEqual([true, false]);
	});

	it.each([[CopyParamsTypeEnum.Lesson], [CopyParamsTypeEnum.Task]])(
		"should open success alert notification on a successful %s copy",
		async (copyParamsType: CopyParamsTypeEnum) => {
			const { copy, copyModuleMock, notifierModuleMock } = setup();
			const payload: CopyParams = {
				id: "testId",
				type: copyParamsType,
			};
			copyModuleMock.copy = vi
				.fn()
				.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

			await copy(payload);

			expect(notifierModuleMock.show).toHaveBeenCalledWith(
				expect.objectContaining({ status: "success" })
			);
		}
	);

	it("should open copyResultModal on a successful course copy", async () => {
		const { copy, copyModuleMock } = setup();
		const payload: CopyParams = {
			id: "testId",
			type: CopyParamsTypeEnum.Course,
		};

		copyModuleMock.copy = vi
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload);

		expect(copyModuleMock.setResultModalOpen).toBeCalledWith(true);
	});

	it("should open failure alert notification on failed copy", async () => {
		const { copy, copyModuleMock, notifierModuleMock, payload } = setup();
		copyModuleMock.copy = vi
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Failure });

		await copy(payload);

		expect(notifierModuleMock.show).toHaveBeenCalledWith(
			expect.objectContaining({ status: "error" })
		);
	});

	it("should open copyResultModal notification on partially failed copy", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = vi
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Partial });

		await copy(payload);

		expect(copyModuleMock.setResultModalOpen).toBeCalledWith(true);
	});

	it("should open failure alert notification on server error", async () => {
		const { copy, copyModuleMock, notifierModuleMock, payload } = setup();
		copyModuleMock.copy = vi.fn().mockRejectedValue(false);

		await copy(payload);

		expect(notifierModuleMock.show).toHaveBeenCalledWith(
			expect.objectContaining({ status: "info" })
		);
	});
});
