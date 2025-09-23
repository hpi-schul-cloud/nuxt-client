import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import ContentModule from "@/store/content";
import { Collection } from "@@/tests/test-utils/mockDataCollection";
import { Resource } from "@@/tests/test-utils/mockDataResource";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { RouterLinkStub } from "@vue/test-utils";
import ContentCard from "./ContentCard";
import { setActivePinia } from "pinia";
import { createTestAppStoreWithRole } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";

describe("@/components/organisms/ContentCard", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());

		// The role can be anything here except "student", because of the "isNotStudent" method in ContentCard.
		createTestAppStoreWithRole("test-role");
	});
	beforeEach(() => {
		setupStores({
			contentModule: ContentModule,
		});
	});

	const setup = (resource = Resource) => {
		const wrapper = mount(ContentCard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$route: { query: { course: "Kurs" } },
				},
				components: {
					"base-input": BaseInput,
					"router-link": RouterLinkStub,
				},
			},
			props: { resource },
		});
		return { wrapper };
	};

	it("Sets inline attribute to query when the prop is set to true", () => {
		const { wrapper } = setup();

		wrapper.setProps({ inline: true });
		wrapper.vm.$nextTick(() => {
			expect(wrapper.vm.inline).toBe(true);
			expect(wrapper.vm.query).toMatchObject({ inline: 1 });
		});
	});

	it("Renders head of contentCard as a link", () => {
		const { wrapper } = setup();
		expect(wrapper.find(".title-link").exists()).toBe(true);
	});

	it("Renders contentCard img", () => {
		const { wrapper } = setup();

		expect(wrapper.find(".content__img-thumbnail").exists()).toBe(true);
		expect(wrapper.find(".content__img-thumbnail").attributes("src")).toBe(
			Resource.preview.url
		);
		expect(wrapper.find(".content__img-thumbnail").attributes("alt")).toBe("");
	});

	it("Renders title of content Card", () => {
		const { wrapper } = setup();

		expect(wrapper.find(".content__title").exists()).toBe(true);
		expect(wrapper.find(".content__title").text()).toBe(
			"Technik der Dotierung"
		);
	});

	it("Renders footer of content Card for single elements", () => {
		const { wrapper } = setup();

		expect(wrapper.find(".footer").exists()).toBe(true);
		expect(wrapper.find(".footer__icon-container").exists()).toBe(true);
	});

	describe("@/components/organisms/ContentCard Collection", () => {
		it("Renders head of contentCard as a link", () => {
			const { wrapper } = setup(Collection);
			expect(wrapper.find(".title-link").exists()).toBe(true);
		});

		it("Renders contentCard img", () => {
			const { wrapper } = setup(Collection);

			expect(wrapper.find(".content__img-thumbnail").exists()).toBe(true);
			expect(wrapper.find(".content__img-thumbnail").attributes("src")).toBe(
				Collection.preview.url
			);
			expect(wrapper.find(".content__img-thumbnail").attributes("alt")).toBe(
				""
			);
		});

		it("Renders collection icon", () => {
			const { wrapper } = setup(Collection);

			const cardTag = wrapper.get(".card-tag");
			const collectionIcon = cardTag.getComponent({ name: "v-icon" });

			expect(collectionIcon.props("icon")).toBe("$ic_collection");
		});

		it("Renders title of content Card", () => {
			const { wrapper } = setup(Collection);

			expect(wrapper.find(".content__title").exists()).toBe(true);
			expect(wrapper.find(".content__title").text()).toBe(
				"heimische Singvögel"
			);
		});

		it("Renders footer of content Card for single elements", () => {
			const { wrapper } = setup(Collection);

			expect(wrapper.find(".footer").exists()).toBe(true);
			expect(wrapper.find(".footer__icon-container").exists()).toBe(true);
		});
	});
});
