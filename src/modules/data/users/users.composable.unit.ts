import { useUsers } from "./users.composable";
import { RoleName } from "@/serverApi/v3";
import { initializeAxios } from "@/utils/api";
import { mountComposable, userCreationDataFactory, userResponseFactory } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";

vi.mock("vue-i18n", () => ({
	useI18n: () => ({ t: (key: string) => key }),
	createI18n: () => ({
		global: {
			t: (key: string) => key,
		},
	}),
}));

const mockResponse = userResponseFactory.buildList(2);

describe("useUsers", () => {
	let axiosMock: DeepMocked<AxiosInstance>;
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = createMock<AxiosInstance>();
		axiosMock.get.mockResolvedValueOnce({
			data: {
				data: mockResponse,
				limit: 10,
				skip: 0,
				total: 2,
			},
		});
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (userRole: RoleName.Student | RoleName.Teacher = RoleName.Student) =>
		mountComposable(() => useUsers(userRole), {
			global: {
				plugins: [createTestingPinia()],
			},
		});

	describe("fetchUsers", () => {
		it("should fetch and update the user list and pagination", async () => {
			const composable = setup();

			expect(composable.userList.value).toEqual([]);
			await composable.fetchUsers({ $limit: 10, $skip: 0, $sort: {} });
			expect(axiosMock.get).toHaveBeenCalledWith("/v3/users/admin/students", {
				params: { $limit: 10, $skip: 0, $sort: {} },
			});
			expect(composable.userList.value).toEqual(mockResponse);
			expect(composable.pagination.value).toEqual({ limit: 10, skip: 0, total: 2 });
		});
	});

	describe("deleteUsers", () => {
		it("should delete users in chunks and update progress", async () => {
			const composable = setup();
			const userIds = ["user1", "user2", "user3", "user4", "user5", "user6"];

			axiosMock.delete.mockResolvedValue({});

			const deletePromise = composable.deleteUsers(userIds);

			expect(composable.deletingProgress.value.active).toBe(true);
			expect(composable.deletingProgress.value.percent).toBe(0);

			await deletePromise;

			expect(axiosMock.delete).toHaveBeenCalledTimes(2);
			expect(axiosMock.delete).toHaveBeenNthCalledWith(1, "/v3/deletionRequestsPublic", {
				params: { ids: ["user1", "user2", "user3", "user4", "user5"] },
			});
			expect(axiosMock.delete).toHaveBeenNthCalledWith(2, "/v3/deletionRequestsPublic", { params: { ids: ["user6"] } });
			expect(composable.deletingProgress.value.active).toBe(false);
			expect(composable.deletingProgress.value.percent).toBe(100);
		});
	});

	describe("createUser", () => {
		it("should create a user and update the user list", async () => {
			const composable = setup();
			const newUser = userCreationDataFactory.build();

			axiosMock.post.mockResolvedValueOnce({ data: { data: newUser } });

			await composable.createUser(newUser);

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/users/admin/students", newUser);
		});
	});

	describe("sendRegistrationLink", () => {
		it("should send a registration link to the specified email", async () => {
			const composable = setup();
			const responseData = [{ id: "some-id-1" }, { id: "some-id-2" }];
			axiosMock.post.mockResolvedValueOnce({ data: responseData });

			await composable.sendRegistrationLink({ userIds: ["user1"], selectionType: "inclusive" });
			expect(axiosMock.post).toHaveBeenCalledWith("/v1/users/mail/registrationLink", {
				userIds: ["user1"],
				selectionType: "inclusive",
			});
			expect(composable.registrationLinks.value).toEqual(responseData);
		});

		describe("generateRegistrationLink", () => {
			it("should generate a registration link and update the registrationLinks list", async () => {
				const composable = setup();
				const responseData = [{ id: "some-id-1" }, { id: "some-id-2" }];
				axiosMock.post.mockResolvedValueOnce({ data: responseData });

				await composable.getQrRegistrationLinks({ userIds: ["user1"], selectionType: "inclusive" });
				expect(axiosMock.post).toHaveBeenCalledWith("/v1/users/qrRegistrationLink", {
					roleName: "student",
					selectionType: "inclusive",
					userIds: ["user1"],
				});
				expect(composable.qrLinks.value).toEqual(responseData);
			});
		});
	});
});
