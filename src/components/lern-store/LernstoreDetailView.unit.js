import LernstoreDetailView from "./LernstoreDetailView";
import { Resource } from "@@/tests/test-utils/mockDataResource";
import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";

vi.mock("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const testProps = {
	resource: Resource,
};

describe("@/components/molecules/LernstoreDetailView", () => {
	const wrapper = shallowMount(LernstoreDetailView, {
		props: { ...testProps },
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			mocks: {
				$route: {
					query: {
						id: "mockId",
					},
				},
			},
		},
	});

	it("Renders close button", () => {
		expect(wrapper.find(".close-transparent,.close-icon").exists()).toBe(true);
	});

	it("Renders Lernstore img", () => {
		expect(wrapper.find(".preview").exists()).toBe(true);
		expect(wrapper.find(".preview-img").exists()).toBe(true);
		expect(wrapper.find(".preview-img").attributes("src")).toBe(
			Resource.preview.url
		);
		expect(wrapper.find(".preview-img").attributes("alt")).toBe(
			"pages.content.preview_img.alt"
		);
	});

	it("Renders sidebar with data", () => {
		expect(wrapper.find(".sidebar").exists()).toBe(true);
		expect(wrapper.find(".title > span").text()).toBe("Technik der Dotierung");
		expect(wrapper.find(".tag").attributes("href")).toBe(
			"/content/?q=Elektronik; Einführung in die Elektronik; ; Grundwissen"
		);
	});
});
