import { PreviewStatus } from "@/fileStorageApi/v3";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import BaseaAlert from "./alert/alerts/BaseaAlert.vue";
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

			it("should pass props to FileAlert", () => {
				const { wrapper, fileProperties } = setup();

				const fileAlert = wrapper.findComponent(BaseaAlert);

				expect(fileAlert.props()).toEqual({
					previewStatus: fileProperties.previewStatus,
				});
			});

			it("should FileInputs component be in dom", () => {
				const { wrapper } = setup();

				const fileInputs = wrapper.findComponent(FileInputs);

				expect(fileInputs.exists()).toBe(true);
			});

			it("should emit update:alternativeText event, when it receives update:text event from file inputs component", async () => {
				const { wrapper } = setup();

				const fileInputs = wrapper.findComponent(FileInputs);

				fileInputs.vm.$emit("update:alternativeText");

				expect(wrapper.emitted("update:alternativeText")).toHaveLength(1);
			});

			it("should emit update:caption event, when it receives update:caption event from file inputs component", async () => {
				const { wrapper } = setup();

				const fileInputs = wrapper.findComponent(FileInputs);

				fileInputs.vm.$emit("update:caption");

				expect(wrapper.emitted("update:caption")).toHaveLength(1);
			});

			describe("when alert emits on-status-reload", () => {
				it("should emit fetch:file event", async () => {
					const { wrapper } = setup();

					const fileAlert = wrapper.findComponent(BaseaAlert);

					await fileAlert.vm.$emit("on-status-reload");

					expect(wrapper.emitted("fetch:file")).toBeTruthy();
				});
			});
		});
	});
});
