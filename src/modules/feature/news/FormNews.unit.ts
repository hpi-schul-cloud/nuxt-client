import ClassicEditor from "../editor/ClassicEditor.vue";
import FormNews from "./FormNews.vue";
import { DATETIME_FORMAT, fromInputDateTime } from "@/plugins/datetime";
import { useI18nGlobal } from "@/plugins/i18n";
import { Status } from "@/store/types/commons";
import { News } from "@/store/types/news";
import { newsResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { DatePicker } from "@ui-date-time-picker";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { Dayjs } from "dayjs";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { nextTick } from "vue";
import { VForm, VMessages, VTextField } from "vuetify/components";

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
const classicEditorMock = {
	template: "<div></div>",
	methods: {
		focus: vi.fn(),
	},
};

vi.mock("@/plugins/i18n");
(useI18nGlobal as Mock).mockReturnValue({ t: (key: string) => key });

describe("FormNews", () => {
	let wrapper: VueWrapper<InstanceType<typeof FormNews>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (options?: Partial<{ status: Status; news: News | null; showDeleteButton: boolean }>) => {
		const currentNews = newsResponseFactory.build({ displayAt: testDate.toISOString() });
		const { news, status, showDeleteButton } = {
			news: currentNews,
			status: "completed" as Status,
			showDeleteButton: false,
			...options,
		};

		wrapper = mount(FormNews, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$route,
				},
				stubs: {
					ClassicEditor: classicEditorMock,
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

	afterEach(() => {
		vi.clearAllMocks();
		wrapper.unmount();
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
		describe("invalid form", () => {
			it("shows validation error on empty title and focus title", async () => {
				const { wrapper } = setup();
				await nextTick();

				const titleField = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
				await titleField.setValue("");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(titleField.text()).toContain("components.organisms.FormNews.errors.missing_title");
				expect(document.activeElement).toEqual(titleField.find("input").element);
			});

			it("does not emit save event on empty title", async () => {
				const { wrapper } = setup();

				const titleInput = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
				await titleInput.setValue("");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(wrapper.emitted()).not.toHaveProperty("save");
			});

			it("shows validation error on empty content and call editor focus method", async () => {
				const { wrapper } = setup();

				const contentInput = wrapper.findComponent(ClassicEditor);
				await contentInput.setValue("");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				const errorMessages = wrapper.get('[id="news-content-error"]');
				expect(errorMessages.text()).toBe("components.organisms.FormNews.errors.missing_content");
				expect(classicEditorMock.methods.focus).toHaveBeenCalled();
			});

			it("does not emit save event on empty content", async () => {
				const { wrapper } = setup();

				const contentInput = wrapper.findComponent(ClassicEditor);
				await contentInput.setValue("");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(wrapper.emitted()).not.toHaveProperty("save");
			});

			it("shows validation error on invalid time format and focus time input", async () => {
				const { wrapper } = setup();

				const timeInput = wrapper.find("[data-testid='news_time']").findComponent(VTextField);
				await timeInput.setValue("33:33");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(timeInput.text()).toContain("components.timePicker.validation.format");
				expect(document.activeElement).toEqual(timeInput.find("input").element);
			});

			it("does not emit save event on invalid time format", async () => {
				const { wrapper } = setup();

				const timeInput = wrapper.find("[data-testid='news_time']").findComponent(VTextField);
				await timeInput.setValue("33:33");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(wrapper.emitted()).not.toHaveProperty("save");
			});
		});

		describe("valid form", () => {
			it("emits save event on submit with correct payload", async () => {
				const { wrapper, news } = setup();
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(wrapper.emitted()).toHaveProperty("save");
				expect(wrapper.emitted().save).toHaveLength(1);
				expect(wrapper.emitted().save[0]).toEqual([
					{ title: news?.title, content: news?.content, displayAt: news?.displayAt },
				]);
			});
		});
	});

	describe("validation", () => {
		describe("title validation", () => {
			it("show error message when title contains < sign directly followed by a string", async () => {
				const { wrapper } = setup();
				await nextTick();

				const titleInput = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
				await titleInput.setValue("<abc123");
				await flushPromises();

				expect(titleInput.text()).toContain("common.validation.containsOpeningTag");
			});

			it("show error message when title is empty", async () => {
				const { wrapper } = setup();
				await nextTick();

				const titleInput = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
				await titleInput.setValue("");
				await flushPromises();

				expect(titleInput.text()).toContain("components.organisms.FormNews.errors.missing_title");
			});
		});

		describe("content validation", () => {
			it("show error message when content is empty", async () => {
				const { wrapper } = setup();
				await nextTick();

				const contentInput = wrapper.findComponent(ClassicEditor);
				await contentInput.setValue("");
				await contentInput.trigger("blur");
				await flushPromises();

				const errorMessages = wrapper
					.findAllComponents(VMessages)
					.find((msg) => msg.attributes("id") === "news-content-error");

				expect(errorMessages?.text()).toBe("components.organisms.FormNews.errors.missing_content");
				expect(errorMessages?.props("active")).toBe(true);
			});

			it("does not show error message when content is not empty", async () => {
				const { wrapper } = setup();
				await nextTick();

				const contentInput = wrapper.findComponent(ClassicEditor);
				await contentInput.setValue("Some content");
				await contentInput.trigger("blur");
				await flushPromises();

				const errorMessages = wrapper
					.findAllComponents(VMessages)
					.find((msg) => msg.attributes("id") === "news-content-error");

				expect(errorMessages?.props("active")).toBe(false);
				expect(errorMessages?.text()).toBe("");
			});
		});

		describe("time input validation", () => {
			it("shows error message when time is in wrong format", async () => {
				const { wrapper } = setup();
				await nextTick();

				const timeInput = wrapper.find("[data-testid='news_time']").findComponent(VTextField);
				await timeInput.setValue("33:33");
				await flushPromises();

				expect(timeInput.text()).toContain("components.timePicker.validation.format");
			});
		});
	});
});
