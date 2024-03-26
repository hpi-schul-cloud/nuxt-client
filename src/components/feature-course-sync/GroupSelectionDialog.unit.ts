import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { GroupListFilter, useGroupListState } from "@data-group";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { VAutocomplete } from "vuetify/lib/components/index.mjs";
import GroupSelectionDialog from "./GroupSelectionDialog.vue";

jest.mock("@data-group", () => {
	return {
		...jest.requireActual("@data-group"),
		useGroupListState: jest.fn(),
	};
});

describe("GroupSelectionDialog", () => {
	let useGroupListStateMock: DeepMocked<ReturnType<typeof useGroupListState>>;

	const getWrapper = () => {
		useGroupListStateMock.isLoading = ref(false);
		useGroupListStateMock.groups = ref([]);

		const wrapper = mount(GroupSelectionDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {},
			},
			props: {
				isOpen: true,
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useGroupListStateMock = createMock<ReturnType<typeof useGroupListState>>();

		jest.mocked(useGroupListState).mockReturnValue(useGroupListStateMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when the dialog is open", () => {
		it("should load groups", () => {
			getWrapper();

			expect(useGroupListStateMock.fetchGroups).toHaveBeenCalledWith<
				[GroupListFilter]
			>({
				name: "",
				availableForSynchronization: true,
			});
		});
	});

	describe("when no group is selected", () => {
		it("should disable the continue button", () => {
			const { wrapper } = getWrapper();

			const nextBtn = wrapper.findComponent("[data-testid=dialog-next]");

			expect(nextBtn.attributes("disabled")).toBeDefined();
		});
	});

	describe("when clicking the continue button after selection a group", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			Object.defineProperty(window, "location", {
				configurable: true,
				value: { assign: jest.fn() },
			});

			const group = { id: "123", name: "456" };

			useGroupListStateMock.groups.value = [group];

			return {
				wrapper,
				group,
			};
		};

		it("should redirect to the course creation", async () => {
			const { wrapper, group } = setup();

			const autocomplete = wrapper.findComponent(VAutocomplete);
			await autocomplete.setValue(group);

			const nextBtn = wrapper.findComponent("[data-testid=dialog-next]");
			await nextBtn.trigger("click");

			expect(window.location.assign).toHaveBeenCalledWith(
				`/courses/add?syncedGroupId=${group.id}`
			);
		});
	});
});
