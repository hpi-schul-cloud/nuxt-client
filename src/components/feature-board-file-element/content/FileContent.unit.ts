import { PreviewStatus } from "@/fileStorageApi/v3";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import { FileAlert } from "../shared/types/FileAlert.enum";
import FileContent from "./FileContent.vue";
import FileAlerts from "./alert/FileAlerts.vue";
import FileDisplay from "./display/FileDisplay.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import FileInputs from "./inputs/FileInputs.vue";

describe("FileContent", () => {
	describe("When EditMode is true", () => {
		describe("When PreviewUrl is defined", () => {
			const setup = () => {
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

				const alerts = [FileAlert.AWAITING_SCAN_STATUS];
				const wrapper = shallowMount(FileContent, {
					props: {
						fileProperties,
						isEditMode: true,
						alerts,
					},
					global: { plugins: [createTestingVuetify()] },
				});

				return {
					wrapper,
					fileProperties,
					alerts,
				};
			};

			it("should pass props to FileDisplay", () => {
				const { wrapper, fileProperties } = setup();

				const fileContent = wrapper.findComponent(FileDisplay);

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
				const { wrapper, alerts } = setup();

				const fileAlert = wrapper.findComponent(FileAlerts);

				expect(fileAlert.props()).toEqual({
					alerts,
				});
			});

			it("should pass props to FileInputs", () => {
				const { wrapper, fileProperties } = setup();

				const fileInputs = wrapper.findComponent(FileInputs);

				expect(fileInputs.props()).toEqual({
					fileProperties,
					isEditMode: true,
				});
			});

			describe("when file inputs emit update:alternativeText", () => {
				it("should emit update:alternativeText", async () => {
					const { wrapper } = setup();

					const fileInputs = wrapper.findComponent(FileInputs);

					fileInputs.vm.$emit("update:alternativeText");

					expect(wrapper.emitted("update:alternativeText")).toHaveLength(1);
				});
			});

			describe("when file inputs emit update:caption", () => {
				it("should emit update:caption event, when it receives update:caption event from file inputs component", async () => {
					const { wrapper } = setup();

					const fileInputs = wrapper.findComponent(FileInputs);

					fileInputs.vm.$emit("update:caption");

					expect(wrapper.emitted("update:caption")).toHaveLength(1);
				});
			});

			describe("when file alerts emits on-status-reload", () => {
				it("should emit fetch:file event", async () => {
					const { wrapper } = setup();

					const fileAlert = wrapper.findComponent(FileAlerts);

					await fileAlert.vm.$emit("on-status-reload");

					expect(wrapper.emitted("fetch:file")).toBeTruthy();
				});
			});

			describe("when file display emits add:alert", () => {
				it("should emit add:alert event", async () => {
					const { wrapper } = setup();

					const fileDisplay = wrapper.findComponent(FileDisplay);

					fileDisplay.vm.$emit("add:alert");

					expect(wrapper.emitted("add:alert")).toHaveLength(1);
				});
			});
		});
	});
});
