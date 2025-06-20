import coursesStore from "./courses";
import NotifierModule from "@/store/notifier";
import { notifierModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";

describe("courses store", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		setupStores({ notifierModule: NotifierModule });
	});
	describe("removeCourseItem action", () => {
		const dispatch = vi.fn();

		const storeContext = {
			dispatch,
		};
		coursesStore.actions.app = {
			i18n: {
				t: vi.fn(),
			},
		};

		afterEach(() => {
			dispatch.mockReset();
		});

		it("should call dispatch under 'homeworks/remove' action if courseItem is a homework", () => {
			// given
			const courseItem = {
				type: "homework",
			};

			// when
			coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(dispatch).toHaveBeenCalledWith(
				"homeworks/remove",
				undefined,
				expect.any(Object)
			);
		});

		it("should call dispatch with proper courseItem id when item is a homework", () => {
			// given
			const homeworkId = "123";
			const courseItem = {
				type: "homework",
				id: homeworkId,
			};

			// when
			coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(dispatch).toHaveBeenCalledWith(
				expect.any(String),
				homeworkId,
				expect.any(Object)
			);
		});

		it("should call dispatch with { root: true } argument when item is a lesson", () => {
			// given
			const courseItem = {
				type: "lesson",
			};

			// when
			coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(dispatch).toHaveBeenCalledWith(
				expect.any(String),
				undefined,
				expect.objectContaining({
					root: true,
				})
			);
		});

		it("should call dispatch under 'lessons/remove' action if courseItem is a lesson", () => {
			// given
			const courseItem = {
				type: "lesson",
			};

			// when
			coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(dispatch).toHaveBeenCalledWith(
				"lessons/remove",
				undefined,
				expect.any(Object)
			);
		});

		it("should call dispatch with proper courseItem id when item is a lesson", () => {
			// given
			const homeworkId = "123";
			const courseItem = {
				type: "lesson",
				id: homeworkId,
			};

			// when
			coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(dispatch).toHaveBeenCalledWith(
				expect.any(String),
				homeworkId,
				expect.any(Object)
			);
		});

		it("should call dispatch with { root: true } argument when item is a homework", () => {
			// given
			const courseItem = {
				type: "homework",
			};

			// when
			coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(dispatch).toHaveBeenCalledWith(
				expect.any(String),
				undefined,
				expect.objectContaining({
					root: true,
				})
			);
		});

		it("should call toast successful if no error is thrown when courseItem is a homework", async () => {
			const notifierMock = vi.spyOn(notifierModule, "show");
			// given
			const courseItem = {
				type: "homework",
			};
			dispatch.mockReturnValue(Promise.resolve());

			// when
			await coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("success");
		});

		it("should call toast successful if no error is thrown when courseItem is a lesson", async () => {
			const notifierMock = vi.spyOn(notifierModule, "show");
			// given
			const courseItem = {
				type: "lesson",
			};
			dispatch.mockReturnValue(Promise.resolve());

			// when
			await coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("success");
		});

		it("should call toast error if error is thrown from dispatched action when courseItem is a homework", async () => {
			const notifierMock = vi.spyOn(notifierModule, "show");
			// given
			const courseItem = {
				type: "homework",
			};
			dispatch.mockReturnValue(Promise.reject());

			// when
			await coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});

		it("should call toast error if error is thrown from dispatched action when courseItem is a lesson", async () => {
			const notifierMock = vi.spyOn(notifierModule, "show");
			// given
			const courseItem = {
				type: "lesson",
			};
			dispatch.mockReturnValue(Promise.reject());

			// when
			await coursesStore.actions.removeCourseItem(storeContext, courseItem);

			// then
			expect(notifierMock).toHaveBeenCalled();
			expect(notifierMock.mock.calls[0][0].status).toStrictEqual("error");
		});
	});
});
