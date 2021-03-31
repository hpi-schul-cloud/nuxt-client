import { default as TeachersIndex } from "./index.vue";
import mock$objects from "../../../../tests/test-utils/pageStubs";

const testTeachers = [
	{
		_id: "0000d231816abba584714c9e",
		firstName: "Carl",
		lastName: "Cord",
		email: "lehrer@schul-cloud.org",
		classes: [],
		consentStatus: "ok",
		createdAt: "2017-01-01T00:06:37.148Z",
	},
	{
		_id: "0000d231816abba584714c9f",
		firstName: "Max",
		lastName: "Mustermann",
		email: "mustermann@schul-cloud.org",
		classes: [],
		consentStatus: "ok",
		createdAt: "2017-01-01T00:06:37.148Z",
	},
];

describe("teachers/index", () => {
	const deleteUsersStub = jest.fn();
	const mockStore = {
		auth: {
			state: () => ({
				user: {
					permissions: ["TEACHER_DELETE"],
					roles: [],
				},
				school: {},
			}),
		},
		users: {
			getters: {
				list: () => testTeachers,
			},
			actions: {
				deleteUsers: deleteUsersStub,
				handleUsers: jest.fn(),
			},
			state: () => ({
				pagination: {},
				progress: {
					delete: {
						active: false,
						percent: 0,
					},
				},
			}),
		},
		classes: {
			actions: {
				find: () => {
					return { data: [] };
				},
			},
		},
	};

	const mockUiState = {
		// eslint-disable-next-line no-unused-vars
		get: (key, identifier) => {
			const state = {
				pagination: {},
				sorting: {},
				filter: {},
			};
			return state[key];
		},
		// eslint-disable-next-line no-unused-vars
		set: (key, identifier) => {},
	};

	// always confirm
	const mockDialog = {
		confirm: (params) => {
			params.onConfirm();
		},
	};

	it(...isValidComponent(TeachersIndex));

	it("should call 'deleteUsers' action", async () => {
		const wrapper = mount(TeachersIndex, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				uiState: mockUiState,
				dialog: mockDialog,
			}),
		});
		mock$objects(wrapper);

		await wrapper.vm.$nextTick();

		const userRows = wrapper.findAll('[data-testid="table-data-row"]');
		expect(userRows).toHaveLength(2);

		// select first entry
		const checkbox = userRows
			.at(0)
			.find('.selection-column input[type="checkbox"]');
		checkbox.setChecked();

		// open actions menu
		await wrapper.vm.$nextTick();
		const actionsBtn = wrapper.find(
			".row-selection-info .actions button:first-child"
		);
		actionsBtn.trigger("click");
		await wrapper.vm.$nextTick();

		// click delete menu button
		const deleteBtn = wrapper
			.findAll(".row-selection-info .context-menu button")
			.at(2);
		deleteBtn.trigger("click");

		expect(deleteUsersStub.mock.calls).toHaveLength(1);
		expect(deleteUsersStub.mock.calls[0][1]).toStrictEqual({
			ids: [testTeachers[0]._id],
			userType: "teacher",
		});
	});
});
