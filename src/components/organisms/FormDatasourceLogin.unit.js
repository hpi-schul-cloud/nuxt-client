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
				id: validDatasourceId,
				type: "webuntis",
			},
		});
		expect(wrapper.vm.data.config.target).toStrictEqual(
			validDatasourceWebuntis.config.target
		);
		expect(wrapper.vm.id).toStrictEqual(validDatasourceId);
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
					id: validDatasourceId,
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
					id: "someId",
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
					id: "someId",
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

/*
describe("@components/FormNews", () => {
	it(...isValidComponent(FormNews));

	it("converts date correctly", async () => {
		const wrapper = mount(FormNews, {
			...getMocks(),
			propsData: {
				action: "patch",
				news: validNews,
			},
		});
		expect(wrapper.vm.data.date.date).toStrictEqual(validNewsDate.date);
		expect(wrapper.vm.data.date.time).toStrictEqual(validNewsDate.time);
		expect(wrapper.vm.publishDate).toStrictEqual(validNews.displayAt);
	});



	describe("patch", () => {
		it("dispatches patch action on form submit", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,describe("create", () => {
		it("dispatches create action on form submit", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "create",
					news: validNews,
				},
			});
			wrapper.trigger("submit");
			expect(actions.create.called).toBe(true);
			expect(actions.patch.called).toBe(false);
			expect(actions.remove.called).toBe(false);
		});

		it("dispatches create action with target if target query parameter exists", async () => {
			const testTarget = "1234";
			const testTargetModel = "teams";
			const actions = getMockActions();
			const mock = getMocks({
				actions,
				$route: {
					name: "news-id",
					params: {
						id: "randomId",
					},
					query: {
						target: testTarget,
						targetmodel: testTargetModel,
					},
				},
			});
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "create",
					news: validNews,
				},
			});
			wrapper.trigger("submit");
			expect(actions.create.called).toBe(true);
			const { target, targetModel } = actions.create.getCall(0).args[1];
			expect(target).toBe(testTarget);
			expect(targetModel).toBe(testTargetModel);
		});

		it("dispatches create action with target if context query parameter exists", async () => {
			const testTarget = "1234";
			const testTargetModel = "teams";
			const actions = getMockActions();
			const mock = getMocks({
				actions,
				$route: {
					name: "news-id",
					params: {
						id: "randomId",
					},
					query: {
						contextId: testTarget,
						context: testTargetModel,
					},
				},
			});
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "create",
					news: validNews,
				},
			});
			wrapper.trigger("submit");
			expect(actions.create.called).toBe(true);
			const { target, targetModel } = actions.create.getCall(0).args[1];
			expect(target).toBe(testTarget);
			expect(targetModel).toBe(testTargetModel);
		});

		it("shows validation error before submiting", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "create",
					news: invalidNews,
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
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "create",
					news: validNews,
				},
			});
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
				propsData: {
					action: "patch",
					news: validNews,
				},
			});
			wrapper.vm.$toast = { success: sinon.stub() };
			const routerPushSpy = getRouterPushSpy(wrapper, (target) => {
				expect(target.name).toBe("news-id");
			});
			wrapper.trigger("submit");
			expect((await routerPushSpy).called).toBe(true);
			expect(actions.create.called).toBe(false);
			expect(actions.patch.called).toBe(true);
			expect(actions.remove.called).toBe(false);
		});

		it("shows validation error before submiting", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "patch",
					news: invalidNews,
				},
			});
			const toastStubs = { error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;

			wrapper.trigger("submit");
			expect(toastStubs.error.called).toBe(true); // error toast was shown
			expect(actions.patch.called).toBe(false); // and no dispatch happend
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
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "patch",
					news: validNews,
				},
			});
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

	describe("remove", () => {
		it("confirming remove dispatches the news/remove action", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "patch",
					news: validNews,
				},
			});
			const toastStubs = { success: sinon.stub(), error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;
			const routerPushSpy = getRouterPushSpy(wrapper, (target) => {
				expect(target.name).toBe("news");
			});

			await wrapper.vm.confirmRemoveHandler();

			expect(actions.create.called).toBe(false);
			expect(actions.patch.called).toBe(false);
			expect(actions.remove.called).toBe(true);
			expect((await routerPushSpy).called).toBe(true);
			expect(toastStubs.error.called).toBe(false);
			expect(toastStubs.success.called).toBe(true);
		});
		it("shows error toast if remove fails", async () => {
			const errorMessage = "expected error that should be catched";
			const mock = getMocks({
				actions: {
					remove: () => {
						throw new Error(errorMessage);
					},
				},
			});
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "patch",
					news: validNews,
				},
			});
			const toastStubs = { success: sinon.stub(), error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;
			const routerPushSpy = sinon.stub();
			wrapper.vm.$router = { push: routerPushSpy };
			const consoleError = jest.spyOn(console, "error");

			await wrapper.vm.confirmRemoveHandler();

			expect(routerPushSpy.called).toBe(false); // no navigation
			expect(toastStubs.success.called).toBe(false); // or success message
			const errors = consoleError.mock.calls.map((e) => e.toString());
			expect(errors).toContain(`Error: ${errorMessage}`); // but error log
			expect(toastStubs.error.called).toBe(true); // and info toast
		});
	});

	describe("cancle", () => {
		it.skip("triggering the cancel action from the edit page opens a confirm modal", async () => {
			const wrapper = mount(FormNews, {
				...getMocks(),
				propsData: {
					action: "patch",
					news: validNews,
				},
				scopedSlots: {
					actions: `<button type="button" id="cancel" @click.prevent="props.cancel()">cancel</button>`,
				},
			});
			const routerPushSpy = getRouterPushSpy(wrapper, (target) => {
				expect(target.name).toBe("news-id");
			});
			wrapper.find("#cancel").trigger("click");
			expect((await routerPushSpy).called).toBe(true);
		});
		it.skip("triggering the cancel action from the new page opens a confirm modal", async () => {
			const overviewMock = getMocks();
			overviewMock.mocks.$route.params = {};
			const wrapper = mount(FormNews, {
				...overviewMock,
				propsData: {
					action: "patch",
					news: validNews,
				},
				scopedSlots: {
					actions: `<button type="button" id="cancel" @click.prevent="props.cancel()">cancel</button>`,
				},
			});
			const routerPushSpy = getRouterPushSpy(wrapper, (target) => {
				expect(target.name).toBe("news");
			});
			wrapper.find("#cancel").trigger("click");

			expect((await routerPushSpy).called).toBe(true);
		});
		it("confirming cancel navigates back to article", async () => {
			const wrapper = mount(FormNews, {
				...getMocks(),
				propsData: {
					action: "patch",
					news: validNews,
				},
			});
			const toastStubs = { success: sinon.stub(), error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;
			const routerPushSpy = getRouterPushSpy(wrapper, (target) => {
				expect(target.name).toBe("news-id");
			});
			await wrapper.vm.confirmCancelHandler();
			expect((await routerPushSpy).called).toBe(true);
		});
	});
});
*/
