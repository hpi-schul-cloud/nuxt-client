import { default as TeacherPage } from "./index.vue";

describe("Teacher/index", () => {
	let mockStore;

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
				isExternal: false,
			},
		});
		const wrapper = mount(TeacherPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_teachers_table"]`
		);
		expect(fabComponent.exists()).toBe(false);
	});
});
