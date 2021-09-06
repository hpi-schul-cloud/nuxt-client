import {
	homeworks,
	openHomeworks,
	completedHomeworks,
	submittedHomeworks,
	gradedHomeworks,
	openHomeworksWithDueDate,
	openHomeworksWithoutDueDate,
	overDueHomeworks,
	coursesStudent,
	coursesTeacher,
	mathHomeworks,
	homeworksTeacher,
	overDueHomeworksTeacher,
	noDueDateHomeworksTeacher,
	dueDateHomeworksTeacher,
} from "@@/stories/mockData/Homeworks";
import storeModule from "./homeworks";

describe("store/homeworks", () => {
	describe("actions", () => {
		const spyCommit = jest.fn();
		const ctxMock = {
			commit: spyCommit,
		};

		describe("getAllHomeworks", () => {
			it("should call the right endpoint", async () => {
				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
						return { data: [] };
					},
				};

				await storeModule.actions.getAllHomeworks(ctxMock);
				expect(spyCommit.mock.calls).toHaveLength(4);
				expect(spyCommit.mock.calls[2][0]).toBe("setHomeworks");
				expect(receivedRequests[0].url).toStrictEqual("/v3/tasks/");
			});

			it("should set business error and reset loading on fail", async () => {
				const mockAxiosError = new Error();
				mockAxiosError.response = {
					data: {
						error: "error",
						message: "error message",
						statusCode: 404,
					},
				};

				storeModule.actions.$axios = {
					$get: async () => {
						throw mockAxiosError;
					},
				};

				spyCommit.mockClear();
				await storeModule.actions.getAllHomeworks(ctxMock);

				const storeCalls = spyCommit.mock.calls;
				const firstCall = storeCalls[0];
				const secondCall = storeCalls[1];
				const thirdCall = storeCalls[2];
				const fourthCall = storeCalls[3];

				expect(firstCall[0]).toBe("resetBusinessError");
				expect(secondCall[0]).toBe("setStatus");
				expect(thirdCall[0]).toBe("setBusinessError");
				expect(fourthCall[0]).toBe("setStatus");

				const secondCommit = secondCall[1];
				const thirdCommit = thirdCall[1];
				const fourthCommit = fourthCall[1];

				expect(secondCommit).toBe("pending");
				expect(thirdCommit).toBe(mockAxiosError.response.data);
				expect(fourthCommit).toBe("error");
			});

			it("should set loading state when fetching homeworks", async () => {
				const receivedRequests = [];

				storeModule.actions.$axios = {
					$get: async (url, params) => {
						receivedRequests.push({ url, params });
						return { data: [] };
					},
				};
				spyCommit.mockClear();
				await storeModule.actions.getAllHomeworks(ctxMock);

				const storeCalls = spyCommit.mock.calls;

				const secondCall = storeCalls[1];
				const fourthCall = storeCalls[3];
				expect(secondCall[0]).toBe("setStatus");
				expect(fourthCall[0]).toBe("setStatus");

				const secondCommit = secondCall[1];
				const fourthCommit = fourthCall[1];
				expect(secondCommit).toBe("pending");
				expect(fourthCommit).toBe("completed");
			});
		});
	});

	describe("mutations", () => {
		describe("setHomeworks", () => {
			it("Should set homeworks in state", () => {
				const { setHomeworks } = storeModule.mutations;
				const state = {
					homeworks: [],
				};
				setHomeworks(state, homeworks);
				expect(state.homeworks).toStrictEqual(homeworks);
			});
		});

		describe("setFilter", () => {
			it("Should set course filter in state", () => {
				const { setFilter } = storeModule.mutations;
				const state = {
					courseFilter: [],
				};
				setFilter(state, coursesTeacher);
				expect(state.courseFilter).toStrictEqual(coursesTeacher);
			});
		});

		describe("setStatus", () => {
			it("Should set status in state", () => {
				const { setStatus } = storeModule.mutations;
				const state = {
					status: "",
				};
				setStatus(state, "pending");
				expect(state.status).toStrictEqual("pending");
			});
		});

		describe("setBusinessError", () => {
			it("Should set business error in state", () => {
				const { setBusinessError } = storeModule.mutations;
				const state = {
					businessError: {},
				};
				setBusinessError(state, {
					statusCode: "404",
					message: "404 - Can't find page",
				});
				expect(state.businessError).toStrictEqual({
					statusCode: "404",
					message: "404 - Can't find page",
				});
			});
		});

		describe("resetBusinessError", () => {
			it("Should reset business error in state", () => {
				const { resetBusinessError } = storeModule.mutations;
				const state = {
					businessError: {},
				};
				resetBusinessError(state);
				expect(state.businessError).toStrictEqual({
					statusCode: "",
					message: "",
				});
			});
		});
	});

	describe("getters", () => {
		const studentState = {
			homeworks,
			status: "completed",
			courseFilter: [],
		};
		const teacherState = {
			homeworks: homeworksTeacher,
			status: "completed",
			courseFilter: [],
		};
		const teacherStateWithFilter = {
			homeworks: homeworksTeacher,
			status: "completed",
			courseFilter: ["Mathe"],
		};
		const { getters } = storeModule;

		describe("getHomeworks", () => {
			it("Should return all homeworks", () => {
				expect(getters.getHomeworks(studentState)).toStrictEqual(homeworks);
			});
		});

		describe("getStatus", () => {
			it("Should return status", () => {
				expect(getters.getStatus(studentState)).toStrictEqual("completed");
			});
		});

		describe("hasNoHomeworks", () => {
			it("Should return true, if it's loaded and there are no homeworks", () => {
				expect(getters.hasNoHomeworks(studentState)).toBe(false);
			});
		});

		describe("hasOpenHomeworks", () => {
			it("Should return true, if it's loaded and there are open (neither submitted nor graded) homeworks", () => {
				const mockGetter = { getOpenHomeworks: openHomeworks };
				expect(getters.hasOpenHomeworks(studentState, mockGetter)).toBe(true);
			});
		});

		describe("hasCompletedHomeworks", () => {
			it("Should return true, if it's loaded and there are completed homeworks", () => {
				const mockGetter = { getCompletedHomeworks: completedHomeworks };
				expect(getters.hasCompletedHomeworks(studentState, mockGetter)).toBe(
					true
				);
			});
		});

		describe("getOpenHomeworksForStudent", () => {
			it("Should have properties for sub sets", () => {
				expect(getters.getOpenHomeworksForStudent(studentState)).toHaveProperty(
					"overdue"
				);
				expect(getters.getOpenHomeworksForStudent(studentState)).toHaveProperty(
					"noDueDate"
				);
				expect(getters.getOpenHomeworksForStudent(studentState)).toHaveProperty(
					"withDueDate"
				);
			});

			it("Should have homeworks with due date", () => {
				expect(
					getters.getOpenHomeworksForStudent(studentState).withDueDate
				).toHaveLength(openHomeworksWithDueDate.length);
			});

			it("Should have homeworks with no due date", () => {
				expect(
					getters.getOpenHomeworksForStudent(studentState).noDueDate
				).toHaveLength(openHomeworksWithoutDueDate.length);
			});

			it("Should have overdue homeworks", () => {
				expect(
					getters.getOpenHomeworksForStudent(studentState).overdue
				).toHaveLength(overDueHomeworks.length);
			});
		});

		describe("getOpenHomeworksForTeacher", () => {
			it("Should have properties for sub sets", () => {
				expect(getters.getOpenHomeworksForTeacher(teacherState)).toHaveProperty(
					"overdue"
				);
				expect(getters.getOpenHomeworksForTeacher(teacherState)).toHaveProperty(
					"noDueDate"
				);
				expect(getters.getOpenHomeworksForTeacher(teacherState)).toHaveProperty(
					"withDueDate"
				);
			});

			it("Should have homeworks with due date", () => {
				expect(
					getters.getOpenHomeworksForTeacher(teacherState).withDueDate
				).toHaveLength(dueDateHomeworksTeacher.length);
			});

			it("Should have homeworks with no due date", () => {
				expect(
					getters.getOpenHomeworksForTeacher(teacherState).noDueDate
				).toHaveLength(noDueDateHomeworksTeacher.length);
			});

			it("Should have overdue homeworks", () => {
				expect(
					getters.getOpenHomeworksForTeacher(teacherState).overdue
				).toHaveLength(overDueHomeworksTeacher.length);
			});

			it("Should correctly filter homeworks", () => {
				const filteredHomeworks = getters.getOpenHomeworksForTeacher(
					teacherStateWithFilter
				);

				expect(
					filteredHomeworks.overdue
						.concat(filteredHomeworks.noDueDate)
						.concat(filteredHomeworks.withDueDate)
				).toHaveLength(mathHomeworks.length);
			});
		});

		describe("getCompletedHomeworksForStudent", () => {
			it("Should have properties for sub sets", () => {
				expect(
					getters.getCompletedHomeworksForStudent(studentState)
				).toHaveProperty("submitted");
				expect(
					getters.getCompletedHomeworksForStudent(studentState)
				).toHaveProperty("graded");
			});

			it("Should have all homeworks, that are submitted", () => {
				expect(
					getters.getCompletedHomeworksForStudent(studentState).submitted
				).toStrictEqual(submittedHomeworks);
			});

			it("Should have all homeworks, that are graded", () => {
				expect(
					getters.getCompletedHomeworksForStudent(studentState).graded
				).toStrictEqual(gradedHomeworks);
			});
		});

		describe("getCourses", () => {
			it("Should return all relevant courses", () => {
				expect(getters.getCourses(studentState)).toStrictEqual(coursesStudent);
			});
		});

		describe("getCoursesOpen", () => {
			it("Should return all relevant open courses", () => {
				const mockGetter = {
					getHomeworks: openHomeworks,
				};
				expect(getters.getCoursesOpen(studentState, mockGetter)).toStrictEqual(
					coursesOpen
				);
			});
		});

		describe("getCoursesCompleted", () => {
			it("Should return all relevant completed courses", () => {
				const mockGetter = {
					getHomeworks: completedHomeworks,
				};
				expect(
					getters.getCoursesCompleted(studentState, mockGetter)
				).toStrictEqual(coursesCompleted);
			});
		});
	});
});
