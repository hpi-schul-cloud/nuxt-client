import H5PEditorComponent from "@/components/h5p/H5PEditor.vue";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import H5pEditorFullscreenDialog from "./H5pEditorFullscreenDialog.vue";

describe("H5pEditorFullscreenDialog", () => {
	const getWrapper = () => {
		const notifierModule = createModuleMocks(NotifierModule);

		const saveFn = jest.fn();

		const wrapper = mount(H5pEditorFullscreenDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
				stubs: {
					H5PEditorComponent: {
						template: "<div></div>",
						methods: {
							save: saveFn,
						},
					},
				},
			},
			props: {
				isOpen: true,
				parentType: H5PContentParentType.BOARD_ELEMENT,
				parentId: "parentId",
				contentId: undefined,
			},
		});

		return {
			wrapper,
			notifierModule,
			saveFn,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when clicking on close", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			return {
				wrapper,
			};
		};

		it("should close the dialog", async () => {
			const { wrapper } = setup();

			const button = wrapper.getComponent('[data-testid="h5p-editor-close"]');
			await button.trigger("click");

			expect(wrapper.vm.isOpen).toEqual(false);
		});
	});

	describe("when clicking on save", () => {
		describe("when saving is successful", () => {
			const setup = () => {
				const contentId = "contentId";

				const { wrapper, notifierModule, saveFn } = getWrapper();

				saveFn.mockResolvedValueOnce({
					contentId,
				});

				return {
					wrapper,
					notifierModule,
					contentId,
				};
			};

			it("should emit a save event", async () => {
				const { wrapper, contentId } = setup();

				const button = wrapper.getComponent('[data-testid="h5p-editor-save"]');
				await button.trigger("click");

				expect(wrapper.emitted("save")).toEqual([[contentId]]);
			});

			it("should show a success notification", async () => {
				const { wrapper, notifierModule } = setup();

				const button = wrapper.getComponent('[data-testid="h5p-editor-save"]');
				await button.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "pages.h5p.api.success.save",
					status: "success",
					timeout: 5000,
				});
			});

			it("should close the dialog", async () => {
				const { wrapper } = setup();

				const button = wrapper.getComponent('[data-testid="h5p-editor-save"]');
				await button.trigger("click");

				expect(wrapper.vm.isOpen).toEqual(false);
			});
		});

		describe("when saving fails", () => {
			const setup = () => {
				const contentId = "contentId";

				const { wrapper, notifierModule, saveFn } = getWrapper();

				saveFn.mockRejectedValueOnce(new Error());

				return {
					wrapper,
					notifierModule,
					contentId,
				};
			};

			it("should show a error notification", async () => {
				const { wrapper, notifierModule } = setup();

				const button = wrapper.getComponent('[data-testid="h5p-editor-save"]');
				await button.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "common.validation.invalid",
					status: "error",
					timeout: 5000,
				});
			});
		});
	});

	describe("when the h5p editor has a loading error", () => {
		const setup = () => {
			const { wrapper, notifierModule } = getWrapper();

			return {
				wrapper,
				notifierModule,
			};
		};

		it("should show a error notification", async () => {
			const { wrapper, notifierModule } = setup();

			const h5pEditor = wrapper.getComponent(H5PEditorComponent);
			h5pEditor.vm.$emit("load-error", new Error());
			await nextTick();

			expect(notifierModule.show).toHaveBeenCalledWith({
				text: "error.load",
				status: "error",
				timeout: 5000,
			});
		});
	});
});
