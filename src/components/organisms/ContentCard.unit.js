import ContentCard from "./ContentCard";
import { Resource } from "@@/stories/mockData/Resource";
import VueRouter from "vue-router";
import { createLocalVue } from "@vue/test-utils";

const testProps = {
	resource: Resource,
};

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter();

describe("@components/organisms/ContentCard", () => {
	const wrapper = shallowMount(ContentCard, {
		...createComponentMocks({ i18n: true }),
		router,
		localVue,
		propsData: { ...testProps },
	});

	it(...isValidComponent(ContentCard));

	it("Renders head of contentCard as a link", () => {
		expect(wrapper.find(".title-link").exists()).toBe(true);
	});
	it("Renders contentCard img", () => {
		expect(wrapper.find(".content__img-thumbnail").exists()).toBe(true);
		expect(wrapper.find(".content__img-thumbnail").attributes("src")).toBe(
			Resource.preview.url
		);
		expect(wrapper.find(".content__img-thumbnail").attributes("alt")).toBe(
			"content-thumbnail"
		);
	});
	it("Renders icon", () => {
		expect(wrapper.find(".content__img-icon").exists()).toBe(true);
		expect(wrapper.find(".content__img-icon").attributes("source")).toBe(
			"custom"
		);
		expect(wrapper.find(".content__img-icon").attributes("icon")).toBe(
			"ic_video-circle"
		);
	});
	it("Renders title of content Card", () => {
		expect(wrapper.find(".content__title").exists()).toBe(true);
		expect(wrapper.find(".content__title").text()).toBe(
			"Mathematische Ausdrücke sortieren"
		);
	});
	it("Renders footer of content Card for single elements", () => {
		expect(wrapper.find(".footer").exists()).toBe(true);
		expect(wrapper.find(".footer__icon-container").exists()).toBe(true);
	});
});
