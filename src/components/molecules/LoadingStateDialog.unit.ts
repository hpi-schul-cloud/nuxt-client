import LoadingStateModule from "@/store/loading-state";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import LoadingStateDialog from "./LoadingStateDialog.vue";

describe("@components/molecules/LoadingModal", () => {
	let loadingStateModuleMock: LoadingStateModule;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(LoadingStateDialog, {
			...createComponentMocks({ compositionApi: true }),
			setup() {
				provide("loadingStateModule", loadingStateModuleMock);
			},
			...attrs,
		});

		return wrapper;
	};

	const loadingStateModuleGetters: Partial<LoadingStateModule> = {
		getIsOpen: false,
		getLoadingState: {
			hasOverlay: false,
			isPersistent: false,
			text: "Loading...",
		},
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
	});

	it("should display its contents when requested by store", () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
			getIsOpen: true,
		});

		const wrapper = mountComponent();

		expect(wrapper.findComponent({ name: "v-card" }).exists()).toBe(true);
	});

	it("should hide its contents when not requested by store", () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
		});

		const wrapper = mountComponent();

		expect(wrapper.findComponent({ name: "v-card" }).exists()).toBe(false);
	});

	it("should display the text", () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
			getIsOpen: true,
		});

		const wrapper = mountComponent();

		expect(wrapper.element.textContent).toContain("Loading...");
	});

	it("should display the progress bar", () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
			getIsOpen: true,
		});

		const wrapper = mountComponent();

		expect(wrapper.findComponent({ name: "v-progress-linear" }).exists()).toBe(
			true
		);
	});

	it("should bind the dialog to our store", () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
			getIsOpen: true,
			close: jest.fn(),
		});

		const wrapper = mountComponent();
		wrapper.setData({ isDialogOpen: false });

		expect(loadingStateModuleMock.close).toHaveBeenCalled();
	});
});
