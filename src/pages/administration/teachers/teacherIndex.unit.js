import { default as TeacherPage } from "./index.vue";

describe("Teacher/index", () => {
	let mockStore;

	// const teacherData = [
	// 	{
	// 		_id: "0000d231816abba584714c9e",
	// 		firstName: "Cord",
	// 		lastName: "Carl",
	// 		email: "lehrer@schul-cloud.org",
	// 		createdAt: "2017-01-01T00:06:37.148Z",
	// 		birthday: "01.01.1977",
	// 		preferences: {},
	// 		consentStatus: "missing",
	// 		classes: [],
	// 	},
	// ];

	beforeEach(() => {
		mockStore = {
			auth: {
				state: () => ({
					user: {
						roles: [
							{
								name: "administrator",
							},
						],
						permissions: ["TEACHER_CREATE"],
					},
					school: {
						isExternal: false,
					},
				}),
			},
			users: {
				actions: {
					handleUsers: jest.fn(),
				},
				getters: {
					list: () => [],
				},
				state: () => ({
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
			},
		};
	});

	it(...isValidComponent(TeacherPage));

	it("should render the fab-floating component if user has TEACHER_CREATE permission", async () => {
		const wrapper = mount(TeacherPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_teachers_table"]`
		);
		expect(fabComponent.exists()).toBe(true);
	});

	it("should not render the fab-floating component if user does not have TEACHER_CREATE permission", async () => {
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
				isExternal: true,
			},
		});
		const wrapper = mount(TeacherPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		const fabComponent = wrapper.find(".external-sync-hint");
		expect(fabComponent.exists()).toBe(true);
	});

	it("should not render the fab-floating component if isExternal is true", async () => {
		const customMockStore = { ...mockStore };
		customMockStore.auth.state = () => ({
			user: {
				roles: [
					{
						name: "administrator",
						permissions: ["TEACHERCREATE"],
					},
				],
			},
			school: {
				isExternal: true,
			},
		});

		const wrapper = mount(TeacherPage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
			}),
		});
		const fabComponent = wrapper.find(
			`[data-testid="fab_button_teachers_table"]`
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
						permissions: ["TEACHER_CREATE"],
					},
				],
			},
			school: {
				isExternal: true,
			},
		});

		const wrapper = mount(TeacherPage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
			}),
		});
		const externalHint = wrapper.find(".external-sync-hint");

		expect(externalHint.exists()).toBe(true);
	});

	it("should not render the adminTableLegend component when school is not external", async () => {
		const wrapper = mount(TeacherPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		const externalHint = wrapper.find(`.external-sync-hint`);
		expect(externalHint.exists()).toBe(false);
	});

	it("should call barSearch method when searchbar component's value change", async () => {
		const barSearch = jest.fn();
		TeacherPage.methods.barSearch = barSearch;
		// TeacherPage.methods.barSearch = () => {
		// 	console.log("mock reached");
		// 	// barSearch();
		// };
		const wrapper = mount(TeacherPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		// console.log(wrapper.html());
		const searchBarInput = wrapper.find(`[data-testid="searchbar"]`);
		expect(searchBarInput.exists()).toBe(true);
		// console.log(searchBarInput.html());
		// searchBarInput.vmodel = "abc";
		searchBarInput.vm.$emit("update:vmodel", "abc");

		expect(barSearch).toHaveBeenCalled();
	});
});
