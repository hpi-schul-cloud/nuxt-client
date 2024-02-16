import ContentCard from "./ContentCard";
import { Resource } from "@@/tests/test-utils/mockDataResource";
import { Collection } from "@@/tests/test-utils/mockDataCollection";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { createModuleMocks } from "@/utils/mock-store-module";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";

describe("@/components/organisms/ContentCard", () => {
	const authModule = createModuleMocks(AuthModule);
	const wrapper = mount(ContentCard, {
		global: {
			plugins: [createTestingVuetify()],
			provide: {
				[AUTH_MODULE_KEY.valueOf()]: authModule,
			},
			mocks: {
				$route: { query: { course: "Kurs" } },
			},
		},
		props: { resource: Resource },
	});

	it("Sets inline attribute to query when the prop is set to true", () => {
		wrapper.setProps({ inline: true });
		wrapper.vm.$nextTick(() => {
			expect(wrapper.vm.inline).toBe(true);
			expect(wrapper.vm.query).toMatchObject({ inline: 1 });
		});
	});

	it("Renders head of contentCard as a link", () => {
		expect(wrapper.find(".title-link").exists()).toBe(true);
	});

	it("Renders contentCard img", () => {
		expect(wrapper.find(".content__img-thumbnail").exists()).toBe(true);
		expect(wrapper.find(".content__img-thumbnail").attributes("src")).toBe(
			Resource.preview.url
		);
		expect(wrapper.find(".content__img-thumbnail").attributes("alt")).toBe("");
	});

	it("Renders title of content Card", () => {
		expect(wrapper.find(".content__title").exists()).toBe(true);
		expect(wrapper.find(".content__title").text()).toBe(
			"Technik der Dotierung"
		);
	});

	it("Renders footer of content Card for single elements", () => {
		expect(wrapper.find(".footer").exists()).toBe(true);
		expect(wrapper.find(".footer__icon-container").exists()).toBe(true);
	});
});

describe("@/components/organisms/ContentCard Collection", () => {
	const wrapper = mount(ContentCard, {
		global: {
			plugins: [createTestingVuetify()],
		},
		props: { resource: Collection },
	});

	it("Renders head of contentCard as a link", () => {
		expect(wrapper.find(".title-link").exists()).toBe(true);
	});

	it("Renders contentCard img", () => {
		expect(wrapper.find(".content__img-thumbnail").exists()).toBe(true);
		expect(wrapper.find(".content__img-thumbnail").attributes("src")).toBe(
			Collection.preview.url
		);
		expect(wrapper.find(".content__img-thumbnail").attributes("alt")).toBe("");
	});

	it("Renders collection icon", () => {
		const contentTextIcon = wrapper.find(".content__text-icon");
		expect(wrapper.find(".card-tag").exists()).toBe(true);
		expect(contentTextIcon.exists()).toBe(true);
		expect(contentTextIcon.element.innerHTML.includes("$ic_collection")).toBe(
			true
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
