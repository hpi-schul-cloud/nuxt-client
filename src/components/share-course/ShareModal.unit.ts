import ShareCourseModule from "@/store/share-course";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import ShareModalOptionsForm from "@components/share-course/ShareModalOptionsForm.vue";
import ShareModalResult from "@components/share-course/ShareModalResult.vue";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import ShareModal from "./ShareModal.vue";

describe("@components/share-course/ShareModal", () => {
	let shareCourseModuleMock: ShareCourseModule;
	const showMock = jest.fn();

	const getWrapper = (attrs = {}) => {
		const wrapper = mount(ShareModal, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("shareCourseModule", shareCourseModuleMock);
				provide("i18n", { t: (key: string) => key });
				provide("notifierModule", {
					show: showMock,
				});
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");

		shareCourseModuleMock = createModuleMocks(ShareCourseModule, {
			getIsShareModalOpen: true,
			createShareUrl: jest.fn(),
			resetShareFlow: jest.fn(),
		});
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
			"components.molecules.shareCourse.options.title"
		);
	});

	it("should call 'createShareUrl' store method when next button clicked", () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent(vCustomDialog);

		dialog.vm.$emit("next");

		expect(shareCourseModuleMock.createShareUrl).toHaveBeenCalled();
	});

	it("should call 'resetShareFlow' store method when dialog closed", () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent(vCustomDialog);

		dialog.vm.$emit("dialog-closed");

		expect(shareCourseModuleMock.resetShareFlow).toHaveBeenCalled();
	});

	it("should call 'resetShareFlow' store method when sub component emits 'done'", () => {
		shareCourseModuleMock = createModuleMocks(ShareCourseModule, {
			getIsShareModalOpen: true,
			getShareUrl: "http://example.com",
		});
		const wrapper = getWrapper();
		const form = wrapper.findComponent(ShareModalResult);

		form.vm.$emit("done");

		expect(shareCourseModuleMock.resetShareFlow).toHaveBeenCalled();
	});

	it("should call 'onShareOptionsChange' method when sub component emits 'share-options-change'", () => {
		const wrapper = getWrapper();
		const form = wrapper.findComponent(ShareModalOptionsForm);
		const payload = { schoolInternally: true, expiresInSevenDays: false };

		form.vm.$emit("share-options-change", payload);

		// @ts-ignore
		expect(wrapper.vm.shareOptions).toStrictEqual(payload);
	});

	it("should call 'onCopy' method when sub component emits 'copied'", async () => {
		shareCourseModuleMock = createModuleMocks(ShareCourseModule, {
			getIsShareModalOpen: true,
			getShareUrl: "http://example.com",
		});
		const wrapper = getWrapper();
		const form = wrapper.findComponent(ShareModalResult);

		form.vm.$emit("copied");
		expect(showMock).toHaveBeenCalled();
	});
});
