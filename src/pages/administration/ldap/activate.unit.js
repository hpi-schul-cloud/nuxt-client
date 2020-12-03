import { default as ldapActivate } from "./activate.vue";

const mockResponseData = {
	ok: true,
	users: {
		total: 8,
		admin: 2,
		teacher: 2,
		student: 4,
		sample: {
			email: "alice.daniel@schul-cloud.org",
			firstName: "Alice",
			lastName: "Daniel",
			roles: ["student"],
			ldapDn: "uid=alice.daniel,ou=users,dc=schul-cloud,dc=org",
			ldapUUID: "MTIwMQ==",
			ldapUID: "alice.daniel",
			modifyTimestamp: "20190802121825Z",
		},
	},
	classes: {
		total: 3,
		sample: {
			className: "Klassen",
			ldapDn: "ou=classes,ou=groups,dc=schul-cloud,dc=org",
			modifyTimestamp: "20190712131016Z",
		},
	},
};
const $route = {
	query: {
		id: "mockId",
	},
};

describe("ldap/activate", () => {
	const routerPushStub = jest.fn();
	const submitStub = jest.fn();

	const mockStore = {
		auth: {
			state: () => ({
				user: {
					permissions: ["ADMIN_VIEW", "SCHOOL_EDIT"],
				},
			}),
		},
		"ldap-config": {
			actions: {
				patchData: submitStub,
			},
			state: () => ({
				verified: mockResponseData,
				submitted: mockResponseData,
			}),
		},
	};

	it(...isValidComponent(ldapActivate));

	it("should redirect if no verified data", async () => {
		const customMockStore = { ...mockStore };
		customMockStore["ldap-config"].state = () => ({
			verified: {},
			submitted: mockResponseData,
		});
		mount(ldapActivate, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$router: { push: routerPushStub },
			}),
		});
		expect(routerPushStub).toHaveBeenCalled();
	});

	it("should push to router when clicking the back button", async () => {
		const wrapper = mount(ldapActivate, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				$router: { push: routerPushStub },
			}),
		});
		const backBtn = wrapper.find(`[data-testid="ldapBackButton"]`);
		expect(backBtn.exists()).toBe(true);
		backBtn.trigger("click");

		expect(routerPushStub).toHaveBeenCalled();
	});

	it("should call 'submitData' action when submit button is clicked", async () => {
		const wrapper = mount(ldapActivate, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				$router: { push: routerPushStub },
				$route,
			}),
		});
		const submitBtn = wrapper.find(`[data-testid="ldapSubmitButton"]`);
		expect(submitBtn.exists()).toBe(true);
		submitBtn.trigger("click");

		expect(submitStub).toHaveBeenCalled();
	});

	it(" should push to router if submitted.ok is false", async () => {
		const customMockStore = { ...mockStore };
		customMockStore["ldap-config"].state = () => ({
			verified: mockResponseData,
			submitted: { ...mockResponseData, ok: false },
		});
		const wrapper = mount(ldapActivate, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$router: { push: routerPushStub },
			}),
		});
		const submitBtn = wrapper.find(`[data-testid="ldapSubmitButton"]`);
		expect(submitBtn.exists()).toBe(true);
		submitBtn.trigger("click");

		expect(routerPushStub).toHaveBeenCalled();
	});

	it("should render confirm modal component", async () => {
		const wrapper = mount(ldapActivate, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				$router: { push: routerPushStub },
			}),
		});
		const confirmModal = wrapper.find(`[data-testid="confirmModal"]`);
		expect(confirmModal.exists()).toBe(true);
	});

	it("should push to router when clicking the ok button in the modal ", async () => {
		const customMockStore = { ...mockStore };
		customMockStore["ldap-config"].state = () => ({
			verified: mockResponseData,
			submitted: { ...mockResponseData, ok: true },
		});
		const wrapper = mount(ldapActivate, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$router: { push: routerPushStub },
			}),
		});
		const confirmBtn = wrapper.find(`[data-testid="ldapOkButton"]`);
		expect(confirmBtn.exists()).toBe(true);
		confirmBtn.trigger("click");

		expect(routerPushStub).toHaveBeenCalled();
	});
});
