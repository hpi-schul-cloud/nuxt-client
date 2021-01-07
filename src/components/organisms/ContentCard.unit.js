import ContentCard from "./ContentCard";
import { Resource } from "@@/stories/mockData/Resource";
import { Collection } from "@@/stories/mockData/Collection";
import VueRouter from "vue-router";
import { createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(VueRouter);

const router = new VueRouter();
describe("@components/organisms/ContentCard", () => {
	const wrapper = shallowMount(ContentCard, {
		...createComponentMocks({ i18n: true }),
		router,
		localVue,
		propsData: { resource: Resource },
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

describe("@components/organisms/ContentCard Collection", () => {
	const wrapper = shallowMount(ContentCard, {
		...createComponentMocks({ i18n: true }),
		router,
		localVue,
		propsData: { resource: Collection },
	});

	it(...isValidComponent(ContentCard));

	it("Renders head of contentCard as a link", () => {
		expect(wrapper.find(".title-link").exists()).toBe(true);
	});
	it("Renders contentCard img", () => {
		expect(wrapper.find(".content__img-thumbnail").exists()).toBe(true);
		expect(wrapper.find(".content__img-thumbnail").attributes("src")).toBe(
			Collection.preview.url
		);
		expect(wrapper.find(".content__img-thumbnail").attributes("alt")).toBe(
			"content-thumbnail"
		);
	});
	it("Renders collection icon", () => {
		expect(wrapper.find(".card-tag").exists()).toBe(true);
		expect(wrapper.find(".content__text-icon").exists()).toBe(true);
		expect(wrapper.find(".content__text-icon").attributes("source")).toBe(
			"custom"
		);
		expect(wrapper.find(".content__text-icon").attributes("icon")).toBe(
			"ic_collection"
		);
	});

	it("Renders title of content Card", () => {
		expect(wrapper.find(".content__title").exists()).toBe(true);
		expect(wrapper.find(".content__title").text()).toBe("heimische Singvögel");
	});
	it("Renders footer of content Card for single elements", () => {
		expect(wrapper.find(".footer").exists()).toBe(true);
		expect(wrapper.find(".footer__icon-container").exists()).toBe(true);
	});
});
