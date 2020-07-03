import LernstoreDetailView from "./LernstoreDetailView";
import { Resource } from "../../../stories/mockData/Resource";

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
			"https://img.youtube.com/vi/wRBPzExOH2A/maxresdefault.jpg"
		);
		expect(wrapper.find(".preview-img").attributes("alt")).toBe("Bildvorschau");
	});

	it("Renders sidebar with data", () => {
		expect(wrapper.find(".sidebar").exists()).toBe(true);
		expect(wrapper.find(".title > span").text()).toBe(
			"Mathematische Ausdrücke sortieren"
		);
		expect(wrapper.find(".tag-link").attributes("href")).toBe(
			"/content/?q=Mathematik"
		);
	});
});
