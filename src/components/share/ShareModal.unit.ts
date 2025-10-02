import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@/components/share/ShareModalOptionsForm.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import ShareModule from "@/store/share";
import { SHARE_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { mount } from "@vue/test-utils";
import ShareModal from "./ShareModal.vue";
import { expectNotification } from "@@/tests/test-utils";
import { beforeEach } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

describe("@/components/share/ShareModal", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("when course is shared", () => {
		let shareModuleMock: ShareModule;

		const setup = () => {
			const wrapper = mount(ShareModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					provide: {
						[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
					},
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
		});

		it("should start with step 1", () => {
			const { wrapper } = setup();

			const switches = wrapper.findAllComponents({ name: "v-checkbox" });

			expect(switches.length).toBe(2);
		});

		it("should have the correct title", () => {
			const { wrapper } = setup();
			const title = wrapper.findComponent({ name: "v-card-title" });

			expect(title.text()).toContain(
				"components.molecules.share.options.title"
			);
		});

		it("should call 'createShareUrl' store method when next button clicked", () => {
			const { wrapper } = setup();
			const dialog = wrapper.findComponent(vCustomDialog);

			dialog.vm.$emit("next");

			expect(shareModuleMock.createShareUrl).toHaveBeenCalled();
		});

		it("should call 'resetShareFlow' store method when dialog closed", () => {
			const { wrapper } = setup();
			const dialog = wrapper.findComponent(vCustomDialog);

			dialog.vm.$emit("dialog-closed");

			expect(shareModuleMock.resetShareFlow).toHaveBeenCalled();
		});

		it("should call 'resetShareFlow' store method when sub component emits 'done'", () => {
			shareModuleMock = createModuleMocks(ShareModule, {
				getIsShareModalOpen: true,
				getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
				getShareUrl: "http://example.com",
			});
			const { wrapper } = setup();
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

		it("should call 'onCopy' method when sub component emits 'copied'", () => {
			shareModuleMock = createModuleMocks(ShareModule, {
				getIsShareModalOpen: true,
				getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
				getShareUrl: "http://example.com",
			});
			const { wrapper } = setup();
			const form = wrapper.findComponent(ShareModalResult);

			form.vm.$emit("copied");
			expectNotification("success");
		});

		it("should show copyright and privacy info alert", () => {
			const { wrapper } = setup();
			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe(
				"components.molecules.share.checkPrivacyAndCopyright"
			);
		});

		describe("ctl tool info", () => {
			it("should have the correct title", () => {
				const { wrapper } = setup();

				const dialog = wrapper.findComponent(vCustomDialog);
				const cardText = dialog.findComponent({ name: "v-card-text" });

				const infotext = cardText.find(
					`[data-testid="share-modal-external-tools-info"]`
				);

				expect(infotext.isVisible()).toBe(true);
				expect(infotext.text()).toEqual(
					"components.molecules.shareImport.options.ctlTools.infoText.unavailable"
				);
			});
		});
	});

	describe("when room is shared", () => {
		const setup = () => {
			const shareModuleMock = createModuleMocks(ShareModule, {
				getIsShareModalOpen: true,
				getParentType: ShareTokenBodyParamsParentTypeEnum.Room,
				createShareUrl: vi.fn(),
				resetShareFlow: vi.fn(),
			});

			const wrapper = mount(ShareModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					provide: {
						[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
					},
				},
				props: {
					type: ShareTokenBodyParamsParentTypeEnum.Room,
				},
			});

			return {
				wrapper,
			};
		};

		it("should show copyright and privacy info alert", () => {
			const { wrapper } = setup();
			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe(
				"components.molecules.share.checkPrivacyAndCopyright"
			);
		});

		it("should show warning alert", () => {
			const { wrapper } = setup();
			const warningAlert = wrapper.findComponent(WarningAlert);

			expect(warningAlert.exists()).toBe(true);
		});
	});

	describe("when column board is shared", () => {
		const setup = () => {
			const shareModuleMock = createModuleMocks(ShareModule, {
				getIsShareModalOpen: true,
				getParentType: ShareTokenBodyParamsParentTypeEnum.ColumnBoard,
				createShareUrl: vi.fn(),
				resetShareFlow: vi.fn(),
			});

			const wrapper = mount(ShareModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					provide: {
						[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
					},
				},
				props: {
					type: ShareTokenBodyParamsParentTypeEnum.ColumnBoard,
				},
			});

			return {
				wrapper,
			};
		};

		it("should show copyright and privacy info alert", () => {
			const { wrapper } = setup();
			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe(
				"components.molecules.share.checkPrivacyAndCopyright"
			);
		});

		it("should show warning alert", () => {
			const { wrapper } = setup();
			const warningAlert = wrapper.findComponent(WarningAlert);

			expect(warningAlert.exists()).toBe(true);
		});
	});

	describe("when lesson is shared", () => {
		const setup = () => {
			const shareModuleMock = createModuleMocks(ShareModule, {
				getIsShareModalOpen: true,
				getParentType: ShareTokenBodyParamsParentTypeEnum.Lessons,
				createShareUrl: vi.fn(),
				resetShareFlow: vi.fn(),
			});

			const wrapper = mount(ShareModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					provide: {
						[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
					},
				},
				props: {
					type: ShareTokenBodyParamsParentTypeEnum.Lessons,
				},
			});

			return {
				wrapper,
			};
		};

		it("should show copyright and privacy info alert", () => {
			const { wrapper } = setup();
			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.text()).toBe(
				"components.molecules.share.checkPrivacyAndCopyright"
			);
		});

		it("should show warning alert", () => {
			const { wrapper } = setup();
			const warningAlert = wrapper.findComponent(WarningAlert);

			expect(warningAlert.exists()).toBe(true);
		});
	});

	describe("when task is shared", () => {
		const setup = () => {
			const shareModuleMock = createModuleMocks(ShareModule, {
				getIsShareModalOpen: true,
				getParentType: ShareTokenBodyParamsParentTypeEnum.Tasks,
				createShareUrl: vi.fn(),
				resetShareFlow: vi.fn(),
			});

			const wrapper = mount(ShareModal, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					provide: {
						[SHARE_MODULE_KEY.valueOf()]: shareModuleMock,
					},
				},
				props: {
					type: ShareTokenBodyParamsParentTypeEnum.Tasks,
				},
			});

			return {
				wrapper,
			};
		};

		it("should not show copyright and privacy info alert", () => {
			const { wrapper } = setup();
			const infoAlert = wrapper.findComponent(InfoAlert);

			expect(infoAlert.exists()).toBe(false);
		});

		it("should not show warning alert", () => {
			const { wrapper } = setup();
			const warningAlert = wrapper.findComponent(WarningAlert);

			expect(warningAlert.exists()).toBe(false);
		});
	});
});
