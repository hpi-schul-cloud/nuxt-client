import { RoleName } from "@/serverApi/v3";
import { groupResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { GroupListFilter, useGroupListState } from "@data-group";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { VAutocomplete } from "vuetify/lib/components/index";
import GroupSelectionDialog from "./GroupSelectionDialog.vue";

vi.mock("@data-group", () => {
	return {
		useGroupListState: vi.fn(),
	};
});

describe("GroupSelectionDialog", () => {
	let useGroupListStateMock: DeepMocked<ReturnType<typeof useGroupListState>>;

	const getWrapper = (
		props: ComponentProps<typeof GroupSelectionDialog> = {
			isOpen: true,
			description: "",
		}
	) => {
		useGroupListStateMock.isLoading = ref(false);
		useGroupListStateMock.groups = ref([]);
		useGroupListStateMock.skip = ref(0);
		useGroupListStateMock.limit = ref(10);
		useGroupListStateMock.total = ref(0);

		const wrapper = mount(GroupSelectionDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useGroupListStateMock = createMock<ReturnType<typeof useGroupListState>>();

		vi.mocked(useGroupListState).mockReturnValue(useGroupListStateMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when the dialog is open", () => {
		it("should load groups", async () => {
			const { wrapper } = getWrapper({ isOpen: false, description: "" });

			await wrapper.setProps({ isOpen: true });

			expect(useGroupListStateMock.fetchGroups).toHaveBeenCalledWith<
				[GroupListFilter, { append: boolean }?]
			>(
				{
					name: "",
					availableForSynchronization: true,
				},
				undefined
			);
		});
	});

	describe("when no group is selected", () => {
		it("should disable the continue button", () => {
			const { wrapper } = getWrapper();

			const nextBtn = wrapper.findComponent("[data-testid=dialog-next]");

			expect(nextBtn.attributes("disabled")).toBeDefined();
		});
	});

	describe("when searching for a specific group name", () => {
		it("should load only groups with that name", async () => {
			vi.useFakeTimers();
			const { wrapper } = getWrapper();

			const autocomplete = wrapper.findComponent(VAutocomplete);
			await autocomplete.setValue("testGroup", "search");
			vi.runAllTimers();

			expect(useGroupListStateMock.fetchGroups).toHaveBeenCalledWith<
				[GroupListFilter, { append: boolean }?]
			>(
				{
					name: "testGroup",
					availableForSynchronization: true,
				},
				undefined
			);
		});
	});

	describe("when clicking the continue button after selection a group", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			const group = groupResponseFactory.build({
				users: [
					{
						id: "teacher1",
						firstName: "Teacher",
						lastName: "1",
						role: RoleName.Teacher,
					},
				],
			});

			useGroupListStateMock.groups.value = [group];

			return {
				wrapper,
				group,
			};
		};

		it("should emit the confirm event", async () => {
			const { wrapper, group } = setup();

			const autocomplete = wrapper.findComponent(VAutocomplete);
			await autocomplete.setValue(group);

			const nextBtn = wrapper.findComponent("[data-testid=dialog-next]");
			await nextBtn.trigger("click");

			expect(wrapper.emitted("confirm")).toEqual([[group]]);
		});
	});

	describe("when clicking the cancel button", () => {
		it("should close the dialog", async () => {
			const { wrapper } = getWrapper();

			const cancelBtn = wrapper.findComponent("[data-testid=dialog-cancel]");
			await cancelBtn.trigger("click");

			expect(wrapper.vm.isOpen).toEqual(false);
			expect(wrapper.emitted("update:isOpen")).toBeDefined();
			expect(wrapper.emitted("cancel")).toEqual([[]]);
		});
	});

	describe("when the selected group has no teachers", () => {
		const setup = async () => {
			const { wrapper } = getWrapper();

			const group = groupResponseFactory.build({
				users: [
					{
						id: "student1",
						firstName: "Student",
						lastName: "1",
						role: RoleName.Student,
					},
				],
			});

			useGroupListStateMock.groups.value = [group];

			wrapper.vm.selectedGroup = group;
			await nextTick();

			return {
				wrapper,
			};
		};

		it("should disable the continue button", async () => {
			const { wrapper } = await setup();

			const nextBtn = wrapper.findComponent("[data-testid=dialog-next]");

			expect(nextBtn.attributes("disabled")).toBeDefined();
		});

		it("should display a warning", async () => {
			const { wrapper } = await setup();

			const warning = wrapper.findComponent("[data-testid=no-teacher-warning]");

			expect(warning.isVisible()).toEqual(true);
		});
	});
});
