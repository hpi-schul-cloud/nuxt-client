import FormNews from "./FormNews";

const validNews = {
	title: "Hi",
	content: "lalaland",
	date: {
		date: undefined,
		time: undefined,
	},
};

const getMockActions = () => ({
	create: sinon.stub(),
	patch: sinon.stub(),
	remove: sinon.stub(),
});

const getMocks = (actions) =>
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
	it("dispatches cancel action when triggered from slot", async () => {
		const actions = getMockActions();
		const mock = getMocks(actions);
		const wrapper = mount(FormNews, {
			...mock,
			propsData: {
				action: "patch",
				news: validNews,
			},
			scopedSlots: {
				actions: `<button type="button" id="cancel" @click.prevent="props.cancel()">cancel</button>`,
			},
		});

		const cancelBtn = wrapper.find("#cancel");
		cancelBtn.trigger("click");
		expect(actions.create.called).toBe(false);
		expect(actions.patch.called).toBe(false);
		expect(actions.remove.called).toBe(false);
	});
	*/
});
