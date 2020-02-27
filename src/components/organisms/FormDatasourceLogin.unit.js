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
	get: jest.fn().mockReturnValue(Promise.resolve(validDatasourceWebuntis)),
	create: jest.fn().mockReturnValue(Promise.resolve()),
	patch: jest.fn().mockReturnValue(Promise.resolve()),
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
			expect(actions.create.mock.calls).toHaveLength(1);
			expect(actions.patch.mock.calls).toHaveLength(0);
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
			const toastStubs = { error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			wrapper.trigger("submit");
			expect(toastStubs.error.mock.calls).toHaveLength(1); // error toast was shown
			expect(actions.create.mock.calls).toHaveLength(0); // and no dispatch happend
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

			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;
			const consoleError = jest.spyOn(console, "error").mockImplementation();

			wrapper.trigger("submit");
			expect(toastStubs.success.mock.calls).toHaveLength(0); // no success message expected
			const errors = consoleError.mock.calls.map((e) => e.toString());
			expect(errors).toContain(`Error: ${errorMessage}`); // but error log
			expect(toastStubs.error.mock.calls).toHaveLength(1); // and info toast
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
			expect(actions.create.mock.calls).toHaveLength(0);
			expect(actions.patch.mock.calls).toHaveLength(1);
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
			const toastStubs = { error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			wrapper.trigger("submit");
			expect(toastStubs.error.mock.calls).toHaveLength(1);
			expect(actions.patch.mock.calls).toHaveLength(0);
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

			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;
			const consoleError = jest.spyOn(console, "error").mockImplementation();

			wrapper.trigger("submit");
			expect(toastStubs.success.mock.calls).toHaveLength(0); // no success message expected
			const errors = consoleError.mock.calls.map((e) => e.toString());
			expect(errors).toContain(`Error: ${errorMessage}`); // but error log
			expect(toastStubs.error.mock.calls).toHaveLength(1); // and info toast
		});
	});
});
