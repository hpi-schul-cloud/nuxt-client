import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mdiFileDocumentOutline } from "@mdi/js";
import { mount, shallowMount } from "@vue/test-utils";
import FileDescription from "./FileDescription.vue";

describe("FileDescription", () => {
	const shallowMountSetup = (props: {
		isEditMode: boolean;
		showTitle: boolean;
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
			src: props.src,
		};
		const wrapper = shallowMount(FileDescription, {
			propsData,
			...createComponentMocks({}),
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
		name?: string;
		caption?: string;
		src?: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			name: props.name ?? "testName",
			caption: props.caption ?? "testCaption",
			isEditMode: props.isEditMode,
			showTitle: props.showTitle,
			src: props.src,
		};
		const wrapper = mount(FileDescription, {
			propsData,
			...createComponentMocks({}),
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
				});

				const contentElementBar = wrapper.find("contentelementbar-stub");

				expect(contentElementBar.exists()).toBe(true);
			});

			it("should not render caption", () => {
				const { wrapper, caption } = mountSetup({
					isEditMode: true,
					showTitle: true,
				});

				const text = wrapper.text();

				expect(text).not.toContain(caption);
			});

			it("should pass false to hasGreyBackground prop", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: true,
				});

				const contentElementBar = wrapper.find("contentelementbar-stub");

				expect(contentElementBar.props("hasGreyBackground")).toBe(false);
			});

			it("should pass mdiFileDocumentOutline to icon prop", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: true,
				});

				const contentElementBar = wrapper.find("contentelementbar-stub");

				expect(contentElementBar.props("icon")).toBe(mdiFileDocumentOutline);
			});

			describe("when src is defined", () => {
				it("should render link", () => {
					const src = "testSrc";
					const { wrapper, name } = mountSetup({
						isEditMode: false,
						showTitle: true,
						src,
					});
					console.log(wrapper.html());
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
					});
					const link = wrapper.find("a");

					expect(link.exists()).toBeFalsy();
					expect(wrapper.text()).toContain(name);
				});
			});
		});

		describe("when showTitle is false", () => {
			it("should not render content element bar", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: true,
					showTitle: false,
				});

				const contentElementBar = wrapper.find("contentelementbar-stub");

				expect(contentElementBar.exists()).toBe(false);
			});

			it("should not render caption", () => {
				const { wrapper, caption } = mountSetup({
					isEditMode: true,
					showTitle: false,
				});

				const text = wrapper.text();

				expect(text).not.toContain(caption);
			});
		});
	});

	describe("when isEditMode is false", () => {
		describe("when showTitle is true", () => {
			it("should render content element bar", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: false,
					showTitle: true,
				});

				const contentElementBar = wrapper.find("contentelementbar-stub");

				expect(contentElementBar.exists()).toBe(true);
			});

			it("should render caption", () => {
				const { wrapper, caption } = mountSetup({
					isEditMode: false,
					showTitle: true,
				});

				const text = wrapper.text();

				expect(text).toContain(caption);
			});

			it("should pass true to hasGreyBackground prop", () => {
				const { wrapper } = shallowMountSetup({
					isEditMode: false,
					showTitle: true,
				});

				const contentElementBar = wrapper.find("contentelementbar-stub");

				expect(contentElementBar.props("hasGreyBackground")).toBe(true);
			});

			describe("when src is defined", () => {
				it("should render link", () => {
					const src = "testSrc";
					const { wrapper, name } = mountSetup({
						isEditMode: false,
						showTitle: true,
						src,
					});
					console.log(wrapper.html());
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
					});
					const link = wrapper.find("a");

					expect(link.exists()).toBeFalsy();
					expect(wrapper.text()).toContain(name);
				});
			});
		});

		describe("when showTitle is false", () => {
			it("should not render title", () => {
				const { wrapper, name } = shallowMountSetup({
					isEditMode: false,
					showTitle: false,
				});

				const text = wrapper.text();

				expect(text).not.toContain(name);
			});

			describe("when caption is defined", () => {
				it("should render caption", () => {
					const caption = "testCaption";
					const { wrapper } = shallowMountSetup({
						isEditMode: false,
						showTitle: false,
						caption,
					});

					const text = wrapper.text();

					expect(text).toContain(caption);
				});
			});

			describe("when caption is undefined", () => {
				it("should not render caption div", () => {
					const { wrapper } = shallowMountSetup({
						isEditMode: false,
						showTitle: false,
					});

					const captionDiv = wrapper.find(".pa-4.grey.lighten-4");

					expect(captionDiv.exists()).toBeFalsy();
				});
			});
		});
	});
});
