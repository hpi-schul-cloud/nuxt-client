import H5PEditorComponent from "@/components/h5p/H5PEditor.vue";
import { H5PContentParentType, H5PSaveResponse } from "@/h5pEditorApi/v3";
import ApplicationErrorModule from "@/store/application-error";
import NotifierModule from "@/store/notifier";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { APPLICATION_ERROR_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import {
	apiValidationResponseErrorFactory,
	axiosErrorFactory,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import H5pEditorPage from "./H5PEditor.page.vue";
import { useH5pEditorBoardHooks } from "./h5pEditorBoardHooks.composable";

vi.mock("./h5pEditorBoardHooks.composable");

describe("H5PEditorPage", () => {
	let useH5pEditorBoardHooksMock: DeepMocked<
		ReturnType<typeof useH5pEditorBoardHooks>
	>;

	beforeEach(() => {
		useH5pEditorBoardHooksMock = createMock();

		vi.mocked(useH5pEditorBoardHooks).mockReturnValue(
			useH5pEditorBoardHooksMock
		);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	const getWrapper = (
		props: ComponentProps<typeof H5pEditorPage> = {
			parentType: H5PContentParentType.LESSONS,
			parentId: "parentId",
			contentId: undefined,
		}
	) => {
		const notifierModule = createModuleMocks(NotifierModule);
		const applicationErrorModule = createModuleMocks(ApplicationErrorModule);

		const saveFn = vi.fn();

		const wrapper = mount(H5pEditorPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[APPLICATION_ERROR_KEY.valueOf()]: applicationErrorModule,
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
			props,
		});

		return {
			wrapper,
			notifierModule,
			applicationErrorModule,
			saveFn,
		};
	};

	describe("Setup", () => {
		describe("when the parent type is lessons", () => {
			it("should have no hooks", async () => {
				const { wrapper } = getWrapper({
					parentType: H5PContentParentType.LESSONS,
					parentId: "parentId",
				});

				expect(wrapper.vm.hooks).toBeUndefined();
			});
		});

		describe("when the parent type is board-element", () => {
			describe("when onCreate hook succeeds", () => {
				it("should have board hooks", async () => {
					getWrapper({
						parentType: H5PContentParentType.BOARD_ELEMENT,
						parentId: "parentId",
					});

					await flushPromises();

					expect(useH5pEditorBoardHooksMock.onCreate).toHaveBeenCalled();
				});
			});

			describe("when onCreate hook fails", () => {
				const setup = () => {
					const error = createApplicationError(HttpStatusCode.NotFound);
					const axiosError = axiosErrorFactory
						.withStatusCode(error.statusCode)
						.build();

					useH5pEditorBoardHooksMock.onCreate.mockRejectedValueOnce(axiosError);

					const { applicationErrorModule } = getWrapper({
						parentType: H5PContentParentType.BOARD_ELEMENT,
						parentId: "parentId",
					});

					return {
						applicationErrorModule,
						error,
					};
				};

				it("should set an application error", async () => {
					const { applicationErrorModule, error } = setup();

					await flushPromises();

					expect(applicationErrorModule.setError).toHaveBeenCalledWith(error);
				});
			});
		});
	});

	describe("H5P Editor", () => {
		describe("when the editor has a loading error", () => {
			const setup = () => {
				const error = createApplicationError(HttpStatusCode.BadRequest);
				const axiosError = axiosErrorFactory
					.withStatusCode(error.statusCode)
					.build();

				useH5pEditorBoardHooksMock.onCreate.mockRejectedValueOnce(axiosError);

				const { wrapper, applicationErrorModule } = getWrapper({
					parentType: H5PContentParentType.BOARD_ELEMENT,
					parentId: "parentId",
				});

				return {
					wrapper,
					applicationErrorModule,
					error,
				};
			};

			it("should set an application error", async () => {
				const { wrapper, applicationErrorModule, error } = setup();

				const h5pEditor = wrapper.getComponent(H5PEditorComponent);
				h5pEditor.vm.$emit("load-error", error);
				await nextTick();

				expect(applicationErrorModule.setError).toHaveBeenCalledWith(error);
			});
		});

		describe("when clicking on save", () => {
			const setup = () => {
				const response: H5PSaveResponse = {
					contentId: "contentId",
					metadata: {
						title: "Biologie test",
						mainLibrary: "true,false-test",
					},
				};

				const { wrapper, notifierModule, saveFn } = getWrapper({
					parentType: H5PContentParentType.BOARD_ELEMENT,
					parentId: "parentId",
				});

				vi.spyOn(window, "dispatchEvent").mockImplementation(vi.fn());
				saveFn.mockResolvedValue(response);

				return {
					wrapper,
					notifierModule,
					saveFn,
					response,
				};
			};

			it("should call the editors save function", async () => {
				const { wrapper, saveFn } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(saveFn).toHaveBeenCalled();
			});

			it("should call the afterSave hook", async () => {
				const { wrapper, response } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(useH5pEditorBoardHooksMock.afterSave).toHaveBeenCalledWith(
					response.contentId
				);
			});

			it("should dispatch a custom save event", async () => {
				const { wrapper, response } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(window.dispatchEvent).toHaveBeenCalledWith(
					new CustomEvent("save-content", {
						detail: {
							contentId: response.contentId,
							title: response.metadata.title,
							contentType: response.metadata.mainLibrary,
						},
					})
				);
			});

			it("should show a success notification", async () => {
				const { wrapper, notifierModule } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "pages.h5p.api.success.save",
					status: "success",
					timeout: 5000,
				});
			});
		});

		describe("when editor save function fails", () => {
			const setup = () => {
				const { wrapper, notifierModule, saveFn } = getWrapper({
					parentType: H5PContentParentType.BOARD_ELEMENT,
					parentId: "parentId",
				});

				vi.spyOn(window, "dispatchEvent").mockImplementation(vi.fn());
				saveFn.mockRejectedValue(apiValidationResponseErrorFactory.build());

				return {
					wrapper,
					notifierModule,
					saveFn,
				};
			};

			it("should not call the afterSave hook", async () => {
				const { wrapper } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(useH5pEditorBoardHooksMock.afterSave).not.toHaveBeenCalled();
			});

			it("should not dispatch a custom save event", async () => {
				const { wrapper } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(window.dispatchEvent).not.toHaveBeenCalled();
			});

			it("should show an error notification", async () => {
				const { wrapper, notifierModule } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "common.validation.invalid",
					status: "error",
					timeout: 5000,
				});
			});
		});

		describe("when the afterSave hook fails", () => {
			const setup = () => {
				const response: H5PSaveResponse = {
					contentId: "contentId",
					metadata: {
						title: "Biologie test",
						mainLibrary: "true,false-test",
					},
				};

				const { wrapper, notifierModule, saveFn } = getWrapper({
					parentType: H5PContentParentType.BOARD_ELEMENT,
					parentId: "parentId",
				});

				vi.spyOn(window, "dispatchEvent").mockImplementation(vi.fn());
				saveFn.mockResolvedValue(response);
				useH5pEditorBoardHooksMock.afterSave.mockRejectedValue(new Error());

				return {
					wrapper,
					notifierModule,
					saveFn,
				};
			};

			it("should not dispatch a custom save event", async () => {
				const { wrapper } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(window.dispatchEvent).not.toHaveBeenCalled();
			});

			it("should show an error notification", async () => {
				const { wrapper, notifierModule } = setup();

				const saveButton = wrapper.get('[data-testid="editor-save-button"]');
				await saveButton.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "common.validation.invalid",
					status: "error",
					timeout: 5000,
				});
			});
		});
	});
});
