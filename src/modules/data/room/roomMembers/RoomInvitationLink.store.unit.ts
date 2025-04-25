import * as serverApi from "@/serverApi/v3/api";
import { authModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import { initializeAxios } from "@/utils/api";
import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	roomFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoomDetailsStore, useRoomInvitationLinkStore } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useBoardNotifier } from "@util-board";
import { logger } from "@util-logger";
import { AxiosInstance } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { useI18n } from "vue-i18n";
import {
	CreateRoomInvitationLinkDto,
	UpdateRoomInvitationLinkDto,
} from "./types";

jest.mock("vue-i18n");
(useI18n as jest.Mock).mockReturnValue({ t: (key: string) => key });

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("useRoomInvitationLinkStore", () => {
	let roomApiMock: DeepMocked<serverApi.RoomApiInterface>;
	let roomInvitationLinkApiMock: DeepMocked<serverApi.RoomInvitationLinkApiInterface>;
	let schoolApiMock: DeepMocked<serverApi.SchoolApiInterface>;
	let axiosMock: DeepMocked<AxiosInstance>;
	let consoleErrorSpy: jest.SpyInstance;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		setActivePinia(createPinia());

		roomApiMock = createMock<serverApi.RoomApiInterface>();
		roomInvitationLinkApiMock =
			createMock<serverApi.RoomInvitationLinkApiInterface>();
		schoolApiMock = createMock<serverApi.SchoolApiInterface>();
		axiosMock = createMock<AxiosInstance>();
		consoleErrorSpy = jest.spyOn(logger, "error").mockImplementation();

		jest.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		jest
			.spyOn(serverApi, "RoomInvitationLinkApiFactory")
			.mockReturnValue(roomInvitationLinkApiMock);
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

	const setup = () => {
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		roomDetailsStore.room = roomFactory.build();

		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		return { roomInvitationLinkStore, roomDetailsStore };
	};

	afterEach(() => {
		jest.clearAllMocks();
		consoleErrorSpy.mockRestore();
	});

	it("should throw an error if the roomId is undefined", async () => {
		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		await roomInvitationLinkStore.fetchLinks();

		expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
			"pages.rooms.members.error.load"
		);
	});

	describe("initStore", () => {
		it("should call fetchLinks when roomId is defined", async () => {
			const { roomInvitationLinkStore, roomDetailsStore } = setup();

			await roomInvitationLinkStore.initStore();
			roomDetailsStore.room = roomFactory.build();

			expect(roomApiMock.roomControllerGetInvitationLinks).toHaveBeenCalled();
		});
	});

	describe("fetchLinks", () => {
		it("should call the API to fetch the room invitation links", async () => {
			const { roomDetailsStore, roomInvitationLinkStore } = setup();

			await roomInvitationLinkStore.fetchLinks();

			expect(roomApiMock.roomControllerGetInvitationLinks).toHaveBeenCalledWith(
				roomDetailsStore.room?.id
			);
		});
	});

	describe("createLink", () => {
		it("should call the API to create a room invitation link", async () => {
			const { roomDetailsStore, roomInvitationLinkStore } = setup();

			const link: CreateRoomInvitationLinkDto = {
				title: "Test Link",
				activeUntil: new Date("2023-12-31").toISOString(),
				isOnlyForTeachers: true,
				restrictedToCreatorSchool: true,
				requiresConfirmation: true,
			};

			await roomInvitationLinkStore.createLink(link);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerCreateRoomInvitationLink
			).toHaveBeenCalledWith({
				...link,
				roomId: roomDetailsStore.room?.id,
			});
		});
	});

	describe("updateLink", () => {
		it("should call the API to update a room invitation link", async () => {
			const { roomInvitationLinkStore } = setup();

			const link: UpdateRoomInvitationLinkDto = {
				id: "link-id",
				title: "Updated Link",
				activeUntil: new Date("2023-12-31").toISOString(),
				isOnlyForTeachers: true,
				restrictedToCreatorSchool: true,
				requiresConfirmation: true,
			};

			await roomInvitationLinkStore.updateLink(link);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink
			).toHaveBeenCalledWith(link.id, link);
		});
	});

	describe("deleteLink", () => {
		it("should call the API to delete a room invitation link", async () => {
			const { roomInvitationLinkStore } = setup();

			const linkId = "link-id";

			await roomInvitationLinkStore.deleteLink(linkId);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerDeleteLink
			).toHaveBeenCalledWith(linkId);
		});
	});

	describe("resetStore", () => {
		it("should reset the store", () => {
			const { roomInvitationLinkStore } = setup();
			roomInvitationLinkStore.roomInvitationLinks = [
				{
					id: "link-id",
					roomId: "room-id",
					title: "Updated Link",
					activeUntil: new Date("2023-12-31").toISOString(),
					isOnlyForTeachers: true,
					restrictedToCreatorSchool: true,
					requiresConfirmation: true,
					creatorUserId: "user-id",
					creatorSchoolId: "school-id",
				},
			];
			roomInvitationLinkStore.resetStore();

			expect(roomInvitationLinkStore.roomInvitationLinks).toEqual([]);
		});
	});

	describe("useLink", () => {
		it("should call the API to use a room invitation link", async () => {
			const { roomInvitationLinkStore } = setup();

			const linkId = "link-id";

			await roomInvitationLinkStore.useLink(linkId);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerUseLink
			).toHaveBeenCalledWith(linkId);
		});
	});
});
