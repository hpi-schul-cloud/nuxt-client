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
import { UpdateRoomInvitationLinkDto } from "./types";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";

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
		roomInvitationLinkStore.roomInvitationLinks =
			roomInvitationLinkFactory.buildList(3);

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

		describe("when the API call fails", () => {
			it("should show a failure message", async () => {
				const { roomInvitationLinkStore } = setup();

				roomApiMock.roomControllerGetInvitationLinks.mockRejectedValue(
					new Error("API error")
				);

				await roomInvitationLinkStore.fetchLinks();

				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
					"pages.rooms.members.error.load"
				);
			});
		});
	});

	describe("createLink", () => {
		it("should call the API to create a room invitation link", async () => {
			const { roomDetailsStore, roomInvitationLinkStore } = setup();
			const link = roomInvitationLinkFactory.build();

			await roomInvitationLinkStore.createLink(link);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerCreateRoomInvitationLink
			).toHaveBeenCalledWith({
				...link,
				roomId: roomDetailsStore.room?.id,
			});
		});

		describe("when the API call fails", () => {
			it("should show a failure message", async () => {
				const { roomInvitationLinkStore } = setup();
				const link = roomInvitationLinkFactory.build();
				roomInvitationLinkApiMock.roomInvitationLinkControllerCreateRoomInvitationLink.mockRejectedValue(
					new Error("API error")
				);

				await roomInvitationLinkStore.createLink(link);

				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
					"pages.rooms.members.error.create"
				);
			});
		});
	});

	describe("updateLink", () => {
		it("should call the API to update a room invitation link", async () => {
			const { roomInvitationLinkStore } = setup();

			const link: UpdateRoomInvitationLinkDto =
				roomInvitationLinkStore.roomInvitationLinks[0];
			link.title = "Updated Link";

			await roomInvitationLinkStore.updateLink(link);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink
			).toHaveBeenCalledWith(link.id, link);
		});

		describe("when the API call fails", () => {
			it("should show a failure message", async () => {
				const { roomInvitationLinkStore } = setup();
				roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink.mockRejectedValue(
					new Error("API error")
				);

				const firstLink = roomInvitationLinkStore.roomInvitationLinks[0];
				firstLink.title = "Updated Link";

				await roomInvitationLinkStore.updateLink(firstLink);

				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
					"pages.rooms.members.error.update"
				);
			});
		});
	});

	describe("deleteLink", () => {
		it("should call the API to delete a room invitation link", async () => {
			const { roomInvitationLinkStore } = setup();

			const secondLink = roomInvitationLinkStore.roomInvitationLinks[1];

			await roomInvitationLinkStore.deleteLink(secondLink.id);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerDeleteLink
			).toHaveBeenCalledWith(secondLink.id);
			expect(roomInvitationLinkStore.roomInvitationLinks).toHaveLength(2);
		});

		describe("when the API call fails", () => {
			it("should show a failure message", async () => {
				const { roomInvitationLinkStore } = setup();
				roomInvitationLinkApiMock.roomInvitationLinkControllerDeleteLink.mockRejectedValue(
					new Error("API error")
				);

				const link = roomInvitationLinkStore.roomInvitationLinks[0];

				await roomInvitationLinkStore.deleteLink(link.id);

				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
					"pages.rooms.members.error.delete"
				);
			});
		});
	});

	describe("resetStore", () => {
		it("should reset the store", () => {
			const { roomInvitationLinkStore } = setup();

			expect(roomInvitationLinkStore.roomInvitationLinks).toHaveLength(3);

			roomInvitationLinkStore.resetStore();

			expect(roomInvitationLinkStore.roomInvitationLinks).toHaveLength(0);
		});
	});

	describe("useLink", () => {
		it("should call the API to use a room invitation link", async () => {
			const { roomInvitationLinkStore } = setup();

			const firstLink = roomInvitationLinkStore.roomInvitationLinks[0];

			const result = await roomInvitationLinkStore.useLink(firstLink.id);

			expect(result).not.toBeUndefined();
			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerUseLink
			).toHaveBeenCalledWith(firstLink.id);
		});

		describe("when the API call fails", () => {
			it("should show a failure message", async () => {
				const { roomInvitationLinkStore } = setup();
				roomInvitationLinkApiMock.roomInvitationLinkControllerUseLink.mockRejectedValue(
					new Error("API error")
				);

				const firstLink = roomInvitationLinkStore.roomInvitationLinks[0];

				await roomInvitationLinkStore.useLink(firstLink.id);

				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
					"pages.rooms.members.error.use"
				);
			});
		});
	});
});
