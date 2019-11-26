import FormNews from "./FormNews";

const validNews = {
	title: "Hi",
	content: "lalaland",
	displayAt: "2019-11-05T13:07:00.000Z",
};
const validNewsDate = {
	date: "2019-11-05",
	time: "14:07", // +1h because of utc conversion
};
const invalidNews = {
	title: "", // no title
	content: "", // and no content
};

const getMockActions = () => ({
	create: sinon.stub().resolves(true),
	patch: sinon.stub().resolves(true),
	remove: sinon.stub().resolves(true),
});

const getMocks = ({
	actions = getMockActions(),
	$route = {
		name: "news-id",
		params: {
			id: "randomId",
		},
		query: {},
	},
} = {}) =>
	createComponentMocks({
		$route,
		i18n: true,
		user: true,
		stubs: {
			BaseInput: true,
		},
		store: {
			news: {
				actions,
			},
		},
	});

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

describe("@components/FormNews", () => {
	it(...isValidComponent(FormNews));

	it("converts date correctly", async () => {
		const wrapper = shallowMount(FormNews, {
			...getMocks(),
			propsData: {
				action: "patch",
				news: validNews,
			},
		});
		expect(wrapper.vm.data.date.date).toEqual(validNewsDate.date);
		expect(wrapper.vm.data.date.time).toEqual(validNewsDate.time);
		expect(wrapper.vm.publishDate).toEqual(validNews.displayAt);
	});

	describe("create", () => {
		it("dispatches create action on form submit", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = shallowMount(FormNews, {
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
			const wrapper = shallowMount(FormNews, {
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
			const wrapper = shallowMount(FormNews, {
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
			const wrapper = shallowMount(FormNews, {
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
			const wrapper = shallowMount(FormNews, {
				...mock,
				propsData: {
					action: "create",
					news: validNews,
				},
			});
			const toastStubs = { success: sinon.stub(), error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;
			let errorOutput = "";
			console.error = jest.fn((inputs) => (errorOutput += inputs));

			wrapper.trigger("submit");
			expect(toastStubs.success.called).toBe(false); // no success message expected
			expect(errorOutput.includes(errorMessage)).toBe(true); // but error log
			expect(toastStubs.error.called).toBe(true); // and info toast
		});
	});

	describe("patch", () => {
		it("dispatches patch action on form submit", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = shallowMount(FormNews, {
				...mock,
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
			const wrapper = shallowMount(FormNews, {
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
			const wrapper = shallowMount(FormNews, {
				...mock,
				propsData: {
					action: "patch",
					news: validNews,
				},
			});
			const toastStubs = { success: sinon.stub(), error: sinon.stub() };
			wrapper.vm.$toast = toastStubs;
			let errorOutput = "";
			console.error = jest.fn((inputs) => (errorOutput += inputs));

			wrapper.trigger("submit");
			expect(toastStubs.success.called).toBe(false); // no success message expected
			expect(errorOutput.includes(errorMessage)).toBe(true); // but error log
			expect(toastStubs.error.called).toBe(true); // and info toast
		});
	});

	describe("remove", () => {
		it("confirming remove dispatches the news/remove action", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = shallowMount(FormNews, {
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
			const wrapper = shallowMount(FormNews, {
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
			let errorOutput = "";
			console.error = jest.fn((inputs) => (errorOutput += inputs));

			await wrapper.vm.confirmRemoveHandler();

			expect(routerPushSpy.called).toBe(false); // no navigation
			expect(toastStubs.success.called).toBe(false); // or success message
			expect(errorOutput.includes(errorMessage)).toBe(true); // but error log
			expect(toastStubs.error.called).toBe(true); // and info toast
		});
	});

	describe("cancle", () => {
		it("navigates back to article when cancel action gets triggered from slot on edit page", async () => {
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

		it("navigates back to overview when cancel action gets triggered from slot on new page", async () => {
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
	});
});
