import FormNews from "./FormNews";
import { notifierModule } from "@/store";
import { DATETIME_FORMAT } from "@/plugins/datetime";
import dayjs from "dayjs";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";

const testDate = dayjs("2022-07-05T09:00:00.000Z");

const date = testDate.format(DATETIME_FORMAT.inputDate);
const time = testDate.format(DATETIME_FORMAT.inputTime);

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

describe("@/components/organisms/FormNews", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
			notifierModule: NotifierModule,
		});
		jest.clearAllMocks();
	});

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
			wrapper.find("form").trigger("submit");
			await wrapper.vm.$nextTick();
			const events = wrapper.emitted();
			expect(events.save).toHaveLength(1);
			const saveEventPayload = events.save[0][0];
			expect(saveEventPayload).toMatchObject(validNews);
		});

		it("shows validation error before submiting", async () => {
			const notifierMock = jest.spyOn(notifierModule, "show");

			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormNews, {
				...mock,
				propsData: {
					news: invalidNews,
				},
			});

			wrapper.find("form").trigger("submit");
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
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
		});
	});
});
