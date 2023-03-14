import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import CopyModule, { CopyParams, CopyParamsTypeEnum } from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { defineComponent, watch } from "vue";
import { provide, ref } from "vue";
import { shallowMount } from "@vue/test-utils";
import { useCopy } from "./copy";

jest.mock("./loadingState");

export interface MountOptions {
	provider?: () => void;
}

const mountComposable = <R>(
	composable: () => R,
	providers: Record<string, unknown>
): R => {
	const ParentComponent = defineComponent({
		setup() {
			for (const [key, mockFn] of Object.entries(providers)) {
				provide(key, mockFn);
			}
		},
	});

	const TestComponent = {
		template: "<div></div>",
	};

	const wrapper = shallowMount(TestComponent, {
		setup() {
			const result = composable();
			return { result };
		},
		parentComponent: ParentComponent,
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return wrapper.vm.result;
};

describe("copy composable", () => {
	const setup = () => {
		const payload: CopyParams = {
			id: "testId",
			type: CopyParamsTypeEnum.Lesson,
		};

		const notifierModuleMock = createModuleMocks(NotifierModule);
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		const copyModuleMock = createModuleMocks(CopyModule);

		const i18n = { t: jest.fn().mockReturnValue("placeholder") };

		const isLoadingDialogOpen = ref(false);

		const { copy } = mountComposable(() => useCopy(isLoadingDialogOpen), {
			copyModule: copyModuleMock,
			notifierModule: notifierModuleMock,
			loadingStateModule: loadingStateModuleMock,
			i18n: i18n,
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
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload);

		expect(copyModuleMock.copy).toBeCalledWith(payload);
		expect(copyModuleMock.copy).toHaveBeenCalledWith(payload);
	});

	it("should open and close loading dialog", async () => {
		const { copy, copyModuleMock, payload, isLoadingDialogOpen } = setup();
		copyModuleMock.copy = jest
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
			copyModuleMock.copy = jest
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

		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload);

		expect(copyModuleMock.setResultModalOpen).toBeCalledWith(true);
	});

	it("should open failure alert notification on failed copy", async () => {
		const { copy, copyModuleMock, notifierModuleMock, payload } = setup();
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Failure });

		await copy(payload);

		expect(notifierModuleMock.show).toHaveBeenCalledWith(
			expect.objectContaining({ status: "error" })
		);
	});

	it("should open copyResultModal notification on partially failed copy", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Partial });

		await copy(payload);

		expect(copyModuleMock.setResultModalOpen).toBeCalledWith(true);
	});

	it("should open failure alert notification on server error", async () => {
		const { copy, copyModuleMock, notifierModuleMock, payload } = setup();
		copyModuleMock.copy = jest.fn().mockRejectedValue(false);

		await copy(payload);

		expect(notifierModuleMock.show).toHaveBeenCalledWith(
			expect.objectContaining({ status: "info" })
		);
	});
});
