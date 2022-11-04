import { CopyApiResponseStatusEnum } from "@/serverApi/v3";
import CopyModule, { CopyParams } from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import { watch } from "vue";
import { defineComponent, provide, ref } from "vue";
import { mount } from "@vue/test-utils";
import { useCopy } from "./copy";

jest.mock("./loadingState");

export interface MountOptions {
	provider?: () => void;
}

const mountComposable = <R>(composable: () => R, options: MountOptions): R => {
	const TestComponent = defineComponent({
		setup() {
			options.provider?.();
			const result = composable();
			return { result };
		},
	});

	const wrapper = mount(TestComponent);

	//@ts-ignore
	return wrapper.vm.result;
};

describe("copy composable", () => {
	const setup = () => {
		const payload: CopyParams = { id: "testId", type: "lesson" };

		const notifierModuleMock = createModuleMocks(NotifierModule);
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		const copyModuleMock = createModuleMocks(CopyModule);

		const i18n = { t: jest.fn().mockReturnValue("placeholder") };

		const isLoadingDialogOpen = ref(false);

		const { copy } = mountComposable(() => useCopy(isLoadingDialogOpen), {
			provider: () => {
				provide("copyModule", copyModuleMock);
				provide("notifierModule", notifierModuleMock);
				provide("loadingStateModule", loadingStateModuleMock);
				provide("i18n", i18n);
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

	it("should open success alert notification on successfull copy", async () => {
		const { copy, copyModuleMock, notifierModuleMock, payload } = setup();
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload);

		expect(notifierModuleMock.show).toHaveBeenCalledWith(
			expect.objectContaining({ status: "success" })
		);
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
			expect.objectContaining({ status: "error" })
		);
	});
});
