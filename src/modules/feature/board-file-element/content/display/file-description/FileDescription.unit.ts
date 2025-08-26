import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mdiFileDocumentOutline } from "@icons/material";
import { ContentElementBar } from "@ui-board";
import { mount, shallowMount } from "@vue/test-utils";
import FileDescription from "./FileDescription.vue";

describe("FileDescription", () => {
	const shallowMountSetup = (props: {
		isEditMode: boolean;
		showTitle: boolean;
		showMenu: boolean;
		name?: string;
		caption?: string;
		src?: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			name: props.name ?? "testName",
			caption: props.caption,
			isEditMode: props.isEditMode,
			showTitle: props.showTitle,
			showMenu: props.showMenu,
			src: props.src,
		};
		const wrapper = shallowMount(FileDescription, {
			props: propsData,
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			name: propsData.name,
			caption: propsData.caption,
			src: propsData.src,
		};
	};

	const mountSetup = (props: {
		isEditMode: boolean;
		showTitle: boolean;
		showMenu: boolean;
		name?: string;
		caption?: string;
		src?: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			name: props.name ?? "testName",
			caption: props.caption,
			isEditMode: props.isEditMode,
			showTitle: props.showTitle,
			showMenu: props.showMenu,
			src: props.src,
		};
		const wrapper = mount(FileDescription, {
			props: propsData,
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
			name: propsData.name,
			caption: propsData.caption,
			src: propsData.src,
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

			it("should pass true to hasGreyBackground prop", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: true,
					showMenu: true,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.props("hasGreyBackground")).toBe(true);
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

			describe("when src is defined", () => {
				it("should render link", () => {
					const src = "testSrc";
					const { wrapper, name } = mountSetup({
						isEditMode: false,
						showTitle: true,
						showMenu: true,
						src,
					});
					const link = wrapper.find("a");

					expect(link.attributes("href")).toBe(src);
					expect(link.text()).toBe(name);
				});

				it("should have correct aria-label", () => {
					const src = "testSrc";
					const { wrapper, name } = mountSetup({
						isEditMode: false,
						showTitle: true,
						showMenu: true,
						src,
					});
					const link = wrapper.find("a");

					expect(link.attributes("aria-label")).toBe(
						`${name}, common.ariaLabel.newTab`
					);
				});
			});

			describe("when src is undefined", () => {
				it("should not render link", () => {
					const { wrapper, name } = mountSetup({
						isEditMode: false,
						showTitle: true,
						showMenu: true,
					});
					const link = wrapper.find("a");

					expect(link.exists()).toBeFalsy();
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

			it("should pass true to hasGreyBackground prop", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: false,
					showTitle: true,
					showMenu: true,
				});

				const contentElementBar = wrapper.findComponent(ContentElementBar);

				expect(contentElementBar.props("hasGreyBackground")).toBe(true);
			});

			describe("when src is defined", () => {
				it("should render link", () => {
					const src = "testSrc";
					const { wrapper, name } = mountSetup({
						isEditMode: false,
						showTitle: true,
						showMenu: true,
						src,
					});
					const link = wrapper.find("a");

					expect(link.attributes("href")).toBe(src);
					expect(link.text()).toBe(name);
				});
			});

			describe("when src is undefined", () => {
				it("should not render link", () => {
					const { wrapper, name } = mountSetup({
						isEditMode: false,
						showTitle: true,
						showMenu: true,
					});
					const link = wrapper.find("a");

					expect(link.exists()).toBeFalsy();
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
