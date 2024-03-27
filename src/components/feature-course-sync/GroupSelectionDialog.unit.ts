import { RoleName } from "@/serverApi/v3";
import { groupResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { GroupListFilter, useGroupListState } from "@data-group";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
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

	const getWrapper = (
		props: ComponentProps<typeof GroupSelectionDialog> = { isOpen: true }
	) => {
		useGroupListStateMock.isLoading = ref(false);
		useGroupListStateMock.groups = ref([]);

		const wrapper = mount(GroupSelectionDialog, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],
				provide: {},
			},
			props,
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
		it("should load groups", async () => {
			const { wrapper } = getWrapper({ isOpen: false });

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

	describe("when clicking the continue button after selection a group", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			Object.defineProperty(window, "location", {
				configurable: true,
				value: { assign: jest.fn() },
			});

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
