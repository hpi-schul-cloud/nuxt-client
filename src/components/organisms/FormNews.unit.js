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
	create: sinon.stub(),
	patch: sinon.stub(),
	remove: sinon.stub(),
});

const getMocks = (actions = getMockActions()) =>
	createComponentMocks({
		router: {
			routes: [
				{
					path: "/news/:id",
					name: "news-id",
					component: {},
				},
			],
		},
		$route: {
			name: "news-id",
			params: {
				id: "randomId",
			},
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

		wrapper.trigger("submit");
		expect(actions.create.called).toBe(false);
		expect(actions.patch.called).toBe(true);
		expect(actions.remove.called).toBe(false);
	});

	/*
		it("navigates back to article when cancel action gets triggered from slot on edit page", async () => {
		const mocks = getMocks();
		delete mocks.router;
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
		const spy = sinon.stub();
		const routerPushMock = (target) => {
			spy(target);
			expect(target.name).toBe("news-id");
			expect(target.params.id).toBe("randomId");
		};
		wrapper.vm.$router.push = routerPushMock;
		wrapper.find("#cancel").trigger("click");

		expect(spy.called).toBe(true);
	});
	*/

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
});
