import FileDescription from "./FileDescription.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiFileDocumentOutline } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { mount, shallowMount } from "@vue/test-utils";

describe("FileDescription", () => {
	const shallowMountSetup = (props: {
		isEditMode: boolean;
		showTitle: boolean;
		showMenu: boolean;
		name?: string;
		caption?: string;
		href?: string;
		isDownloadLink?: boolean;
	}) => {
		const propsData = {
			name: props.name ?? "testName",
			caption: props.caption,
			isEditMode: props.isEditMode,
			showTitle: props.showTitle,
			showMenu: props.showMenu,
			href: props.href,
			isDownloadLink: props.isDownloadLink ?? false,
		};
		const wrapper = shallowMount(FileDescription, {
			props: propsData,
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			name: propsData.name,
			caption: propsData.caption,
		};
	};

	const mountSetup = (props: {
		isEditMode: boolean;
		showTitle: boolean;
		showMenu: boolean;
		name?: string;
		caption?: string;
		href?: string;
		isDownloadLink?: boolean;
	}) => {
		const propsData = {
			name: props.name ?? "testName",
			caption: props.caption,
			isEditMode: props.isEditMode,
			showTitle: props.showTitle,
			showMenu: props.showMenu,
			href: props.href,
			isDownloadLink: props.isDownloadLink ?? false,
		};
		const wrapper = mount(FileDescription, {
			props: propsData,
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			name: propsData.name,
			caption: propsData.caption,
		};
	};

	describe("when isEditMode is true", () => {
		describe("when showTitle is true", () => {
			it("should render content element bar", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: true,
					showMenu: true,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.exists()).toBe(true);
			});

			it("should not render caption", () => {
				const caption = "testCaption";
				const { wrapper } = mountSetup({
					isEditMode: true,
					showTitle: true,
					showMenu: true,
					caption,
				});

				const text = wrapper.text();

				expect(text).not.toContain(caption);
			});

			it("should pass mdiFileDocumentOutline to icon prop", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: true,
					showMenu: true,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.props("icon")).toBe(mdiFileDocumentOutline);
			});

			it("should pass hoverable text area prop in edit mode when title is shown", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: true,
					showMenu: true,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.props("isTextAreaHoverable")).toBe(true);
			});

			describe("when href is defined", () => {
				it("should render link", () => {
					const { wrapper, name } = mountSetup({
						isEditMode: true,
						showTitle: true,
						showMenu: true,
						href: "testHref",
					});
					const link = wrapper.find("a");

					expect(link.exists()).toBe(true);
					expect(link.text()).toContain(name);
					expect(link.attributes("href")).toBe("testHref");
					expect(link.attributes("target")).toBe("_blank");
				});

				it("should have correct aria-label", () => {
					const { wrapper, name } = mountSetup({
						isEditMode: true,
						showTitle: true,
						showMenu: true,
						href: "testHref",
					});
					const link = wrapper.find("a");

					expect(link.attributes("aria-label")).toBe(`${name}, common.ariaLabel.newTab`);
				});

				it("should stop click bubbling", async () => {
					const host = document.createElement("div");
					const parentClick = vi.fn();
					host.addEventListener("click", parentClick);
					const wrapper = mount(FileDescription, {
						props: {
							name: "testName",
							showTitle: true,
							showMenu: false,
							isEditMode: true,
							href: "testHref",
						},
						attachTo: host,
						global: { plugins: [createTestingVuetify(), createTestingI18n()] },
					});

					await wrapper.find("a").trigger("click");

					expect(parentClick).not.toHaveBeenCalled();
					wrapper.unmount();
					host.remove();
				});

				it("should stop enter keydown bubbling", async () => {
					const host = document.createElement("div");
					const parentKeydown = vi.fn();
					host.addEventListener("keydown", parentKeydown);
					const wrapper = mount(FileDescription, {
						props: {
							name: "testName",
							showTitle: true,
							showMenu: false,
							isEditMode: true,
							href: "testHref",
						},
						attachTo: host,
						global: { plugins: [createTestingVuetify(), createTestingI18n()] },
					});

					await wrapper.find("a").trigger("keydown.enter");

					expect(parentKeydown).not.toHaveBeenCalled();
					wrapper.unmount();
					host.remove();
				});

				it("should render download link when configured", () => {
					const { wrapper, name } = mountSetup({
						isEditMode: true,
						showTitle: true,
						showMenu: true,
						href: "testHref",
						isDownloadLink: true,
					});
					const link = wrapper.find("a");

					expect(link.attributes("href")).toBe("testHref");
					expect(link.attributes("download")).toBe(name);
					expect(link.attributes("target")).toBeUndefined();
					expect(link.attributes("aria-label")).toBe(`${name}, components.board.action.download`);
				});
			});

			describe("when href is undefined", () => {
				it("should not render link", () => {
					const { wrapper, name } = mountSetup({
						isEditMode: true,
						showTitle: true,
						showMenu: true,
					});
					const link = wrapper.find("a");

					expect(link.exists()).toBe(false);
					expect(wrapper.text()).toContain(name);
				});
			});
		});

		describe("when showTitle is false", () => {
			it("should render content element bar", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: false,
					showMenu: false,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.exists()).toBe(true);
			});

			it("should not pass hoverable text area prop when title is hidden", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: false,
					showMenu: false,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.props("isTextAreaHoverable")).toBe(false);
			});
		});
	});

	describe("when isEditMode is false", () => {
		describe("when showTitle is true", () => {
			it("should render content element bar", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: false,
					showTitle: true,
					showMenu: true,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.exists()).toBe(true);
			});

			it("should not pass hoverable text area prop in view mode", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: false,
					showTitle: true,
					showMenu: true,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.props("isTextAreaHoverable")).toBe(false);
			});

			it("should render caption", () => {
				const caption = "testCaption";
				const { wrapper } = mountSetup({
					isEditMode: false,
					showTitle: true,
					showMenu: true,
					caption,
				});

				const text = wrapper.text();

				expect(text).toContain(caption);
			});

			describe("when href is undefined", () => {
				it("should not render link", () => {
					const { wrapper, name } = mountSetup({
						isEditMode: false,
						showTitle: true,
						showMenu: true,
					});
					const link = wrapper.find("a");

					expect(link.exists()).toBe(false);
					expect(wrapper.text()).toContain(name);
				});
			});
		});

		describe("when showTitle is false", () => {
			it("should not render title", () => {
				const { wrapper, name } = mountSetup({
					isEditMode: false,
					showTitle: false,
					showMenu: false,
				});

				const text = wrapper.text();

				expect(text).not.toContain(name);
			});

			describe("when caption is defined", () => {
				it("should render caption", () => {
					const caption = "testCaption";
					const { wrapper } = mountSetup({
						isEditMode: false,
						showTitle: false,
						showMenu: false,
						caption,
					});

					const text = wrapper.text();

					expect(text).toContain(caption);
				});
			});

			describe("when caption is undefined", () => {
				it("should not render caption div", () => {
					const { wrapper } = mountSetup({
						isEditMode: false,
						showTitle: false,
						showMenu: false,
					});

					const captionDiv = wrapper.find(".px-4");

					expect(captionDiv.exists()).toBeFalsy();
				});
			});
		});
	});
});
