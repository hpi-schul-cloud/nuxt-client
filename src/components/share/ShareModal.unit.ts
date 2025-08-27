import ShareModalOptionsForm from "@/components/share/ShareModalOptionsForm.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import ShareModule from "@/store/share";
import { NOTIFIER_MODULE_KEY, SHARE_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import ShareModal from "./ShareModal.vue";
import { VDialog } from "vuetify/components/VDialog";
import { nextTick } from "vue";

describe("@/components/share/ShareModal", () => {
	let shareModuleMock: ShareModule;
	let notifierModuleMock: NotifierModule;

	const setup = () => {
		const wrapper = mount(ShareModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				},
				stubs: { UseFocusTrap: true },
			},
			props: {
				type: ShareTokenBodyParamsParentTypeEnum.Courses,
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
			createShareUrl: vi.fn(),
			resetShareFlow: vi.fn(),
		});

		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	it("should start with step 1", () => {
		const { wrapper } = setup();

		const switches = wrapper.findAllComponents({ name: "v-checkbox" });

		expect(switches.length).toBe(2);
	});

	it("should have the correct title", () => {
		const { wrapper } = setup();
		const title = wrapper.findComponent({ name: "v-card-title" });

		expect(title.text()).toContain("components.molecules.share.options.title");
	});

	it("should call 'createShareUrl' store method when next button clicked", () => {
		const { wrapper } = setup();
		const dialog = wrapper.findComponent(VDialog);

		const buttons = dialog.findAllComponents({
			name: "v-btn",
			props: { variant: "flat" },
		});
		expect(buttons.length).toBe(2);
		expect(buttons[0].text()).toBe("common.actions.cancel");
		expect(buttons[1].text()).toBe("common.actions.continue");

		buttons[1].vm.$emit("click");

		expect(shareModuleMock.createShareUrl).toHaveBeenCalled();
	});

	it("should call 'resetShareFlow' store method when dialog closed", () => {
		const { wrapper } = setup();
		const dialog = wrapper.findComponent(VDialog);

		dialog.vm.$emit("after-leave");

		expect(shareModuleMock.resetShareFlow).toHaveBeenCalled();
	});

	it("should return the component state to firstStep when dialog closes", () => {
		const { wrapper } = setup();
		const dialog = wrapper.findComponent(VDialog);

		expect((wrapper.vm as unknown as typeof ShareModal).step).toBe("firstStep");

		(wrapper.vm as unknown as typeof ShareModal).onNext();
		expect((wrapper.vm as unknown as typeof ShareModal).step).toBe(
			"secondStep"
		);

		dialog.vm.$emit("after-leave");
		wrapper.vm.$nextTick();
		expect((wrapper.vm as unknown as typeof ShareModal).step).toBe("firstStep");
	});

	it("should call 'resetShareFlow' store method when sub component emits 'done'", async () => {
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
			getShareUrl: "http://example.com",
		});
		const { wrapper } = setup();

		(wrapper.vm as unknown as typeof ShareModal).step = "secondStep";
		await nextTick();

		const form = wrapper.findComponent(ShareModalResult);
		form.vm.$emit("done");

		expect(shareModuleMock.resetShareFlow).toHaveBeenCalled();
	});

	it("should call 'onShareOptionsChange' method when sub component emits 'share-options-change'", () => {
		const { wrapper } = setup();
		const form = wrapper.findComponent(ShareModalOptionsForm);
		const payload = { isSchoolInternal: true, hasExpiryDate: false };

		form.vm.$emit("share-options-change", payload);

		expect(
			(wrapper.vm as unknown as typeof ShareModal).shareOptions
		).toStrictEqual(payload);
	});

	it("should call 'onCopy' method when 'onNext' is called'", async () => {
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
			getShareUrl: "http://example.com",
		});
		const { wrapper } = setup();

		(wrapper.vm as unknown as typeof ShareModal).onNext();
		await wrapper.vm.$nextTick();

		const form = wrapper.findComponent(ShareModalResult);

		form.vm.$emit("copied");
		expect(notifierModuleMock.show).toHaveBeenCalled();
	});

	describe("ctl tool info", () => {
		it("should have the correct title", async () => {
			const { wrapper } = setup();

			const cardText = wrapper.findComponent({ name: "v-card-text" });
			const infotext = cardText.find(
				`[data-testid="share-modal-external-tools-info"]`
			);

			expect(infotext.text()).toContain(
				"components.molecules.shareImport.options.ctlTools.infoText.unavailable"
			);
		});
	});
});
