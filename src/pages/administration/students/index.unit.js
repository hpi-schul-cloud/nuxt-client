import { default as StudentPage } from "./index.vue";

const mockData = [
	{
		firstName: "Marla",
		lastName: "Mathe",
		email: "schueler@schul-cloud.org",
		birthday: "01.01.2000",
	},
	{
		firstName: "Waldemar",
		lastName: "Wunderlich",
		birthday: "01.01.1989",
		email: "waldemar.wunderlich@schul-cloud.org",
	},
];

describe("students/index", () => {
	const handleUsersStub = jest.fn();
	let mockStore;

	beforeEach(() => {
		jest.useFakeTimers();

		mockStore = {
			auth: {
				state: () => ({
					user: {
						roles: [
							{
								name: "administrator",
							},
						],
						permissions: ["STUDENT_CREATE"],
					},
					school: {
						isExternal: false,
					},
				}),
			},
			users: {
				actions: {
					handleUsers: handleUsersStub,
				},
				getters: {
					list: () => mockData,
				},
				state: () => ({
					list: mockData,
					pagination: {
						default: {
							limit: 25,
							skip: 0,
							total: 2,
							query: "",
						},
					},
				}),
			},
			uiState: {
				getters: {
					get: () => () => ({ page: 1 }),
				},
				mutations: {
					set: jest.fn(),
				},
			},
		};
	});

	it(...isValidComponent(StudentPage));

	it("should dispatch the 'handleUsers action on load'", async () => {
		mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		expect(handleUsersStub).toHaveBeenCalled();
	});

	it("should display the same number of elements as in the mockData object", async () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const table = wrapper.find(`[data-testid="students_table"]`);
		expect(table.vm.data).toHaveLength(mockData.length);
	});

	it("should render the fab-floating component if user has SUDENT_CREATE permission", async () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(true);
	});

	it("should not render the fab-floating component if user does not have SUDENT_CREATE permission", async () => {
		const customMockStore = { ...mockStore };
		customMockStore.auth.state = () => ({
			user: {
				roles: [
					{
						name: "administrator",
					},
				],
			},
			school: {
				isExternal: false,
			},
		});
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
			}),
		});

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(false);
	});

	it("should not render the fab-floating component if isExternal is true", async () => {
		const customMockStore = { ...mockStore };
		customMockStore.auth.state = () => ({
			user: {
				roles: [
					{
						name: "administrator",
						permissions: ["STUDENT_CREATE"],
					},
				],
			},
			school: {
				isExternal: true,
			},
		});

		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
			}),
		});
		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(false);
	});

	it("should render the adminTableLegend component when school is external", async () => {
		const customMockStore = { ...mockStore };
		customMockStore.auth.state = () => ({
			user: {
				roles: [
					{
						name: "administrator",
						permissions: ["STUDENT_CREATE"],
					},
				],
			},
			school: {
				isExternal: true,
			},
		});

		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
			}),
		});
		const externalHint = wrapper.find(".external-sync-hint");

		expect(externalHint.exists()).toBe(true);
	});

	it("should not render the adminTableLegend component when school is not external", async () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const externalHint = wrapper.find(".external-sync-hint");

		expect(externalHint.exists()).toBe(false);
	});

	it("should call barSearch method when searchbar component's value change", async () => {
		//const barSearch = jest.fn();
		//StudentPage.methods.barSearch = barSearch;
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const searchBarInput = wrapper.find(`input[data-testid="searchbar"]`);
		expect(searchBarInput.exists()).toBe(true);

		//TODO: explain that
		// expect(mockStore.users.actions.handleUsers.mock.calls).toHaveLength(1);

		//searchBarInput.vm.$emit("update:vmodel", "abc");
		searchBarInput.setValue("abc");
		expect(mockStore.uiState.mutations.set.mock.calls).toHaveLength(1);
		await jest.runAllTimers();
		//TODO: explain that
		// expect(mockStore.users.actions.handleUsers.mock.calls).toHaveLength(3);
	});
});
