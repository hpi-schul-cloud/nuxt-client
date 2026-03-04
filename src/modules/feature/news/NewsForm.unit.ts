import ClassicEditor from "../editor/ClassicEditor.vue";
import { DATETIME_FORMAT, fromInputDateTime } from "@/plugins/datetime";
import { useI18nGlobal } from "@/plugins/i18n";
import { NewsResponse } from "@/serverApi/v3";
import { Status } from "@/store/types/commons";
import { newsResponseFactory } from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { NewsForm } from "@feature-news";
import { createTestingPinia } from "@pinia/testing";
import { DatePicker } from "@ui-date-time-picker";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { Dayjs } from "dayjs";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { nextTick } from "vue";
import { VBtn, VForm, VMessages, VTextField } from "vuetify/components";

const date = "2022-07-05";
const time = "11:00";
const testDate = fromInputDateTime(date, time) as unknown as Dayjs;

const classicEditorMock = {
	template: "<div></div>",
	methods: {
		focus: vi.fn(),
	},
};

vi.mock("@/plugins/i18n");
(useI18nGlobal as Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("@ui-confirmation-dialog");

describe("NewsForm", () => {
	let wrapper: VueWrapper<InstanceType<typeof NewsForm>>;
	let askConfirmationMock: Mock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		askConfirmationMock = vi.fn();

		setupConfirmationComposableMock({
			askConfirmationMock,
		});
	});

	const setup = (options?: Partial<{ status: Status; news: NewsResponse | undefined; showDeleteButton: boolean }>) => {
		const currentNews = newsResponseFactory.build({ displayAt: testDate.toISOString() });
		const { news, status, showDeleteButton } = {
			news: currentNews,
			status: "completed" as Status,
			showDeleteButton: false,
			...options,
		};

		wrapper = mount(NewsForm, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					ClassicEditor: classicEditorMock,
					ConfirmationDialog: true,
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

		expect(wrapper.findComponent(NewsForm).exists()).toBe(true);
	});

	it("should pass date and time to input fields", () => {
		const { wrapper } = setup();

		const dateInput = wrapper.findComponent(DatePicker);

		expect(dateInput.props("date")).toStrictEqual(testDate.format(DATETIME_FORMAT.inputDate));

		const timeInput = wrapper.find("[data-testid='news_time']").findComponent(VTextField);
		expect(timeInput.props("modelValue")).toStrictEqual(testDate.format(DATETIME_FORMAT.inputTime));
	});

	it("should set time to 00:00 when date is set but time is empty", async () => {
		const { wrapper } = setup({ news: newsResponseFactory.build({ displayAt: undefined }) });

		const dateInput = wrapper.findComponent(DatePicker);
		dateInput.vm.$emit("update:date", "2022-07-05");
		await nextTick();

		const timeInput = wrapper.find("[data-testid='news_time']").findComponent(VTextField);
		expect(timeInput.props("modelValue")).toBe("00:00");
	});

	describe("onSave", () => {
		describe("invalid form", () => {
			it("should show validation error on empty title and focus title", async () => {
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

			it("should not emit save event on empty title", async () => {
				const { wrapper } = setup();

				const titleInput = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
				await titleInput.setValue("");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(wrapper.emitted()).not.toHaveProperty("save");
			});

			it("should show validation error on empty content and call editor focus method", async () => {
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

			it("should not emit save event on empty content", async () => {
				const { wrapper } = setup();

				const contentInput = wrapper.findComponent(ClassicEditor);
				await contentInput.setValue("");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(wrapper.emitted()).not.toHaveProperty("save");
			});

			it("should show validation error on invalid time format and focus time input", async () => {
				const { wrapper } = setup();

				const timeInput = wrapper.find("[data-testid='news_time']").findComponent(VTextField);
				await timeInput.setValue("33:33");
				await nextTick();

				await wrapper.findComponent(VForm).trigger("submit");
				await flushPromises();

				expect(timeInput.text()).toContain("components.timePicker.validation.format");
				expect(document.activeElement).toEqual(timeInput.find("input").element);
			});

			it("should not emit save event on invalid time format", async () => {
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

	describe("onDelete", () => {
		const getDeleteButton = (wrapper: VueWrapper) =>
			wrapper.findAllComponents(VBtn).find((btn) => btn.props("text") === "common.actions.delete");

		it("should show delete button when showDeleteButton prop is true", async () => {
			const { wrapper } = setup({ showDeleteButton: true });

			const deleteButton = getDeleteButton(wrapper);

			expect(deleteButton?.exists()).toBe(true);
		});

		it("should not show delete button when showDeleteButton prop is false", async () => {
			const { wrapper } = setup({ showDeleteButton: false });

			const deleteButton = getDeleteButton(wrapper);

			expect(deleteButton).toBeUndefined();
		});

		it("should not emit delete event on delete button click when deletion cancelled", async () => {
			askConfirmationMock.mockResolvedValue(false);
			const { wrapper } = setup({ showDeleteButton: true });

			const deleteButton = getDeleteButton(wrapper);
			await deleteButton?.trigger("click");
			await flushPromises();

			expect(wrapper.emitted()).not.toHaveProperty("delete");
		});

		it("should emit delete event on delete button click when deletion confirmed", async () => {
			askConfirmationMock.mockResolvedValue(true);
			const { wrapper } = setup({ showDeleteButton: true });

			const deleteButton = getDeleteButton(wrapper);
			await deleteButton?.trigger("click");
			await flushPromises();

			expect(wrapper.emitted()).toHaveProperty("delete");
			expect(wrapper.emitted().delete).toHaveLength(1);
			expect(askConfirmationMock).toHaveBeenCalledWith({
				message: "components.organisms.FormNews.remove.confirm.message",
				confirmActionLangKey: "components.organisms.FormNews.remove.confirm.confirm",
			});
		});
	});

	describe("onCancel", () => {
		const getCancelButton = (wrapper: VueWrapper) =>
			wrapper.findAllComponents(VBtn).find((btn) => btn.props("text") === "common.actions.discard");

		it("should emit cancel event on cancel button click when cancel is confirmed", async () => {
			askConfirmationMock.mockResolvedValue(true);
			const { wrapper } = setup();

			const cancelButton = getCancelButton(wrapper);
			await cancelButton?.trigger("click");
			await flushPromises();

			expect(wrapper.emitted()).toHaveProperty("cancel");
			expect(wrapper.emitted().cancel).toHaveLength(1);
			expect(askConfirmationMock).toHaveBeenCalledWith({
				message: "components.organisms.FormNews.cancel.confirm.title",
				confirmActionLangKey: "components.organisms.FormNews.cancel.confirm.confirm",
			});
		});

		it("should not emit cancel event on cancel button click when cancellation is cancelled", async () => {
			askConfirmationMock.mockResolvedValue(false);
			const { wrapper } = setup();

			const cancelButton = getCancelButton(wrapper);
			await cancelButton?.trigger("click");
			await flushPromises();

			expect(wrapper.emitted()).not.toHaveProperty("cancel");
		});
	});

	describe("validation", () => {
		describe("title validation", () => {
			it("should show error message when title contains < sign directly followed by a string", async () => {
				const { wrapper } = setup();
				await nextTick();

				const titleInput = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
				await titleInput.setValue("<abc123");
				await flushPromises();

				expect(titleInput.text()).toContain("common.validation.containsOpeningTag");
			});

			it("should show error message when title is empty", async () => {
				const { wrapper } = setup();

				const titleInput = wrapper.find("[data-testid='news_title']").findComponent(VTextField);
				await titleInput.setValue("");
				await flushPromises();

				expect(titleInput.text()).toContain("components.organisms.FormNews.errors.missing_title");
			});
		});

		describe("content validation", () => {
			it("should show error message when content is empty", async () => {
				const { wrapper } = setup();

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

			it("should not show error message when content is not empty", async () => {
				const { wrapper } = setup();

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
			it("should show error message when time is in wrong format", async () => {
				const { wrapper } = setup();

				const timeInput = wrapper.find("[data-testid='news_time']").findComponent(VTextField);
				await timeInput.setValue("33:33");
				await flushPromises();

				expect(timeInput.text()).toContain("components.timePicker.validation.format");
			});
		});
	});
});
