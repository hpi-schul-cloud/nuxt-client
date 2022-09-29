import ShareCourseModule from "@/store/share-course";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import ShareModal from "./ShareModal.vue";

describe("@components/share-modal/ShareModal", () => {
	let shareCourseModuleMock: ShareCourseModule;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(ShareModal, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("shareCourseModule", shareCourseModuleMock);
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	it("should start with step 1", () => {
		shareCourseModuleMock = createModuleMocks(ShareCourseModule, {
			getIsShareModalOpen: true,
		});
		const wrapper = mountComponent();

		const switches = wrapper.findAllComponents({ name: "v-switch" });

		expect(switches.length).toBe(2);
	});
});
