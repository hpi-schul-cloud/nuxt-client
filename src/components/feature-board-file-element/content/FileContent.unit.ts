import { PreviewStatus } from "@/fileStorageApi/v3";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileAlert from "./alert/FileAlert.vue";
import FileContent from "./FileContent.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import FileInputs from "./inputs/FileInputs.vue";

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

				const alternativeText = wrapper.findComponent(FileInputs);

				expect(alternativeText.exists()).toBe(true);
			});

			it("Should call onUpdateText when it receives update:text event from alternative text component", async () => {
				const { wrapper } = setup();

				const alternativeText = wrapper.findComponent(FileInputs);

				alternativeText.vm.$emit("update:text");
				await wrapper.vm.$nextTick();
				const emitted = wrapper.emitted()["update:alternativeText"] ?? [
					"new text",
				];

				expect(emitted).toHaveLength(1);
			});

			it("Should call onUpdateText when it receives update:text event from alternative text component", async () => {
				const { wrapper } = setup();

				const alternativeText = wrapper.findComponent(FileInputs);

				alternativeText.vm.$emit("update:caption");
				await wrapper.vm.$nextTick();
				const emitted = wrapper.emitted()["update:captionText"] ?? ["new text"];

				expect(emitted).toHaveLength(1);
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
	});
});
