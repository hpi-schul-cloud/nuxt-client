import { useDataTableFilter } from "./composables/filter.composable";
import DataFilter from "./DataFilter.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { computed, ref } from "vue";

vi.mock("./composables/filter.composable");

const mockedUseBoardApi = vi.mocked(useDataTableFilter);
describe("@components/DataFilter/DataFilter.vue", () => {
	const updateFilterMock = vi.fn();
	const removeFilterMock = vi.fn();
	const removeChipFilterMock = vi.fn();
	const defaultFilterMenuItems = [
		{ label: "Registration", value: "consentStatus" },
		{ label: "Class(es)", value: "classes" },
		{ label: "Creation date", value: "createdAt" },
		{ label: "Last migrated on", value: "lastLoginSystemChange" },
		{ label: "Obsolete since", value: "outdatedSince" },
	];

	const setup = (options: ComponentMountingOptions<typeof DataFilter> = {}) => {
		mockedUseBoardApi.mockReturnValue({
			defaultFilterMenuItems,
			filterChipTitles: ref([{ item: "classes", title: "Class(es) = 1A" }]),
			filterMenuItems: ref([]),
			filterQuery: ref({}),
			isDateFiltering: computed(() => false),
			isSelectFiltering: computed(() => false),
			registrationOptions: {
				student: [],
				teacher: [],
			},
			selectedFilterType: ref("classes"),
			userType: "",
			removeChipFilter: removeChipFilterMock,
			removeFilter: removeFilterMock,
			updateFilter: updateFilterMock,
		});
		return mount(DataFilter, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					FilterDialog: true,
				},
			},
			...options,
		});
	};

	describe("should render the component", () => {
		afterEach(() => {
			vi.clearAllMocks();
		});

		it("should render the component", () => {
			const wrapper = setup({ props: { filterFor: "student" } });
			expect(wrapper.exists()).toBe(true);
			expect(mockedUseBoardApi).toHaveBeenCalledWith("student", expect.any(Object));
		});

		it("should emit 'update:filter' when chip components be closed", async () => {
			const wrapper = setup();
			const filterChipsComponent = wrapper.getComponent({
				name: "FilterChips",
			});
			filterChipsComponent.vm.$emit("remove:filter");

			expect(wrapper.emitted()).toHaveProperty("update:filter");
		});

		it("should emit 'update:filter' when chip components be closed", async () => {
			const wrapper = setup({ props: { filterFor: "student" } });
			const filterChipsComponent = wrapper.getComponent({
				name: "FilterChips",
			});
			await filterChipsComponent.vm.$emit("remove:filter");

			expect(wrapper.emitted()).toHaveProperty("update:filter");
			expect(removeChipFilterMock).toHaveBeenCalled();
		});

		describe("filter dialog", () => {
			it("should set the 'dialogOpen' false when 'close' event be emitted", async () => {
				const wrapper = setup({ props: { filterFor: "student" } });

				const filterDialogComponent = wrapper.getComponent({
					name: "FilterDialog",
				});
				expect(filterDialogComponent.props("isOpen")).toBe(false);
				wrapper.vm.dialogOpen = true;
				await wrapper.vm.$nextTick();

				expect(filterDialogComponent.props("isOpen")).toBe(true);

				await filterDialogComponent.vm.$emit("dialog-closed");

				expect(filterDialogComponent.props("isOpen")).toBe(false);
				expect(wrapper.vm.dialogOpen).toBe(false);
			});

			it("should call updateFilter method", async () => {
				const wrapper = setup({ props: { filterFor: "teacher" } });
				wrapper.vm.dialogOpen = true;

				const filterDialogComponent = wrapper.getComponent({
					name: "FilterDialog",
				});

				await filterDialogComponent.vm.$emit("remove:filter");
				expect(removeFilterMock).toHaveBeenCalled();
			});
		});

		it("should set filter title", () => {
			const wrapper = setup();

			const filterTitleElement = wrapper.find('[data-testid="filter-title"]');

			expect(filterTitleElement.text()).toContain("components.organisms.DataFilter.add");
		});
	});
});
