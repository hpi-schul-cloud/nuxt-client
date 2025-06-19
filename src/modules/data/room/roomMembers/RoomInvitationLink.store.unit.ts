import * as serverApi from "@/serverApi/v3/api";
import { authModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import { initializeAxios } from "@/utils/api";
import {
	meResponseFactory,
	mockApiResponse,
	mockedPiniaStoreTyping,
	roomFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoomDetailsStore, useRoomInvitationLinkStore } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { useBoardNotifier } from "@util-board";
import { AxiosInstance, AxiosPromise } from "axios";
import { createPinia, setActivePinia } from "pinia";
import { useI18n } from "vue-i18n";
import { InvitationStep, RoomInvitationLink } from "./types";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { createAxiosError } from "@util-axios-error";
import { RoomIdResponse } from "@/serverApi/v3/api";

vi.mock("vue-i18n");
(useI18n as vi.Mock).mockReturnValue({ t: (key: string) => key });

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

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

		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);
		vi.spyOn(serverApi, "RoomInvitationLinkApiFactory").mockReturnValue(
			roomInvitationLinkApiMock
		);
		vi.spyOn(serverApi, "SchoolApiFactory").mockReturnValue(schoolApiMock);
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
		vi.clearAllMocks();
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

			roomInvitationLinkApiMock.roomInvitationLinkControllerCreateRoomInvitationLink.mockResolvedValue(
				mockApiResponse({ data: link })
			);

			await roomInvitationLinkStore.createLink(link);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerCreateRoomInvitationLink
			).toHaveBeenCalledWith({
				...link,
				roomId: roomDetailsStore.room?.id,
			});
			expect(roomInvitationLinkStore.invitationStep).toStrictEqual(
				InvitationStep.SHARE
			);
		});

		describe("when 'activeUntil' value is DEFAULT_EXPIRED_DATE", () => {
			it("should set 'activeUntil' for UI after creating link", async () => {
				const links = roomInvitationLinkFactory.buildList(3);
				const { roomDetailsStore, roomInvitationLinkStore } = setup(links);
				const link = roomInvitationLinkStore.roomInvitationLinks[0];
				link.activeUntil = roomInvitationLinkStore.DEFAULT_EXPIRED_DATE;

				roomInvitationLinkApiMock.roomInvitationLinkControllerCreateRoomInvitationLink.mockResolvedValue(
					mockApiResponse({ data: { ...link } })
				);

				expect(roomInvitationLinkStore.roomInvitationLinks).toHaveLength(3);
				await roomInvitationLinkStore.createLink(link);

				expect(
					roomInvitationLinkApiMock.roomInvitationLinkControllerCreateRoomInvitationLink
				).toHaveBeenCalledWith({
					...link,
					roomId: roomDetailsStore.room?.id,
				});

				expect(roomInvitationLinkStore.roomInvitationLinks).toHaveLength(4);
				const createdLink = roomInvitationLinkStore.roomInvitationLinks.pop();
				expect(createdLink?.activeUntil).toBe(undefined);
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
				expect(roomInvitationLinkStore.invitationStep).not.toStrictEqual(
					InvitationStep.SHARE
				);
			});
		});
	});

	describe("updateLink", () => {
		it("should call the API to update a room invitation link", async () => {
			const links = roomInvitationLinkFactory.buildList(3);
			const { roomInvitationLinkStore } = setup(links);

			const firstLink = links[0];
			firstLink.title = "Updated Link";

			roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink.mockResolvedValue(
				mockApiResponse({ data: firstLink })
			);

			await roomInvitationLinkStore.updateLink(firstLink);

			expect(
				roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink
			).toHaveBeenCalledWith(firstLink.id, firstLink);
			expect(roomInvitationLinkStore.invitationStep).toStrictEqual(
				InvitationStep.SHARE
			);
		});

		describe("when 'activeUntil' value is DEFAULT_EXPIRED_DATE", () => {
			it("should set 'activeUntil' for UI after updating link", async () => {
				const links = roomInvitationLinkFactory.buildList(3);
				const { roomInvitationLinkStore } = setup(links);
				const firstLink = links[0];
				firstLink.activeUntil = roomInvitationLinkStore.DEFAULT_EXPIRED_DATE;

				roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink.mockResolvedValue(
					mockApiResponse({ data: firstLink })
				);

				await roomInvitationLinkStore.updateLink(firstLink);

				expect(
					roomInvitationLinkApiMock.roomInvitationLinkControllerUpdateLink
				).toHaveBeenCalledWith(firstLink.id, firstLink);

				const updatedLinks = roomInvitationLinkStore.roomInvitationLinks;
				expect(updatedLinks).toHaveLength(3);
				expect(updatedLinks[0].activeUntil).toBe(undefined);

				const tableDataElement =
					roomInvitationLinkStore.invitationTableData.find(
						(l) => l.id === firstLink.id
					);
				expect(tableDataElement?.activeUntil).toBe(
					"pages.rooms.members.tables.common.no"
				);
			});
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
				expect(roomInvitationLinkStore.invitationStep).not.toStrictEqual(
					InvitationStep.SHARE
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
			).toHaveBeenCalledWith([secondLink.id]);
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

		describe("when the API call succeeds", () => {
			it("should return the roomId", async () => {
				const links = roomInvitationLinkFactory.buildList(3);
				const { roomInvitationLinkStore } = setup(links);
				const roomId = "some-id";
				roomInvitationLinkApiMock.roomInvitationLinkControllerUseLink.mockResolvedValue(
					{ data: { id: roomId } } as unknown as AxiosPromise<RoomIdResponse>
				);
				const firstLink = links[0];

				const result = await roomInvitationLinkStore.useLink(firstLink.id);

				expect(result.roomId).toBe(roomId);
			});
		});

		describe("when the API call fails", () => {
			it("should return the validation error message", async () => {
				const links = roomInvitationLinkFactory.buildList(3);
				const { roomInvitationLinkStore } = setup(links);
				const message =
					serverApi.RoomInvitationLinkValidationError.RestrictedToCreatorSchool;
				const schoolName = "My example School";
				const axiosError = createAxiosError({
					message,
					data: { details: { validationMessage: message, schoolName } },
				});
				roomInvitationLinkApiMock.roomInvitationLinkControllerUseLink.mockRejectedValue(
					axiosError
				);

				const firstLink = links[0];
				const result = await roomInvitationLinkStore.useLink(firstLink.id);

				expect(result.validationMessage).toBe(message);
				expect(result.schoolName).toBe(schoolName);
			});
		});
	});
});
