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
import { AxiosInstance } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { useI18n } from "vue-i18n";
import { RoomInvitationLink, UpdateRoomInvitationLinkDto } from "./types";
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
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		setActivePinia(createPinia());

		roomApiMock = createMock<serverApi.RoomApiInterface>();
		roomInvitationLinkApiMock =
			createMock<serverApi.RoomInvitationLinkApiInterface>();
		schoolApiMock = createMock<serverApi.SchoolApiInterface>();
		axiosMock = createMock<AxiosInstance>();

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

	const setup = (roomInvitationLinks: RoomInvitationLink[] = []) => {
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		roomDetailsStore.room = roomFactory.build();

		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);
		roomInvitationLinkStore.roomInvitationLinks = roomInvitationLinks;

		return { roomInvitationLinkStore, roomDetailsStore };
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("fetchLinks", () => {
		describe("when the roomId is defined", () => {
			it("should call the API to fetch the room invitation links", async () => {
				const { roomDetailsStore, roomInvitationLinkStore } = setup();

				await roomInvitationLinkStore.fetchLinks();

				expect(
					roomApiMock.roomControllerGetInvitationLinks
				).toHaveBeenCalledWith(roomDetailsStore.room?.id);
			});

			describe("when the API call fails", () => {
				it("should show a failure message", async () => {
					const { roomInvitationLinkStore } = setup();

					roomApiMock.roomControllerGetInvitationLinks.mockRejectedValue(
						new Error("API error")
					);

					await roomInvitationLinkStore.fetchLinks();

					expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
						"pages.rooms.invitationlinks.error.load"
					);
				});
			});
		});

		describe("when the roomId is undefined", () => {
			it("should not call the API", async () => {
				const { roomDetailsStore, roomInvitationLinkStore } = setup();
				roomDetailsStore.room = undefined;

				await roomInvitationLinkStore.fetchLinks();

				expect(
					roomApiMock.roomControllerGetInvitationLinks
				).not.toHaveBeenCalled();
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
					"pages.rooms.invitationlinks.error.create"
				);
			});
		});
	});

	describe("updateLink", () => {
		it("should call the API to update a room invitation link", async () => {
			const links = roomInvitationLinkFactory.buildList(3);
			const { roomInvitationLinkStore } = setup(links);

			const firstLink: UpdateRoomInvitationLinkDto = links[0];
			firstLink.title = "Updated Link";

			await roomInvitationLinkStore.updateLink(firstLink);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink
			).toHaveBeenCalledWith(firstLink.id, firstLink);
		});

		describe("when the API call fails", () => {
			it("should show a failure message", async () => {
				const links = roomInvitationLinkFactory.buildList(3);
				const { roomInvitationLinkStore } = setup(links);
				roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink.mockRejectedValue(
					new Error("API error")
				);

				const firstLink = links[0];
				firstLink.title = "Updated Link";

				await roomInvitationLinkStore.updateLink(firstLink);

				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
					"pages.rooms.invitationlinks.error.update"
				);
			});
		});
	});

	describe("deleteLink", () => {
		it("should call the API to delete a room invitation link", async () => {
			const links = roomInvitationLinkFactory.buildList(3);
			const { roomInvitationLinkStore } = setup(links);

			const secondLink = links[1];

			await roomInvitationLinkStore.deleteLinks(secondLink.id);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerDeleteLinks
			).toHaveBeenCalledWith(secondLink.id);
			expect(roomInvitationLinkStore.roomInvitationLinks).toHaveLength(2);
		});

		describe("when the API call fails", () => {
			it("should show a failure message", async () => {
				const links = roomInvitationLinkFactory.buildList(3);
				const { roomInvitationLinkStore } = setup(links);
				roomInvitationLinkApiMock.roomInvitationLinkControllerDeleteLinks.mockRejectedValue(
					new Error("API error")
				);

				const firstLink = links[0];

				await roomInvitationLinkStore.deleteLinks(firstLink.id);

				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
					"pages.rooms.invitationlinks.error.delete"
				);
			});
		});
	});

	describe("resetStore", () => {
		it("should reset the store", () => {
			const links = roomInvitationLinkFactory.buildList(3);
			const { roomInvitationLinkStore } = setup(links);

			expect(roomInvitationLinkStore.roomInvitationLinks).toHaveLength(
				links.length
			);

			roomInvitationLinkStore.resetStore();

			expect(roomInvitationLinkStore.roomInvitationLinks).toHaveLength(0);
		});
	});

	describe("useLink", () => {
		it("should call the API to use a room invitation link", async () => {
			const links = roomInvitationLinkFactory.buildList(3);
			const { roomInvitationLinkStore } = setup(links);

			const firstLink = links[0];

			const result = await roomInvitationLinkStore.useLink(firstLink.id);

			expect(result).not.toBeUndefined();
			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerUseLink
			).toHaveBeenCalledWith(firstLink.id);
		});

		describe("when the API call fails", () => {
			it("should show a failure message", async () => {
				const links = roomInvitationLinkFactory.buildList(3);
				const { roomInvitationLinkStore } = setup(links);
				roomInvitationLinkApiMock.roomInvitationLinkControllerUseLink.mockRejectedValue(
					new Error("API error")
				);

				const firstLink = links[0];

				await roomInvitationLinkStore.useLink(firstLink.id);

				expect(mockedBoardNotifierCalls.showFailure).toHaveBeenCalledWith(
					"pages.rooms.invitationlinks.error.use"
				);
			});
		});
	});
});
