import LernstoreCollectionDetailView from "./LernstoreCollectionDetailView";
import Vuex from "vuex";
import { Collection } from "@@/tests/test-utils/mockDataCollection";
import VueRouter from "vue-router";
import { createLocalVue } from "@vue/test-utils";
import ContentModule from "@/store/content";
import NotifierModule from "@/store/notifier";
import setupStores from "@@/tests/test-utils/setupStores";

const testProps = {
	resource: Collection,
};

jest.spyOn(window, "scrollTo").mockImplementation();

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

const router = new VueRouter();

setupStores({
	contentModule: ContentModule,
	notifierModule: NotifierModule,
});

describe("@/components/organisms/LernstoreCollectionDetailView", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(LernstoreCollectionDetailView, {
			...createComponentMocks({ i18n: true }),
			router,
			localVue,
			propsData: { ...testProps },
			computed: {
				loading: () => jest.fn(),
				elements: () => jest.fn(),
				selected: () => jest.fn(),
			},
			state: {
				loading: true,
				elements: {},
				selected: [],
			},
		});
	});

	it("Gets collection UUID", () => {
		expect(wrapper.vm.collectionUUID).toBe(
			"be9bc35d-78f9-51a0-beb0-170512ad9666"
		);
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
