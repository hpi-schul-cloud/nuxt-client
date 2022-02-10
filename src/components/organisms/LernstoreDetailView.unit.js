import LernstoreDetailView from "./LernstoreDetailView";
import { Resource } from "@@/tests/test-utils/mockDataResource";

const testProps = {
	resource: Resource,
};

describe("@components/molecules/LernstoreDetailView", () => {
	const wrapper = shallowMount(LernstoreDetailView, {
		...createComponentMocks({ i18n: true }),
		propsData: { ...testProps },
	});

	it(...isValidComponent(LernstoreDetailView));

	it("Renders close button", () => {
		expect(wrapper.find(".close-transparent").exists()).toBe(true);
	});

	it("Renders Lernstore img", () => {
		expect(wrapper.find(".preview").exists()).toBe(true);
		expect(wrapper.find(".preview-img").exists()).toBe(true);
		expect(wrapper.find(".preview-img").attributes("src")).toBe(
			Resource.preview.url
		);
		expect(wrapper.find(".preview-img").attributes("alt")).toBe("Bildvorschau");
	});

	it("Renders sidebar with data", () => {
		expect(wrapper.find(".sidebar").exists()).toBe(true);
		expect(wrapper.find(".title > span").text()).toBe("Technik der Dotierung");
		expect(wrapper.find(".tag").attributes("href")).toBe(
			"/content/?q=Elektronik; Einführung in die Elektronik; ; Grundwissen"
		);
	});
});
