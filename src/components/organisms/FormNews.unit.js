import FormNews from "./FormNews";
import { createInputDateTime } from "@plugins/datetime";
import dayjs from "dayjs";

const testDate = dayjs("2022-07-05T09:00:00.000Z");

const [date, time] = createInputDateTime(testDate.utc());

const validNews = {
	title: "Hi",
	content: "lalaland",
	displayAt: `${testDate.toISOString()}`,
};

const validNewsDate = {
	date,
	time,
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
				getters: {
					getStatus: () => "completed",
				},
			},
		},
	});

describe("@components/organisms/FormNews", () => {
	it("converts date correctly", async () => {
		const mocks = getMocks();
		const wrapper = mount(FormNews, {
			...mocks,
			propsData: {
				news: { ...validNews },
			},
		});
		expect(wrapper.vm.data.date.date).toStrictEqual(validNewsDate.date);
		expect(wrapper.vm.data.date.time).toStrictEqual(validNewsDate.time);

		expect(wrapper.vm.displayAt).toStrictEqual(validNews.displayAt);
	});

	describe("save", () => {
		it("emits save event on form submit", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					news: { ...validNews },
				},
			});
			wrapper.trigger("submit");
			await wrapper.vm.$nextTick();
			const events = wrapper.emitted();
			expect(events.save).toHaveLength(1);
			const saveEventPayload = events.save[0][0];
			expect(saveEventPayload).toMatchObject(validNews);
		});

		it("shows validation error before submiting", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					news: invalidNews,
				},
			});
			const toastStubs = { error: jest.fn() };
			wrapper.vm.$toast = toastStubs;

			wrapper.trigger("submit");
			expect(toastStubs.error.mock.calls).toHaveLength(1); // error toast was shown
			expect(actions.create.mock.calls).toHaveLength(0); // and no dispatch happend
		});
	});

	describe.skip("remove", () => {
		it("confirming remove dispatches the news/remove action", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					news: { ...validNews },
				},
			});

			await wrapper.vm.remove();

			expect(actions.create.mock.calls).toHaveLength(0);
			expect(actions.patch.mock.calls).toHaveLength(0);
			expect(actions.remove.mock.calls).toHaveLength(1);
			expect((await routerPushSpy).mock.calls).toHaveLength(1);
			expect(toastStubs.error.mock.calls).toHaveLength(0);
			expect(toastStubs.success.mock.calls).toHaveLength(1);
		});
	});
});
