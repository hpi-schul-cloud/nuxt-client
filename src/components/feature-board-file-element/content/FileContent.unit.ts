import { PreviewStatus } from "@/fileStorageApi/v3";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileAlert from "./alert/FileAlert.vue";
import AlternativeText from "./alternative-text/AlternativeText.vue";
import FileContent from "./FileContent.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";

describe("FileContent", () => {
	describe("When EditMode is true", () => {
		describe("When PreviewUrl is defined", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();

				const fileProperties = {
					name: "test",
					size: 100,
					url: "test",
					previewUrl: "test",
					previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
					isDownloadAllowed: true,
					element,
				};
				const wrapper = shallowMount(FileContent, {
					propsData: {
						fileProperties,
						isEditMode: true,
					},
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileProperties,
				};
			};

			it("should pass props to FileContent", () => {
				const { wrapper, fileProperties } = setup();

				const fileContent = wrapper.findComponent(FileContent);

				expect(fileContent.props()).toEqual({
					fileProperties,
					isEditMode: true,
				});
			});

			it("should pass props to ContentElementFooter", () => {
				const { wrapper, fileProperties } = setup();

				const contentElementFooter =
					wrapper.findComponent(ContentElementFooter);

				expect(contentElementFooter.props()).toEqual({
					fileProperties,
				});
			});

			it("Should pass props to FileAlert", () => {
				const { wrapper, fileProperties } = setup();

				const fileAlert = wrapper.findComponent(FileAlert);

				expect(fileAlert.props()).toEqual({
					previewStatus: fileProperties.previewStatus,
				});
			});

			it("Should AlternativeText component be in dom", () => {
				const { wrapper } = setup();

				const alternativeText = wrapper.findComponent(AlternativeText);

				expect(alternativeText.exists()).toBe(true);
			});

			it("Should pass element to alterantive text", () => {
				const { wrapper, fileProperties } = setup();

				const alternativeText = wrapper.findComponent(AlternativeText);

				expect(alternativeText.props()).toEqual({
					element: fileProperties.element,
				});
			});

			describe("when alert emits on-status-reload", () => {
				it("should emit delete event", async () => {
					const { wrapper } = setup();

					const fileAlert = wrapper.findComponent(FileAlert);

					await fileAlert.vm.$emit("on-status-reload");

					expect(wrapper.emitted("fetch:file")).toBeTruthy();
				});
			});
		});

		describe("When PreviewUrl is undefined", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();

				const fileProperties = {
					previewUrl: undefined,
					element,
				};
				const wrapper = shallowMount(FileContent, {
					propsData: {
						fileProperties,
						isEditMode: true,
					},
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileProperties,
				};
			};

			it("Should AlternativeText component not be in dom", () => {
				const { wrapper } = setup();

				const alternativeText = wrapper.findComponent(AlternativeText);

				expect(alternativeText.exists()).toBe(false);
			});
		});
	});

	describe("When EditMode is false", () => {
		describe("When PreviewUrl is defined", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();

				const fileProperties = {
					previewUrl: "test",
					element,
				};
				const wrapper = shallowMount(FileContent, {
					propsData: {
						fileProperties,
						isEditMode: false,
					},
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileProperties,
				};
			};

			it("Should AlternativeText component not be in dom", () => {
				const { wrapper } = setup();

				const alternativeText = wrapper.findComponent(AlternativeText);

				expect(alternativeText.exists()).toBe(false);
			});
		});

		describe("When PreviewUrl is undefined", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const element = fileElementResponseFactory.build();

				const fileProperties = {
					previewUrl: undefined,
					element,
				};
				const wrapper = shallowMount(FileContent, {
					propsData: {
						fileProperties,
						isEditMode: false,
					},
					...createComponentMocks({}),
				});

				return {
					wrapper,
					fileProperties,
				};
			};

			it("Should AlternativeText component not be in dom", () => {
				const { wrapper } = setup();

				const alternativeText = wrapper.findComponent(AlternativeText);

				expect(alternativeText.exists()).toBe(false);
			});
		});
	});
});
