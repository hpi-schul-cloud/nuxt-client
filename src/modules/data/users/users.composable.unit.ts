import { useUsers } from "./users.composable";
import { RoleName } from "@/serverApi/v3";
import { initializeAxios } from "@/utils/api";
import {
	expectNotification,
	mockAxiosInstance,
	userCreationDataFactory,
	userResponseFactory,
} from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn(() => ({
			t: vi.fn((key: string) => key),
		})),
	};
});

describe("useUsers", () => {
	let axiosMock: Mocked<AxiosInstance>;
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchUsers", () => {
		const userResponseList = userResponseFactory.buildList(2);
		beforeEach(() => {
			axiosMock.get.mockResolvedValueOnce({
				data: {
					data: userResponseList,
					limit: 10,
					skip: 0,
					total: 2,
				},
			});
		});

		it("should fetch and update the user list and paginations for students", async () => {
			const { fetchUsers, userList, pagination } = useUsers(RoleName.Student);
			await fetchUsers({ $limit: 10, $skip: 0, $sort: {} });

			expect(axiosMock.get).toHaveBeenCalledWith("/v3/users/admin/students", {
				params: { $limit: 10, $skip: 0, $sort: {} },
			});
			expect(userList.value).toEqual(userResponseList);
			expect(pagination.value).toEqual({ limit: 10, skip: 0, total: 2 });
		});

		it("should fetch and update the user list and paginations for teachers", async () => {
			const { fetchUsers, userList, pagination } = useUsers(RoleName.Teacher);
			await fetchUsers({ $limit: 10, $skip: 0, $sort: {} });
			expect(axiosMock.get).toHaveBeenCalledWith("/v3/users/admin/teachers", {
				params: { $limit: 10, $skip: 0, $sort: {} },
			});
			expect(userList.value).toEqual(userResponseList);
			expect(pagination.value).toEqual({ limit: 10, skip: 0, total: 2 });
		});
	});

	describe("deleteUsers", () => {
		it("should delete users in chunks and update progress", async () => {
			const { deletingProgress, deleteUsers } = useUsers(RoleName.Student);
			const userIds = ["user1", "user2", "user3", "user4", "user5", "user6"];

			axiosMock.delete.mockResolvedValue({});

			await deleteUsers(userIds);

			expect(axiosMock.delete).toHaveBeenCalledTimes(2);
			expect(axiosMock.delete).toHaveBeenNthCalledWith(1, "/v3/deletionRequestsPublic", {
				params: { ids: ["user1", "user2", "user3", "user4", "user5"] },
			});
			expect(axiosMock.delete).toHaveBeenNthCalledWith(2, "/v3/deletionRequestsPublic", { params: { ids: ["user6"] } });
			expect(deletingProgress.value.active).toBe(false);
			expect(deletingProgress.value.percent).toBe(100);
		});
	});

	describe("createUser", () => {
		it("should create a student and update the student list", async () => {
			const { createUser } = useUsers(RoleName.Student);
			const newUser = userCreationDataFactory.build();

			axiosMock.post.mockResolvedValueOnce({ data: { data: newUser } });

			await createUser(newUser);

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/users/admin/students", newUser);
			expectNotification("success");
		});

		it("should create a teacher and update the teacher list", async () => {
			const { createUser } = useUsers(RoleName.Teacher);
			const newUser = userCreationDataFactory.build();

			axiosMock.post.mockResolvedValueOnce({ data: { data: newUser } });

			await createUser(newUser);

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/users/admin/teachers", newUser);
			expectNotification("success");
		});

		it("should not notify success if there is an error", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			const { createUser } = useUsers(RoleName.Teacher);
			const newUser = userCreationDataFactory.build();

			axiosMock.post.mockRejectedValueOnce(new Error("Network error"));

			await createUser(newUser);
			expectNotification("error");

			consoleErrorSpy.mockRestore();
		});
	});

	describe("sendRegistrationLink", () => {
		it("should send a registration link to the specified email and notify success", async () => {
			const { sendRegistrationLink } = useUsers(RoleName.Student);
			const responseData = [{ id: "some-id-1" }, { id: "some-id-2" }];
			axiosMock.post.mockResolvedValueOnce({ data: responseData });

			await sendRegistrationLink({ userIds: ["user1"], selectionType: "inclusive" });
			expect(axiosMock.post).toHaveBeenCalledWith("/v1/users/mail/registrationLink", {
				userIds: ["user1"],
				selectionType: "inclusive",
			});
			expectNotification("success");
		});

		it("should not notify success if there is an error", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());

			const { sendRegistrationLink } = useUsers(RoleName.Student);
			axiosMock.post.mockRejectedValueOnce(new Error("Network error"));

			await sendRegistrationLink({ userIds: ["user1"], selectionType: "inclusive" });
			expectNotification("error");

			consoleErrorSpy.mockRestore();
		});
	});

	describe("getQrRegistrationLinks", () => {
		it("should generate a qr registration link and update the qr registrationLinks list", async () => {
			const { getQrRegistrationLinks, qrLinks } = useUsers(RoleName.Student);
			const responseData = [
				{ title: "title-1", qrContent: "some-qr-content" },
				{ title: "title-2", qrContent: "some-qr-content-2" },
			];
			axiosMock.post.mockResolvedValueOnce({ data: responseData });

			await getQrRegistrationLinks({ userIds: ["user1"], selectionType: "inclusive" });

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/users/qrRegistrationLink", {
				roleName: "student",
				selectionType: "inclusive",
				userIds: ["user1"],
			});
			expect(qrLinks.value).toEqual(responseData);
		});

		it("should not update qr registrationLinks list if there is an error", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());

			const { getQrRegistrationLinks, qrLinks } = useUsers(RoleName.Student);
			axiosMock.post.mockRejectedValueOnce(new Error("Network error"));

			await getQrRegistrationLinks({ userIds: ["user1"], selectionType: "inclusive" });
			expectNotification("error");
			expect(qrLinks.value).toEqual([]);

			consoleErrorSpy.mockRestore();
		});
	});
});
