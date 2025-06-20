import { DATETIME_FORMAT, fromInputDateTime } from "@/plugins/datetime";
import { notifierModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import { Dayjs } from "dayjs";
import { nextTick } from "vue";
import { createStore } from "vuex";
import FormNews from "./FormNews.vue";
import { News } from "@/store/types/news";

const date = "2022-07-05";
const time = "11:00";
const testDate = fromInputDateTime(date, time) as unknown as Dayjs;

type NewsPayload = {
	title: string;
	content: string;
	displayAt: string;
	date: { date: string; time: string };
};

const testNewsPayload: NewsPayload = {
	title: "Hi",
	content: "lalaland",
	displayAt: testDate.toISOString(),
	date: {
		date: "2022-07-05",
		time: "11:00",
	},
};

const testNews: News = {
	...testNewsPayload,
	id: "",
	createdAt: "",
	creator: {
		id: "",
		firstName: "",
		lastName: "",
	},
	school: {
		id: "",
		name: "",
	},
	targetId: "",
	targetModel: "",
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
				stubs: {
					"base-input": true,
					"base-dialog": true,
					ClassicEditor: true,
				},
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

			await wrapper.find("form").trigger("submit");

			expect(wrapper.emitted()).toHaveProperty("save");
			expect(wrapper.emitted().save).toHaveLength(1);
			expect(wrapper.emitted().save[0]).toEqual([testNewsPayload]);
		});

		it("shows validation error on empty title", async () => {
			const notifierMock = vi.spyOn(notifierModule, "show");

			const { wrapper } = setup({ ...testNews, title: "" });

			await wrapper.find("form").trigger("submit");
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});

		it("shows validation error on empty content", async () => {
			const notifierMock = vi.spyOn(notifierModule, "show");

			const { wrapper } = setup({ ...testNews, content: "" });

			await wrapper.find("form").trigger("submit");
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});

		it("does not emit save event on empty title", async () => {
			const { wrapper } = setup({ ...testNews, title: "" });

			await wrapper.find("form").trigger("submit");

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toBeUndefined();
		});

		it("does not emit save event on empty content", async () => {
			const { wrapper } = setup({ ...testNews, content: "" });

			await wrapper.find("form").trigger("submit");

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toBeUndefined();
		});
	});

	describe("when title contains < sign directly followed by a string", () => {
		it("shows contain error hint", async () => {
			const { wrapper } = setup(testNews);

			const textField = wrapper.findComponent({ name: "VTextField" });
			await textField.setValue("<abc123");
			await nextTick();

			expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
		});
	});
});
