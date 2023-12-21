import Vue from "vue";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import FormNews from "./FormNews.vue";
import { notifierModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { DATETIME_FORMAT } from "@/plugins/datetime";
import dayjs from "dayjs";
import setupStores from "@@/tests/test-utils/setupStores";
import { I18N_KEY } from "@/utils/inject";

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

describe("FormNews", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (news: News) => {
		wrapper = mount(FormNews as MountOptions<Vue>, {
			...createComponentMocks({
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
						state: "",
						mutations: {},
						actions: {},
						getters: {
							getStatus: () => "completed",
						},
					},
				},
			}),
			propsData: {
				news: news,
			},
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});
	};

	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
			notifierModule: NotifierModule,
		});
	});

	it("should render component", () => {
		setup(testNews);
		expect(wrapper.findComponent(FormNews).exists()).toBe(true);
	});

	it("passes date and time to input fields", async () => {
		setup(testNews);

		const dateInput = wrapper.find('[data-testid="news_date"]');
		expect(dateInput.attributes("vmodel")).toStrictEqual(
			testDate.format(DATETIME_FORMAT.inputDate)
		);

		const timeInput = wrapper.find('[data-testid="news_time"]');
		expect(timeInput.attributes("vmodel")).toStrictEqual(
			testDate.format(DATETIME_FORMAT.inputTime)
		);
	});

	describe("save", () => {
		it("emits save event on submit with correct payload", async () => {
			setup({ ...testNews });

			wrapper.find("form").trigger("submit");
			await wrapper.vm.$nextTick();

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toHaveLength(1);

			if (emitted["save"] === undefined) {
				throw new Error("Emitted should be defined");
			}

			const saveEventPayload = emitted["save"][0][0];
			expect(saveEventPayload).toMatchObject(testNews);
		});

		it("shows validation error on empty title", async () => {
			const notifierMock = jest.spyOn(notifierModule, "show");

			setup({ ...testNews, title: "" });

			wrapper.find("form").trigger("submit");
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});

		it("shows validation error on empty content", async () => {
			const notifierMock = jest.spyOn(notifierModule, "show");

			setup({ ...testNews, content: "" });

			wrapper.find("form").trigger("submit");
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});

		it("does not emit save event on empty title", async () => {
			setup({ ...testNews, title: "" });

			wrapper.find("form").trigger("submit");

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toBeUndefined();
		});

		it("does not emit save event on empty content", async () => {
			setup({ ...testNews, content: "" });

			wrapper.find("form").trigger("submit");

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toBeUndefined();
		});
	});
});
