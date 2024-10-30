import {
	addParticipantListFactory,
	mockApiResponse,
	roomParticipantResponseFactory,
	roomParticipantSchoolResponseFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import * as serverApi from "@/serverApi/v3/api";
import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";
import { useParticipants } from "@data-room";
import { useI18n } from "vue-i18n";
import {
	RoleName,
	RoomMemberResponse,
	SchoolUserListResponse,
	UserIdAndRoleRoleNameEnum,
} from "@/serverApi/v3/api";
import { useBoardNotifier } from "@util-board";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import setupStores from "@@/tests/test-utils/setupStores";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board/BoardNotifier.composable");
jest.mock("@util-board/LastCreatedElement.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useParticipants", () => {
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
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
		consoleErrorSpy.mockRestore();
	});

	describe("fetchParticipants", () => {
		it("should fetch participants and map participants with role names", async () => {
			const { fetchParticipants, participants } = useParticipants(roomId);
			const participantsMock = roomParticipantResponseFactory.buildList(3);

			roomApiMock.roomControllerGetMembers.mockResolvedValue(
				mockApiResponse({
					data: { data: participantsMock },
				})
			);

			await fetchParticipants();

			expect(participants.value).toEqual(
				participantsMock.map((participant) => ({
					...participant,
					displayRoleName: "common.labels.teacher",
				}))
			);
		});

		it("should throw an error if the API call fails", async () => {
			const { fetchParticipants } = useParticipants(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerGetMembers.mockRejectedValue(error);

			await fetchParticipants();

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.participant.error.load"
			);
		});
	});

	describe("getPotentialParticipants", () => {
		it("should get potential participants", async () => {
			const { getPotentialParticipants, potentialParticipants } =
				useParticipants(roomId);

			const schoolTeachersList: SchoolUserListResponse = {
				data: [
					{ firstName: "Carl", lastName: "Cord", id: "1" },
					{ firstName: "John", lastName: "Doe", id: "2" },
				],
				total: 3,
				skip: 0,
				limit: 3,
			};
			schoolApiMock.schoolControllerGetTeachers.mockResolvedValue(
				mockApiResponse({
					data: schoolTeachersList,
				})
			);

			await getPotentialParticipants();

			expect(potentialParticipants.value).toEqual(
				schoolTeachersList.data.map((user) => ({
					...user,
					userId: user.id,
					fullName: `${user.lastName}, ${user.firstName}`,
					roleName: RoleName.RoomEditor,
					schoolName: "Paul-Gerhardt-Gymnasium",
				}))
			);
		});

		it("should filter out participants that are already in the room", async () => {
			const { getPotentialParticipants, potentialParticipants, participants } =
				useParticipants(roomId);

			const participantsMock: RoomMemberResponse =
				roomParticipantResponseFactory.build();

			const participantsMock_1: RoomMemberResponse[] = [
				{
					userId: "1",
					firstName: "Carl",
					lastName: "Cord",
					roleName: RoleName.RoomEditor,
					schoolName: "Paul-Gerhardt-Gymnasium",
				},
			];
			participants.value = [participantsMock];

			const schoolTeachersList: SchoolUserListResponse = {
				data: [
					{
						firstName: participantsMock.firstName,
						lastName: participantsMock.lastName,
						id: participantsMock.userId,
					},
				],
				total: 3,
				skip: 0,
				limit: 3,
			};
			schoolApiMock.schoolControllerGetTeachers.mockResolvedValue(
				mockApiResponse({
					data: schoolTeachersList,
				})
			);

			await getPotentialParticipants();

			expect(potentialParticipants.value).toEqual([]);
		});

		it("should throw an error if the API call fails", async () => {
			const { getPotentialParticipants } = useParticipants(roomId);

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetTeachers.mockRejectedValue(error);

			await getPotentialParticipants();

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.participant.error.load"
			);
		});
	});

	describe("getSchools", () => {
		it("should get schools", async () => {
			const { getSchools, schools } = useParticipants(roomId);
			const schoolList = roomParticipantSchoolResponseFactory.buildList(3);
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
			const { getSchools } = useParticipants(roomId);

			const error = new Error("Test error");
			schoolApiMock.schoolControllerGetSchoolListForExternalInvite.mockRejectedValue(
				error
			);

			await getSchools();

			expect(consoleErrorSpy).toHaveBeenCalledWith(error);
		});
	});

	describe("addParticipants", () => {
		it("should add a participants to the room", async () => {
			const { addParticipants, potentialParticipants, participants } =
				useParticipants(roomId);

			roomApiMock.roomControllerAddMembers.mockResolvedValue(
				mockApiResponse({})
			);

			potentialParticipants.value = addParticipantListFactory.buildList(3);
			const firstPotentialParticipant = potentialParticipants.value[0];

			await addParticipants([firstPotentialParticipant.userId]);

			expect(roomApiMock.roomControllerAddMembers).toHaveBeenCalledWith(
				roomId,
				{
					userIdsAndRoles: [
						{
							userId: firstPotentialParticipant.userId,
							roleName: UserIdAndRoleRoleNameEnum.Editor,
						},
					],
				}
			);
			expect(participants.value).toEqual([
				{
					...firstPotentialParticipant,
					displayRoleName: "common.labels.teacher",
				},
			]);
		});

		it("should throw an error if the API call fails", async () => {
			const { addParticipants } = useParticipants(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerAddMembers.mockRejectedValue(error);

			await addParticipants(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.participant.error.add"
			);
		});
	});

	describe("removeParticipants", () => {
		it("should remove a participants from the room", async () => {
			const { removeParticipants, participants } = useParticipants(roomId);

			roomApiMock.roomControllerRemoveMembers.mockResolvedValue(
				mockApiResponse({})
			);

			const participantsMock = roomParticipantResponseFactory.buildList(3);
			participants.value = participantsMock;

			const firstParticipant = participantsMock[0];

			await removeParticipants([firstParticipant.userId]);

			expect(roomApiMock.roomControllerRemoveMembers).toHaveBeenCalledWith(
				roomId,
				{
					userIds: [firstParticipant.userId],
				}
			);

			expect(participants.value).not.toContainEqual(firstParticipant);
		});

		it("should throw an error if the API call fails", async () => {
			const { removeParticipants } = useParticipants(roomId);

			const error = new Error("Test error");
			roomApiMock.roomControllerRemoveMembers.mockRejectedValue(error);

			await removeParticipants(["id"]);

			expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
				"pages.rooms.participant.error.delete"
			);
		});
	});
});
