import LernstoreCollectionDetailView from "./LernstoreCollectionDetailView";
import ContentModule from "@/store/content";
import { initializeAxios } from "@/utils/api";
import { Collection } from "@@/tests/test-utils/mockDataCollection";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { RouterLinkStub } from "@vue/test-utils";

vi.mock("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

initializeAxios({
	get: async () => ({ data: [] }),
});

const testProps = {
	resource: Collection,
};

setupStores({
	contentModule: ContentModule,
});

describe("@/components/organisms/LernstoreCollectionDetailView", () => {
	window.scrollTo = vi.fn();
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(LernstoreCollectionDetailView, {
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
				stubs: {
					RouterLink: RouterLinkStub,
					LernStoreGrid: true,
				},
				computed: {
					loading: () => vi.fn(),
					elements: () => vi.fn(),
					selected: () => vi.fn(),
				},
				state: {
					loading: true,
					elements: {},
					selected: [],
				},
			},
		});
	});

	it("Gets collection UUID", () => {
		expect(wrapper.vm.collectionUUID).toBe("be9bc35d-78f9-51a0-beb0-170512ad9666");
	});

	it("Search Elements function get's called", async () => {
		const res = await wrapper.vm.searchElements();
		expect(res).toBeUndefined();
	});

	it("Add Elements function get's called", async () => {
		const res = await wrapper.vm.addElements();
		expect(res).toBeUndefined();
	});
});
