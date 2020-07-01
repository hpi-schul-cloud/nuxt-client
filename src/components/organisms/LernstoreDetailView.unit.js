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

	it("Renders close icon", () => {
		expect(wrapper.find(".close-icon").exists()).toBe(true);
	});

	it("Renders Lernstore img", () => {
		expect(wrapper.find(".preview").exists()).toBe(true);
		expect(wrapper.find(".preview-img").exists()).toBe(true);
		expect(wrapper.find(".preview-img").attributes("src")).toBe(
			"https://mv-repo.schul-cloud.org/edu-sharing/preview?nodeId=70eedbd1-a4e9-47ee-ac00-3848863e5295&amp;storeProtocol=workspace&amp;storeId=SpacesStore&amp;dontcache=1593152667345"
		);
		expect(wrapper.find(".preview-img").attributes("alt")).toBe("Bildvorschau");
	});

	it("Renders sidebar with data", () => {
		expect(wrapper.find(".sidebar").exists()).toBe(true);
		expect(wrapper.find(".title > span").text()).toBe(
			"Mathematische Ausdrücke sortieren"
		);
	});
});
