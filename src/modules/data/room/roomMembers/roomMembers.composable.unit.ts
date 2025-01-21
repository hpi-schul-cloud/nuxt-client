import {
	roomMemberListFactory,
	mockApiResponse,
	roomMemberFactory,
	roomMemberSchoolResponseFactory,
	schoolFactory,
	meResponseFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import * as serverApi from "@/serverApi/v3/api";
import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";
import { useRoomMembers } from "@data-room";
import { useI18n } from "vue-i18n";
import {
	RoleName,
	RoomMemberResponse,
	SchoolUserListResponse,
} from "@/serverApi/v3/api";
import { useBoardNotifier } from "@util-board";
import { schoolsModule, authModule } from "@/store";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import setupStores from "@@/tests/test-utils/setupStores";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board/BoardNotifier.composable");
jest.mock("@util-board/LastCreatedElement.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useRoomMembers", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let schoolApiMock: DeepMocked<serverApi.SchoolApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let consoleErrorSpy: jest.SpyInstance;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	const roomId = "room-id";

	beforeEach(() => {
		roomApiMock = createMock<serverApi.RoomApiInterface>();
		schoolApiMock = createMock<serverApi.SchoolApiInterface>();
		axiosMock = createMock<AxiosInstance>();
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

		jest.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		jest.spyOn(serverApi, "SchoolApiFactory").mockReturnValue(schoolApiMock);
		initializeAxios(axiosMock);

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);

		const mockMe = meResponseFactory.build();
		authModule.setMe(mockMe);
	});

	afterEach(() => {
		jest.clearAllMocks();
		consoleErrorSpy.mockRestore();
	});

	describe("fetchMembers", () => {
		describe("when the user is not room owner", () => {
			it("should fetch members and map members with role names", async () => {
				const { fetchMembers, roomMembers } = useRoomMembers(roomId);
				const membersMock = roomMemberFactory(RoleName.Roomadmin).buildList(3);

				roomApiMock.roomControllerGetMembers.mockResolvedValue(
					mockApiResponse({
						data: { data: membersMock },
					})
				);

				await fetchMembers();

				expect(roomMembers.value).toEqual(
					membersMock.map((member) => ({
						...member,
						displayRoomRole: "pages.rooms.members.roomPermissions.admin",
						displaySchoolRole: "common.labels.teacher",
						isSelectable: true,
					}))
				);
			});
		});

		describe("when the user is room owner", () => {
			it("should fetch members and map members with role names", async () => {
				const { fetchMembers, roomMembers } = useRoomMembers(roomId);
				const membersMock = roomMemberFactory(RoleName.Roomowner).buildList(3);

				roomApiMock.roomControllerGetMembers.mockResolvedValue(
					mockApiResponse({
						data: {
							data: membersMock,
						},
					})
				);

				await fetchMembers();

				expect(roomMembers.value).toEqual(
					membersMock.map((member) => ({
						...member,
						displayRoomRole: "pages.rooms.members.roomPermissions.owner",
						displaySchoolRole: "common.labels.teacher",
						isSelectable: false,
					}))
				);
			});
		});

		it("should throw an error if the API call fails", async () => {
			const { fetchMembers } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerGetMembers.mockRejectedValue(error);

			await fetchMembers();

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.load"
			);
		});
	});

	describe("getPotentialMembers", () => {
		it("should get potential members", async () => {
			const { getPotentialMembers, potentialRoomMembers } =
				useRoomMembers(roomId);

			const schoolTeachersList: SchoolUserListResponse = {
				data: [
					{
						firstName: "Carl",
						lastName: "Cord",
						id: "1",
						schoolName: "Paul-Gerhardt-Gymnasium",
					},
					{
						firstName: "John",
						lastName: "Doe",
						id: "2",
						schoolName: "Paul-Gerhardt-Gymnasium",
					},
				],
			};
			schoolApiMock.schoolControllerGetTeachers.mockResolvedValue(
				mockApiResponse({
					data: schoolTeachersList,
				})
			);

			await getPotentialMembers(RoleName.Teacher);

			expect(potentialRoomMembers.value).toEqual(
				schoolTeachersList.data.map((user) => ({
					...user,
					userId: user.id,
					fullName: `${user.lastName}, ${user.firstName}`,
					roomRoleName: RoleName.Roomadmin,
					schoolRoleName: RoleName.Teacher,
					schoolName: "Paul-Gerhardt-Gymnasium",
				}))
			);
		});

		it("should filter out members that are already in the room", async () => {
			const { getPotentialMembers, potentialRoomMembers, roomMembers } =
				useRoomMembers(roomId);

			const membersMock: RoomMemberResponse = roomMemberFactory(
				RoleName.Roomeditor
			).build();

			roomMembers.value = [membersMock];

			const schoolTeachersList: SchoolUserListResponse = {
				data: [
					{
						firstName: membersMock.firstName,
						lastName: membersMock.lastName,
						id: membersMock.userId,
						schoolName: membersMock.schoolName,
					},
				],
			};
			schoolApiMock.schoolControllerGetTeachers.mockResolvedValue(
				mockApiResponse({
					data: schoolTeachersList,
				})
			);

			await getPotentialMembers(RoleName.Teacher);

			expect(potentialRoomMembers.value).toEqual([]);
		});

		it("should throw an error if the API call fails", async () => {
			const { getPotentialMembers } = useRoomMembers(roomId);

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetTeachers.mockRejectedValue(error);

			await getPotentialMembers(RoleName.Teacher);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.load"
			);
		});
	});

	describe("getSchools", () => {
		it("should get schools", async () => {
			const { getSchools, schools } = useRoomMembers(roomId);
			const schoolList = roomMemberSchoolResponseFactory.buildList(3);
			schoolApiMock.schoolControllerGetSchoolListForExternalInvite.mockResolvedValue(
				mockApiResponse({
					data: schoolList,
				})
			);
			await getSchools();

			expect(schools.value).toHaveLength(schoolList.length + 1);
			expect(schools.value[0]).toStrictEqual({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			});
		});

		it("should throw an error if the API call fails", async () => {
			const { getSchools } = useRoomMembers(roomId);

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetSchoolListForExternalInvite.mockRejectedValue(
				error
			);

			await getSchools();

			expect(consoleErrorSpy).toHaveBeenCalledWith(error);
		});
	});

	describe("addMembers", () => {
		it("should add a members to the room", async () => {
			const { addMembers, potentialRoomMembers, roomMembers } =
				useRoomMembers(roomId);

			roomApiMock.roomControllerAddMembers.mockResolvedValue(
				mockApiResponse({})
			);

			potentialRoomMembers.value = roomMemberListFactory.buildList(3);
			const firstPotentialMember = potentialRoomMembers.value[0];

			await addMembers([firstPotentialMember.userId]);

			expect(roomApiMock.roomControllerAddMembers).toHaveBeenCalledWith(
				roomId,
				{
					userIds: [firstPotentialMember.userId],
				}
			);
			expect(roomMembers.value).toEqual([
				{
					...firstPotentialMember,
					displayRoomRole: "pages.rooms.members.roomPermissions.admin",
					displaySchoolRole: "common.labels.teacher",
				},
			]);
		});

		it("should throw an error if the API call fails", async () => {
			const { addMembers } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerAddMembers.mockRejectedValue(error);

			await addMembers(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.add"
			);
		});
	});

	describe("removeMembers", () => {
		it("should remove a members from the room", async () => {
			const { removeMembers, roomMembers } = useRoomMembers(roomId);

			roomApiMock.roomControllerRemoveMembers.mockResolvedValue(
				mockApiResponse({})
			);

			const membersMock = roomMemberFactory(RoleName.Roomeditor).buildList(3);
			roomMembers.value = membersMock;

			const firstMember = membersMock[0];

			await removeMembers([firstMember.userId]);

			expect(roomApiMock.roomControllerRemoveMembers).toHaveBeenCalledWith(
				roomId,
				{
					userIds: [firstMember.userId],
				}
			);

			expect(roomMembers.value).not.toContainEqual(firstMember);
		});

		it("should throw an error if the API call fails", async () => {
			const { removeMembers } = useRoomMembers(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerRemoveMembers.mockRejectedValue(error);

			await removeMembers(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.members.error.remove"
			);
		});
	});
});
