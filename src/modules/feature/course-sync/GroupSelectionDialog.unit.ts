import GroupSelectionDialog from "./GroupSelectionDialog.vue";
import { groupResponseFactory, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoleName } from "@api-server";
import { GroupListFilter, useGroupListState } from "@data-group";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { nextTick, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { VAutocomplete } from "vuetify/components";

vi.mock("@data-group", () => ({
	useGroupListState: vi.fn(),
}));

describe("GroupSelectionDialog", () => {
	let useGroupListStateMock: Mocked<ReturnType<typeof useGroupListState>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

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
		useGroupListStateMock = mockComposable(useGroupListState);

		vi.mocked(useGroupListState).mockReturnValue(useGroupListStateMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when the dialog is open", () => {
		it("should load groups", async () => {
			const { wrapper } = getWrapper({ isOpen: false, description: "" });

			await wrapper.setProps({ isOpen: true });

			expect(useGroupListStateMock.fetchGroups).toHaveBeenCalledWith<[GroupListFilter, { append: boolean }?]>(
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
			expect(wrapper.findComponent(SvsDialog).props("confirmBtnDisabled")).toBe(true);
		});
	});

	describe("when searching for a specific group name", () => {
		it("should load only groups with that name", async () => {
			vi.useFakeTimers();
			const { wrapper } = getWrapper();

			const autocomplete = wrapper.findComponent(VAutocomplete);
			await autocomplete.setValue("testGroup", "search");
			vi.runAllTimers();

			expect(useGroupListStateMock.fetchGroups).toHaveBeenCalledWith<[GroupListFilter, { append: boolean }?]>(
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
						role: RoleName.TEACHER,
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

			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			expect(wrapper.emitted("confirm")).toEqual([[group]]);
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
						role: RoleName.STUDENT,
					},
				],
			});

			useGroupListStateMock.groups.value = [group];

			(wrapper.vm as unknown as typeof GroupSelectionDialog).selectedGroup = group;
			await nextTick();

			return {
				wrapper,
			};
		};

		it("should disable the continue button", async () => {
			const { wrapper } = getWrapper();
			expect(wrapper.findComponent(SvsDialog).props("confirmBtnDisabled")).toBe(true);
		});

		it("should display a warning", async () => {
			const { wrapper } = await setup();

			const warning = wrapper.findComponent("[data-testid=no-teacher-warning]");

			expect(warning.isVisible()).toEqual(true);
		});
	});
});
