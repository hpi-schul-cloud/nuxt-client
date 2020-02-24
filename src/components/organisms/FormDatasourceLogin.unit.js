import FormDatasourceLogin from "./FormDatasourceLogin";
import flushPromises from "flush-promises";

const validDatasourceId = "1ee231aef2d213e3";

const validDatasourceWebuntis = {
	name: "test",
	schoolId: "023823420023842342034",
	config: {
		target: "webuntis",
		username: "Affe",
		password: "serrcuree",
		url: "test.de",
	},
};
/*
const invalidNews = {
	name: "", // no title
	schoolId: "", // no schoolId
	config: {}, // and no config
};*/

const slotInputs = [
	`<base-input
		slot-scope="config"
		v-model="config.username"
		type="text"
		label="Benutzername"
		:placeholder="'WebUntis Nutzername'"
		class="mt--md"
	/>`,
	`<base-input
		slot-scope="config"
		v-model="config.password"
		type="password"
		label="Passwort"
		:placeholder="'WebUntis Passwort'"
		class="mt--md"
	/>`,
	`<base-input
		slot-scope="config"
		v-model="config.url"
		required="true"
		type="text"
		label="URL"
		:placeholder="'erato.webuntis.com'"
		class="mt--md"
	/>`,
];

const getMockActions = () => ({
	get: sinon
		.stub()
		.withArgs(validDatasourceId)
		.returns(validDatasourceWebuntis),
	create: sinon.stub().resolves(true),
	patch: sinon.stub().resolves(true),
});

const getMocks = ({ actions = getMockActions() } = {}) =>
	createComponentMocks({
		i18n: true,
		user: true,
		store: {
			datasources: {
				actions,
			},
		},
		scopedSlots: {
			inputs: slotInputs,
		},
	});
/*
const getRouterPushSpy = (wrapper, expects) => {
	return new Promise((resolve) => {
		const routerPushSpy = sinon.stub();
		const routerPushMock = (target) => {
			routerPushSpy(target);
			expects(target);
			resolve(routerPushSpy);
		};
		wrapper.vm.$router = { push: routerPushMock };
	});
};
*/
describe("@components/FormDatasourceLogin", () => {
	it(...isValidComponent(FormDatasourceLogin));

	it("converts date correctly", async () => {
		const wrapper = mount(FormDatasourceLogin, {
			...getMocks(),
			propsData: {
				datasourceId: validDatasourceId,
				type: "webuntis",
			},
		});
		expect(wrapper.vm.data.config.target).toStrictEqual(
			validDatasourceWebuntis.config.target
		);
		expect(wrapper.vm.datasourceId).toStrictEqual(validDatasourceId);
		expect(wrapper.vm.actionType).toStrictEqual("patch");
	});

	describe("get", () => {
		it("dispatches get action on form init", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormDatasourceLogin, {
				...mock,
				propsData: {
					type: "webuntis",
					datasourceId: validDatasourceId,
				},
			});

			await flushPromises();
			expect(wrapper.vm.data).toStrictEqual(validDatasourceWebuntis);
		});
	});

	describe("create", () => {
		it("dispatches create action on form submit", () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormDatasourceLogin, {
				...mock,
				propsData: {
					type: "webuntis",
				},
			});
			const nameInput = wrapper.find('input[name="name"]');
			expect(nameInput.exists()).toBe(true);
			nameInput.setValue("webunits Course");
			wrapper.trigger("submit");
			expect(wrapper.vm.actionType).toStrictEqual("create");
			expect(actions.create.called).toBe(true);
			expect(actions.patch.called).toBe(false);
		});

		it("shows validation error before submiting", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormDatasourceLogin, {
				...mock,
				propsData: {
					action: "create",
					type: "ldap",
				},
			});
			const toastStubs = { error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;

			wrapper.trigger("submit");
			expect(toastStubs.error.called).toBe(true); // error toast was shown
			expect(actions.create.called).toBe(false); // and no dispatch happend
		});

		it("shows error toast if create fails", async () => {
			const errorMessage = "expected error that should be catched";
			const mock = getMocks({
				actions: {
					create: () => {
						throw new Error(errorMessage);
					},
				},
			});
			const wrapper = mount(FormDatasourceLogin, {
				...mock,
				propsData: {
					type: "webuntis",
				},
			});

			const nameInput = wrapper.find('input[name="name"]');
			nameInput.setValue("all courses");

			const toastStubs = { success: sinon.stub(), error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;
			const consoleError = jest.spyOn(console, "error").mockImplementation();

			wrapper.trigger("submit");
			expect(toastStubs.success.called).toBe(false); // no success message expected
			const errors = consoleError.mock.calls.map((e) => e.toString());
			expect(errors).toContain(`Error: ${errorMessage}`); // but error log
			expect(toastStubs.error.called).toBe(true); // and info toast
		});
	});

	describe("patch", () => {
		it("dispatches patch action on form submit", () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormDatasourceLogin, {
				...mock,
				propsData: {
					datasourceId: "someId",
					type: "webuntis",
				},
			});
			const nameInput = wrapper.find('input[name="name"]');
			expect(nameInput.exists()).toBe(true);
			nameInput.setValue("webunits Course");
			expect(wrapper.vm.actionType).toStrictEqual("patch");
			wrapper.trigger("submit");
			expect(actions.create.called).toBe(false);
			expect(actions.patch.called).toBe(true);
		});

		it("shows validation error before submiting", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormDatasourceLogin, {
				...mock,
				propsData: {
					action: "patch",
					id: "someId",
					type: "ldap",
				},
			});
			const toastStubs = { error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;

			wrapper.trigger("submit");
			expect(toastStubs.error.called).toBe(true);
			expect(actions.patch.called).toBe(false);
		});

		it("shows error toast if patch fails", async () => {
			const errorMessage = "expected error that should be catched";
			const mock = getMocks({
				actions: {
					patch: () => {
						throw new Error(errorMessage);
					},
				},
			});
			const wrapper = mount(FormDatasourceLogin, {
				...mock,
				propsData: {
					datasourceId: "someId",
					type: "webuntis",
				},
			});

			const nameInput = wrapper.find('input[name="name"]');
			nameInput.setValue("all courses");

			const toastStubs = { success: sinon.stub(), error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;
			const consoleError = jest.spyOn(console, "error").mockImplementation();

			wrapper.trigger("submit");
			expect(toastStubs.success.called).toBe(false); // no success message expected
			const errors = consoleError.mock.calls.map((e) => e.toString());
			expect(errors).toContain(`Error: ${errorMessage}`); // but error log
			expect(toastStubs.error.called).toBe(true); // and info toast
		});
	});
});
