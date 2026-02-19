import ClassicEditor from "../editor/ClassicEditor.vue";
import FormNews from "./FormNews.vue";
import { DATETIME_FORMAT, fromInputDateTime } from "@/plugins/datetime";
import { Status } from "@/store/types/commons";
import { News } from "@/store/types/news";
import { expectNotification, newsResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { DatePicker } from "@ui-date-time-picker";
import { mount, VueWrapper } from "@vue/test-utils";
import { Dayjs } from "dayjs";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VForm, VTextField } from "vuetify/components";

const date = "2022-07-05";
const time = "11:00";
const testDate = fromInputDateTime(date, time) as unknown as Dayjs;

const $route = {
	name: "news-id",
	params: {
		id: "randomId",
	},
	query: {},
};

describe("FormNews", () => {
	const setup = (options?: Partial<{ status: Status; news: News | null; showDeleteButton: boolean }>) => {
		const currentNews = newsResponseFactory.build({ displayAt: testDate.toISOString() });
		const { news, status, showDeleteButton } = {
			news: currentNews,
			status: "completed" as Status,
			showDeleteButton: false,
			...options,
		};

		const wrapper = mount(FormNews, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$route,
				},
				stubs: {
					ClassicEditor: true,
				},
			},
			props: {
				title: news?.title ?? "",
				content: news?.content ?? "",
				displayAt: news?.displayAt ?? undefined,
				status: status ?? "",
				showDeleteButton: showDeleteButton ?? false,
			},
		});

		return { wrapper, news };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("should render component", () => {
		const { wrapper } = setup();

		expect(wrapper.findComponent(FormNews).exists()).toBe(true);
	});

	it("passes date and time to input fields", () => {
		const { wrapper } = setup();

		const dateInput = wrapper.findComponent(DatePicker);

		expect(dateInput.props("date")).toStrictEqual(testDate.format(DATETIME_FORMAT.inputDate));

		const timeInput = wrapper.findComponent("[data-testid='news_time']") as VueWrapper<VTextField>;
		expect(timeInput.props("modelValue")).toStrictEqual(testDate.format(DATETIME_FORMAT.inputTime));
	});

	describe("save", () => {
		it("emits save event on submit with correct payload", async () => {
			const { wrapper, news } = setup();

			await wrapper.findComponent(VForm).trigger("submit");

			expect(wrapper.emitted()).toHaveProperty("save");
			expect(wrapper.emitted().save).toHaveLength(1);
			expect(wrapper.emitted().save[0]).toEqual([
				{ title: news?.title, content: news?.content, displayAt: news?.displayAt },
			]);
		});

		it("shows validation error on empty title", async () => {
			const { wrapper } = setup();

			const titleInput = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
			await titleInput.setValue("");
			await nextTick();

			await wrapper.find("form").trigger("submit");
			expectNotification("error");
		});

		it("shows validation error on empty content", async () => {
			const { wrapper } = setup();
			const contentInput = wrapper.findComponent(ClassicEditor);
			await contentInput.setValue("");
			await nextTick();

			await wrapper.find("form").trigger("submit");
			expectNotification("error");
		});

		it("does not emit save event on empty title", async () => {
			const { wrapper } = setup();

			const titleInput = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
			await titleInput.setValue("");
			await nextTick();

			await wrapper.find("form").trigger("submit");

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toBeUndefined();
		});

		it("does not emit save event on empty content", async () => {
			const { wrapper } = setup();

			const contentInput = wrapper.findComponent(ClassicEditor);
			await contentInput.setValue("");
			await nextTick();

			await wrapper.find("form").trigger("submit");

			const emitted = wrapper.emitted();
			expect(emitted["save"]).toBeUndefined();
		});
	});

	describe("when title contains < sign directly followed by a string", () => {
		it("shows contain error hint", async () => {
			const { wrapper } = setup();
			await nextTick();

			const textField = wrapper.findComponent(VTextField);
			await textField.setValue("<abc123");
			await nextTick();

			expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
		});
	});
});
