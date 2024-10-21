import { mount } from "@vue/test-utils";
import FormNews from "./FormNews.vue";
import { notifierModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { DATETIME_FORMAT } from "@/plugins/datetime";
import dayjs from "dayjs";
import setupStores from "@@/tests/test-utils/setupStores";
import { createStore } from "vuex";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

const testDate = dayjs("2022-07-05T09:00:00.000Z");

type News = {
	title: string;
	content: string;
	displayAt?: string;
};

const testNews: News = {
	title: "Hi",
	content: "lalaland",
	displayAt: `${testDate.toISOString()}`,
};

const $store = createStore({
	modules: {
		news: {
			state: "",
			mutations: {},
			actions: {},
			getters: {
				getStatus: () => "completed",
			},
		},
	},
});

const $route = {
	name: "news-id",
	params: {
		id: "randomId",
	},
	query: {},
};

describe("FormNews", () => {
	const setup = (news: News) => {
		const wrapper = mount(FormNews, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$route,
					$store,
				},
				stubs: ["base-input", "base-dialog"],
			},
			props: {
				news,
			},
		});

		return { wrapper };
	};

	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
			notifierModule: NotifierModule,
		});
	});

	it("should render component", () => {
		const { wrapper } = setup(testNews);
		expect(wrapper.findComponent(FormNews).exists()).toBe(true);
	});

	it("passes date and time to input fields", async () => {
		const { wrapper } = setup(testNews);

		const dateInput = wrapper.find('[data-testid="news_date"]');

		expect(dateInput.attributes("modelvalue")).toStrictEqual(
			testDate.format(DATETIME_FORMAT.inputDate)
		);

		const timeInput = wrapper.find('[data-testid="news_time"]');
		expect(timeInput.attributes("modelvalue")).toStrictEqual(
			testDate.format(DATETIME_FORMAT.inputTime)
		);
	});

	describe("save", () => {
		it("emits save event on submit with correct payload", async () => {
			const { wrapper } = setup({ ...testNews });

			wrapper.find("form").trigger("submit");
			await wrapper.vm.$nextTick();

			expect(wrapper.emitted()).toHaveProperty("save");

			const saveEventPayload = wrapper.emitted("save")?.at(0)?.[0];
			expect(saveEventPayload).toMatchObject(testNews);
		});

		it("shows validation error on empty title", async () => {
			const notifierMock = vi.spyOn(notifierModule, "show");

			const { wrapper } = setup({ ...testNews, title: "" });

			wrapper.find("form").trigger("submit");
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});

		it("shows validation error on empty content", async () => {
			const notifierMock = vi.spyOn(notifierModule, "show");

			const { wrapper } = setup({ ...testNews, content: "" });

			wrapper.find("form").trigger("submit");
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});

		it("does not emit save event on empty title", async () => {
			const { wrapper } = setup({ ...testNews, title: "" });

			wrapper.find("form").trigger("submit");

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toBeUndefined();
		});

		it("does not emit save event on empty content", async () => {
			const { wrapper } = setup({ ...testNews, content: "" });

			wrapper.find("form").trigger("submit");

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toBeUndefined();
		});
	});
});
