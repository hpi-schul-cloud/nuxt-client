import { default as StudentPage } from "./index.vue";

describe("students/index", () => {
	const mockStore = {
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
						query: "__vue_devtool_nan__",
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

	it(...isValidComponent(StudentPage));

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
				store: mockStore,
			}),
		});

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(false);
	});
});
