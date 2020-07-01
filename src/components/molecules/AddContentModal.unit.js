import Vuex, { mapGetters } from "vuex";
import AddContentModal from "@components/molecules/AddContentModal";
import { isValidComponent } from "@@/tests/unit/commonTests";
import { createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();
localVue.use(Vuex);

const testProps = {
	showCopyModal: true,
	resource: {
		title: "Test title",
		url: "test url",
		ref: {
			id: "test id",
		},
	},
	contentId: "Test content",
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

function getWrapper(attributes, options) {
	return mount(AddContentModal, {
		...createComponentMocks({
			i18n: true,
			store: {
				content: {
					getters: {
						"courses/": () => courseOptions,
					},
					computed: {
						...mapGetters("courses", {
							courseOptions,
						}),
					},
				},
			},
		}),
		propsData: attributes,
		...options,
	});
}

describe.skip("@components/molecules/AddContentModal", () => {
	it(...isValidComponent(AddContentModal));

	it("select courses", async () => {
		const wrapper = getWrapper(testProps);
		expect(
			wrapper.find(".content-modal__body--select").element.attributes.options
		).toBe("");
	});
});
