import { useDataTableFilter } from "./composables/filter.composable";
import DataFilter from "./DataFilter.vue";
import { User } from "./types";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { computed, ref } from "vue";

vi.mock("./composables/filter.composable");

const mockedUseBoardApi = vi.mocked(useDataTableFilter);
describe("@components/DataFilter/DataFilter.vue", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

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
			userType: User.STUDENT,
			removeChipFilter: removeChipFilterMock,
			removeFilter: removeFilterMock,
			updateFilter: updateFilterMock,
		});
		return mount(DataFilter, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});
	};

	describe("should render the component", () => {
		afterEach(() => {
			vi.clearAllMocks();
		});

		it("should render the component", () => {
			const wrapper = setup({ props: { filterFor: User.STUDENT } });
			expect(wrapper.exists()).toBe(true);
			expect(mockedUseBoardApi).toHaveBeenCalledWith(User.STUDENT);
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
			const wrapper = setup({ props: { filterFor: User.STUDENT } });
			const filterChipsComponent = wrapper.getComponent({
				name: "FilterChips",
			});
			await filterChipsComponent.vm.$emit("remove:filter");

			expect(wrapper.emitted()).toHaveProperty("update:filter");
			expect(removeChipFilterMock).toHaveBeenCalled();
		});

		it("should set filter title", () => {
			const wrapper = setup();

			const filterTitleElement = wrapper.find('[data-testid="filter-title"]');

			expect(filterTitleElement.text()).toContain("components.organisms.DataFilter.add");
		});
	});
});
