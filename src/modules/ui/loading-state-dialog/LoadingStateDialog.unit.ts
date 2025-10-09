import LoadingStateDialog from "./LoadingStateDialog.vue";
import LoadingStateModule from "@/store/loading-state";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VCard } from "vuetify/lib/components/index";

describe("@/components/molecules/LoadingModal", () => {
	let loadingStateModuleMock: LoadingStateModule;

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(LoadingStateDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: { loadingStateModule: loadingStateModuleMock },
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
		const dialog = wrapper.findComponent(VCard);

		expect(dialog.exists()).toBe(true);
	});

	it("should hide its contents when not requested by store", () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
		});

		const wrapper = mountComponent();

		expect(wrapper.findComponent(VCard).exists()).toBe(false);
	});

	it("should display the text", async () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
			getIsOpen: true,
		});

		const wrapper = mountComponent();
		const dialog = wrapper.findComponent(VCard);
		const dialogTitle = dialog.find('[data-testid="dialog-text"]');

		expect(dialogTitle.text()).toBe("Loading...");
	});

	it("should display the progress bar", () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
			getIsOpen: true,
		});

		const wrapper = mountComponent();

		expect(wrapper.findComponent({ name: "v-progress-linear" }).exists()).toBe(true);
	});

	it("should bind the dialog to our store", () => {
		loadingStateModuleMock = createModuleMocks(LoadingStateModule, {
			...loadingStateModuleGetters,
			getIsOpen: true,
		});

		const wrapper = mountComponent();
		wrapper.vm.isDialogOpen = false;

		expect(loadingStateModuleMock.close).toHaveBeenCalled();
	});
});
