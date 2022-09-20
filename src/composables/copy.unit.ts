import {
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
} from "@/serverApi/v3";
import CopyModule, { CopyParams } from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { provideComposable } from "@/utils/composable-dependency-injection";
import { createModuleMocks } from "@/utils/mock-store-module";
import { defineComponent, provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import { useCopy } from "./copy";
import { USE_I18N } from "./i18n";
import { USE_LOADING_STATE } from "./loadingState";
import { USE_NOTIFIER } from "./notifier";

export interface MountOptions {
	provider?: () => void;
}

const mountComposable = <R>(composable: () => R, options: MountOptions): R => {
	const TestComponent = defineComponent({
		template: `<div></div>`,
	});

	const wrapper = mount(TestComponent, {
		setup() {
			options.provider?.();
			const result = composable();
			return { result };
		},
	});

	//@ts-ignore
	return wrapper.vm.result;
};

const mockCopyResult = (
	status: CopyApiResponseStatusEnum,
	type: CopyApiResponseTypeEnum = CopyApiResponseTypeEnum.Task
) => jest.fn().mockReturnValue(Promise.resolve({ status, type }));

describe("copy composable", () => {
	const setup = () => {
		const payload: CopyParams = { id: "testId", type: "lesson" };

		const notifierModuleMock = createModuleMocks(NotifierModule);
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		const copyModuleMock = createModuleMocks(CopyModule);

		const t = jest.fn().mockReturnValue("placeholder");
		const i18nMock = { t };

		const showNotifier = jest.fn();
		const openLoadingDialog = jest.fn();
		const closeLoadingDialog = jest.fn();

		const { copy } = mountComposable(useCopy, {
			provider: () => {
				provide("copyModule", copyModuleMock);
				provide("notifierModule", notifierModuleMock);
				provide("loadingStateModule", loadingStateModuleMock);
				provide("i18n", i18nMock);
				provideComposable(USE_NOTIFIER, () => ({
					showNotifier,
				}));
				provideComposable(USE_LOADING_STATE, () => ({
					openLoadingDialog,
					closeLoadingDialog,
				}));
				provideComposable(USE_I18N, () => ({
					t,
				}));
			},
		});

		return {
			copy,
			payload,
			notifierModuleMock,
			loadingStateModuleMock,
			copyModuleMock,
			showNotifier,
			openLoadingDialog,
			closeLoadingDialog,
		};
	};

	it("should call copyModule.copy()", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload, "someText");

		expect(copyModuleMock.copy).toBeCalledWith(payload);
		expect(copyModuleMock.copy).toHaveBeenCalledWith(payload);
	});

	it("should open and close loading dialog", async () => {
		const {
			copy,
			copyModuleMock,
			openLoadingDialog,
			closeLoadingDialog,
			payload,
		} = setup();
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload, "someText");

		expect(openLoadingDialog).toBeCalled();
		expect(closeLoadingDialog).toBeCalled();
	});

	it("should open success alert notification on successfull copy", async () => {
		const { copy, copyModuleMock, showNotifier, payload } = setup();
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Success });

		await copy(payload, "someText");

		expect(showNotifier).toHaveBeenCalledWith(
			expect.objectContaining({ status: "success" })
		);
	});

	it("should open failure alert notification on failed copy", async () => {
		const { copy, copyModuleMock, showNotifier, payload } = setup();
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Failure });

		await copy(payload, "someText");

		expect(showNotifier).toHaveBeenCalledWith(
			expect.objectContaining({ status: "error" })
		);
	});

	it("should open copyResultModal notification on partially failed copy", async () => {
		const { copy, copyModuleMock, payload } = setup();
		copyModuleMock.copy = jest
			.fn()
			.mockResolvedValue({ status: CopyApiResponseStatusEnum.Partial });

		await copy(payload, "someText");

		expect(copyModuleMock.setResultModalOpen).toBeCalledWith(true);
	});

	it("should open failure alert notification on server error", async () => {
		const { copy, copyModuleMock, showNotifier, payload } = setup();
		copyModuleMock.copy = jest.fn().mockRejectedValue(false);

		await copy(payload, "someText");

		expect(showNotifier).toHaveBeenCalledWith(
			expect.objectContaining({ status: "error" })
		);
	});
});
