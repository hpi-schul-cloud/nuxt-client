import ShareModule from "@/store/share";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import ShareModal from "./ShareModal.vue";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@/components/share/ShareModalOptionsForm.vue";
import ShareModalResult from "@/components/share/ShareModalResult.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import NotifierModule from "@/store/notifier";
import Vue from "vue";
import { envConfigModule } from "@/store";
import { Envs } from "@/store/types/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";

describe("@/components/share/ShareModal", () => {
	let shareModuleMock: ShareModule;
	let notifierModuleMock: NotifierModule;

	const getWrapper = (attrs = { propsData: { type: "courses" } }) => {
		return mount(ShareModal as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				shareModule: shareModuleMock,
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
			},
			...attrs,
		});
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");

		setupStores({ envConfigModule: EnvConfigModule });

		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
			createShareUrl: jest.fn(),
			resetShareFlow: jest.fn(),
		});

		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	it("should start with step 1", () => {
		const wrapper = getWrapper();

		const switches = wrapper.findAllComponents({ name: "v-switch" });

		expect(switches.length).toBe(2);
	});

	it("should have the correct title", () => {
		const wrapper = getWrapper();
		const title = wrapper.vm.$refs.textTitle as HTMLElement;

		expect(title.textContent).toContain(
			"components.molecules.share.options.title"
		);
	});

	it("should call 'createShareUrl' store method when next button clicked", () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent(vCustomDialog);

		dialog.vm.$emit("next");

		expect(shareModuleMock.createShareUrl).toHaveBeenCalled();
	});

	it("should call 'resetShareFlow' store method when dialog closed", () => {
		const wrapper = getWrapper();
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
		const wrapper = getWrapper();
		const form = wrapper.findComponent(ShareModalResult);

		form.vm.$emit("done");

		expect(shareModuleMock.resetShareFlow).toHaveBeenCalled();
	});

	it("should call 'onShareOptionsChange' method when sub component emits 'share-options-change'", () => {
		const wrapper = getWrapper();
		const form = wrapper.findComponent(ShareModalOptionsForm);
		const payload = { isSchoolInternal: true, hasExpiryDate: false };

		form.vm.$emit("share-options-change", payload);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		expect(wrapper.vm.shareOptions).toStrictEqual(payload);
	});

	it("should call 'onCopy' method when sub component emits 'copied'", async () => {
		shareModuleMock = createModuleMocks(ShareModule, {
			getIsShareModalOpen: true,
			getParentType: ShareTokenBodyParamsParentTypeEnum.Courses,
			getShareUrl: "http://example.com",
		});
		const wrapper = getWrapper();
		const form = wrapper.findComponent(ShareModalResult);

		form.vm.$emit("copied");
		expect(notifierModuleMock.show).toHaveBeenCalled();
	});

	describe("when ctl tools are enabled", () => {
		it("should have the correct title", () => {
			envConfigModule.setEnvs({ FEATURE_CTL_TOOLS_TAB_ENABLED: true } as Envs);
			const wrapper = getWrapper();
			const infotext = wrapper.find(
				`[data-testid="share-modal-external-tools-info"]`
			);

			expect(infotext.text()).toEqual(
				wrapper.vm.$i18n.t(
					"components.molecules.share.courses.options.ctlTools.infotext"
				)
			);
		});
	});
});
