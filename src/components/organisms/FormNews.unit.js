import FormNews from "./FormNews";

const validNews = {
	title: "Hi",
	content: "lalaland",
	displayAt: "2019-11-05T13:07:00.000Z",
};

const timezoneOffset = new Date().getTimezoneOffset() / 60;
const validNewsDate = {
	date: "2019-11-05",
	time: `${13 - timezoneOffset}:07`, // timezone conversion
};
const invalidNews = {
	title: "", // no title
	content: "", // and no content
};

const getMockActions = () => ({
	create: jest.fn().mockReturnValue(Promise.resolve()),
	patch: jest.fn().mockReturnValue(Promise.resolve()),
	remove: jest.fn().mockReturnValue(Promise.resolve()),
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
		const routerPushSpy = jest.fn();
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

	describe("create", () => {
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
			expect(actions.create.mock.calls).toHaveLength(1);
			expect(actions.patch.mock.calls).toHaveLength(0);
			expect(actions.remove.mock.calls).toHaveLength(0);
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
			expect(actions.create.mock.calls).toHaveLength(1);
			const { target, targetModel } = actions.create.mock.calls[0][1];
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
			expect(actions.create.mock.calls).toHaveLength(1);
			const { target, targetModel } = actions.create.mock.calls[0][1];
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
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "create",
					news: validNews,
				},
			});
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
		it("dispatches patch action on form submit", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					action: "patch",
					news: validNews,
				},
			});
			wrapper.vm.$toast = { success: jest.fn() };
			const routerPushSpy = getRouterPushSpy(wrapper, (target) => {
				expect(target.name).toBe("news-id");
			});
			wrapper.trigger("submit");
			expect((await routerPushSpy).mock.calls).toHaveLength(1);
			expect(actions.create.mock.calls).toHaveLength(0);
			expect(actions.patch.mock.calls).toHaveLength(1);
			expect(actions.remove.mock.calls).toHaveLength(0);
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
			const toastStubs = { error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			wrapper.trigger("submit");
			expect(toastStubs.error.mock.calls).toHaveLength(1); // error toast was shown
			expect(actions.patch.mock.calls).toHaveLength(0); // and no dispatch happend
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
			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;
			const routerPushSpy = getRouterPushSpy(wrapper, (target) => {
				expect(target.name).toBe("news");
			});

			await wrapper.vm.confirmRemoveHandler();

			expect(actions.create.mock.calls).toHaveLength(0);
			expect(actions.patch.mock.calls).toHaveLength(0);
			expect(actions.remove.mock.calls).toHaveLength(1);
			expect((await routerPushSpy).mock.calls).toHaveLength(1);
			expect(toastStubs.error.mock.calls).toHaveLength(0);
			expect(toastStubs.success.mock.calls).toHaveLength(1);
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
			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;
			const routerPushSpy = jest.fn();
			wrapper.vm.$router = { push: routerPushSpy };
			const consoleError = jest.spyOn(console, "error");

			await wrapper.vm.confirmRemoveHandler();

			expect(routerPushSpy.mock.calls).toHaveLength(0); // no navigation
			expect(toastStubs.success.mock.calls).toHaveLength(0); // or success message
			const errors = consoleError.mock.calls.map((e) => e.toString());
			expect(errors).toContain(`Error: ${errorMessage}`); // but error log
			expect(toastStubs.error.mock.calls).toHaveLength(1); // and info toast
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
			expect((await routerPushSpy).mock.calls).toHaveLength(1);
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

			expect((await routerPushSpy).mock.calls).toHaveLength(1);
		});
		it("confirming cancel navigates back to article", async () => {
			const wrapper = mount(FormNews, {
				...getMocks(),
				propsData: {
					action: "patch",
					news: validNews,
				},
			});
			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;
			const routerPushSpy = getRouterPushSpy(wrapper, (target) => {
				expect(target.name).toBe("news-id");
			});
			await wrapper.vm.confirmCancelHandler();
			expect((await routerPushSpy).mock.calls).toHaveLength(1);
		});
	});
});
