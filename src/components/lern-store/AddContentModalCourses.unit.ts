// This test is necessary to ensure that the real Vuex course-store is functioning correctly.
// The course-store is only invoked at this point, making it crucial to test it here.
import AddContentModal from "./AddContentModal.vue";

import {
	createTestingVuetify,
	createTestingI18n,
} from "@@/tests/test-utils/setup";
import { VSelect } from "vuetify/lib/components/index";
import courses from "@/store/courses";
import { createStore } from "vuex";
import ContentModule from "@/store/content";
import setupStores from "@@/tests/test-utils/setupStores";
import { nextTick } from "vue";

const testProps = {
	showCopyModal: true,
	resource: {
		title: "Test title",
		url: "test url",
		client: "test client",
	},
	contentId: "Test content",
	items: [],
};

const courseOptions = [
	{
		_id: "id1",
		name: "course1",
		isArchived: false,
	},
	{
		_id: "id2",
		name: "course2",
		isArchived: false,
	},
];

const createMockStore = () => {
	const mockStore = createStore({
		modules: {
			courses,
		},
	});
	return { mockStore };
};

describe("AddContentModal with real Vuex courses-store", () => {
	const setup = (props: {
		showCopyModal: boolean;
		resource: {
			title: string;
			url: string;
			client: string;
		};
		contentId: string;
		items?: Array<{
			title: string;
			url: string;
			client: string;
		}>;
	}) => {
		setupStores({
			contentModule: ContentModule,
		});
		const { mockStore } = createMockStore();

		const wrapper = mount(AddContentModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
				},
			},
			props,
		});

		return { wrapper, mockStore };
	};

	it("should access the real courses store", async () => {
		const { wrapper, mockStore } = setup(testProps);

		mockStore.commit("courses/set", { items: courseOptions });
		await nextTick();

		const select = wrapper.findComponent(VSelect);
		const items = select.props("items");
		expect(items).toHaveLength(2);
	});
});
