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

const getMockActions = () => ({
	create: sinon.stub().resolves(true),
	patch: sinon.stub().resolves(true),
	remove: sinon.stub().resolves(true),
});

const getMocks = (actions = getMockActions()) =>
	createComponentMocks({
		$route: {
			name: "news-id",
			params: {
				id: "randomId",
			},
			query: {},
		},
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

	it("dispatches create action on form submit", async () => {
		const actions = getMockActions();
		const mock = getMocks(actions);
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

	it("dispatches patch action on form submit", async () => {
		const actions = getMockActions();
		const mock = getMocks(actions);
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

	it("confirming remove dispatches the news/remove action", async () => {
		const actions = getMockActions();
		const mock = getMocks(actions);
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

	it("error toast is shown if remove fails", async () => {
		const errorMessage = "expected error that should be catched";
		const mock = getMocks({
			remove: () => {
				throw new Error(errorMessage);
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
