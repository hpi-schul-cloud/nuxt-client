import { useRoomDetailsStore } from "../RoomDetails.store";
import { type RegistrationList, useRegistrationStore } from "./registration.store";
import { useI18nGlobal } from "@/plugins/i18n";
import * as serverApi from "@/serverApi/v3/api";
import { expectNotification, mockedPiniaStoreTyping, registrationFactory, roomFactory } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

vi.mock("@/plugins/i18n");
(useI18nGlobal as Mock).mockReturnValue({ t: (key: string) => key });

describe("registration.store", () => {
	let registrationApi: DeepMocked<serverApi.RegistrationApiInterface>;

	const createRegistrations = (count = 2): RegistrationList => {
		const registrations = registrationFactory.buildList(count);
		return registrations;
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		registrationApi = createMock<serverApi.RegistrationApiInterface>();
		vi.spyOn(serverApi, "RegistrationApiFactory").mockReturnValue(registrationApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: { registrationSecret?: string; roomRegistrations?: RegistrationList }) => {
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		roomDetailsStore.room = roomFactory.build();

		const registrationStore = mockedPiniaStoreTyping(useRegistrationStore);

		if (options?.registrationSecret !== undefined) {
			registrationStore.registrationSecret = options.registrationSecret;
		}

		if (options?.roomRegistrations) {
			registrationStore.roomRegistrations = options.roomRegistrations;
		}

		return { registrationStore, roomDetailsStore };
	};

	describe("fetchRegistrationsForCurrentRoom", () => {
		it("stores registrations for current room on success", async () => {
			const registration = createRegistrations(1)[0];
			const { registrationStore, roomDetailsStore } = setup({ roomRegistrations: [registration] });

			registrationApi.registrationControllerFindByRoom.mockResolvedValueOnce([registration]);

			await registrationStore.fetchRegistrationsForCurrentRoom();

			expect(registrationApi.registrationControllerFindByRoom).toHaveBeenCalledWith(roomDetailsStore.room?.id);
			expect(registrationStore.roomRegistrations).toEqual([registration]);
		});

		it("notifies on error", async () => {
			const { registrationStore, roomDetailsStore } = setup();

			registrationApi.registrationControllerFindByRoom.mockResolvedValueOnce(new Error("Error"));

			await registrationStore.fetchRegistrationsForCurrentRoom();

			expect(registrationApi.registrationControllerFindByRoom).toHaveBeenCalledWith(roomDetailsStore.room?.id);
			expectNotification("error");
		});
	});

	describe("fetchUserData", () => {
		it("stores user data on success", async () => {
			const mockedSecret = "secret-123";
			const { registrationStore } = setup({ registrationSecret: mockedSecret });

			const mockedRegistrationData = { firstName: "Max", lastName: "Mustermann", email: "sample-mail@de.de" };
			registrationApi.registrationControllerGetBySecret.mockResolvedValueOnce({
				data: mockedRegistrationData,
			});

			await registrationStore.fetchUserData();

			expect(registrationApi.registrationControllerGetBySecret).toHaveBeenCalledWith(mockedSecret);
			expect(registrationStore.userData).toEqual(mockedRegistrationData);
		});

		it("shows error notification on failure and sets hasApiErrorOccurred", async () => {
			const mockedSecret = "secret-123";
			const { registrationStore } = setup({ registrationSecret: mockedSecret });
			expect(registrationStore.hasApiErrorOccurred).toBe(false);

			registrationApi.registrationControllerGetBySecret.mockRejectedValueOnce(new Error("API Error"));

			await registrationStore.fetchUserData();

			expect(registrationApi.registrationControllerGetBySecret).toHaveBeenCalledWith(mockedSecret);
			expectNotification("error");
			expect(registrationStore.hasApiErrorOccurred).toBe(true);
		});
	});

	describe("completeRegistration", () => {
		it("returns true on success", async () => {
			const mockedSecret = "secret-123";
			const { registrationStore } = setup({ registrationSecret: mockedSecret });

			registrationApi.registrationControllerCompleteRegistration.mockResolvedValueOnce({});

			const result = await registrationStore.completeRegistration(serverApi.LanguageType.En, "SuperSecret123");

			expect(registrationApi.registrationControllerCompleteRegistration).toHaveBeenCalledWith(mockedSecret, {
				language: serverApi.LanguageType.En,
				password: "SuperSecret123",
			});
			expect(result).toBe(true);
		});

		it("returns false and notifies on error", async () => {
			const { registrationStore } = setup({ registrationSecret: "secret-123" });

			registrationApi.registrationControllerCompleteRegistration.mockRejectedValueOnce(new Error("Error"));

			const result = await registrationStore.completeRegistration(serverApi.LanguageType.De, "badpassword");
			expect(result).toBe(false);
			expectNotification("error");
		});
	});

	describe("removeInvitations", () => {
		it("removes invitation on success", async () => {
			const registration = createRegistrations(1)[0];
			const { registrationStore, roomDetailsStore } = setup({ roomRegistrations: [registration] });

			registrationApi.registrationControllerCancelRegistration.mockResolvedValueOnce({});

			await registrationStore.removeInvitations([registration.id]);

			expect(registrationApi.registrationControllerCancelRegistration).toHaveBeenCalledWith(
				registration.id,
				roomDetailsStore.room?.id
			);
			expect(registrationStore.roomRegistrations).not.toContainEqual(registration);
		});

		it("does not remove invitation and notifies on error", async () => {
			const { registrationStore } = setup();

			registrationApi.registrationControllerCancelRegistration.mockRejectedValueOnce(new Error("Error"));

			await registrationStore.removeInvitations(["random-registration-id"]);
			expectNotification("error");
		});
	});

	describe("getRegistrationById", () => {
		it("should return registration when id exists", () => {
			const registrations = createRegistrations();
			const { registrationStore } = setup({ roomRegistrations: registrations });

			const result = registrationStore.getRegistrationById(registrations[0].id);

			expect(result).toEqual(registrations[0]);
		});

		it("should return undefined when id does not exist", () => {
			const registrations = createRegistrations(1);
			const { registrationStore } = setup({ roomRegistrations: registrations });

			const result = registrationStore.getRegistrationById("999");

			expect(result).toBeUndefined();
		});

		it("should return undefined when roomRegistrations is empty", () => {
			const { registrationStore } = setup({ roomRegistrations: [] });

			const result = registrationStore.getRegistrationById("1");

			expect(result).toBeUndefined();
		});
	});

	describe("getEmailOfRegistration", () => {
		it("should return email when registration exists", () => {
			const registrations = createRegistrations();
			const { registrationStore } = setup({ roomRegistrations: registrations });

			const result = registrationStore.getEmailOfRegistration(registrations[0].id);

			expect(result).toBe(registrations[0].email);
		});

		it("should return empty string when registration does not exist", () => {
			const registrations = createRegistrations(1);
			const { registrationStore } = setup({ roomRegistrations: registrations });
			const result = registrationStore.getEmailOfRegistration("999");

			expect(result).toBe("");
		});

		it("should return empty string when registrationId is empty string", () => {
			const registrations = createRegistrations(1);
			const { registrationStore } = setup({ roomRegistrations: registrations });

			const result = registrationStore.getEmailOfRegistration("");

			expect(result).toBe("");
		});

		it("should return empty string when roomRegistrations is empty", () => {
			const { registrationStore } = setup({ roomRegistrations: [] });

			const result = registrationStore.getEmailOfRegistration("1");

			expect(result).toBe("");
		});

		it("should return empty string when registration exists but has no email", () => {
			const registrations = [{ id: "1", email: "", firstName: "John", lastName: "Doe" }] as RegistrationList;
			const { registrationStore } = setup({ roomRegistrations: registrations });

			const result = registrationStore.getEmailOfRegistration("1");

			expect(result).toBe("");
		});
	});

	describe("resetStore", () => {
		it("reset the store", async () => {
			const registrations = createRegistrations();
			const { registrationStore } = setup({ roomRegistrations: registrations });

			registrationStore.roomRegistrations = registrations;
			expect(registrationStore.roomRegistrations).toHaveLength(registrations.length);

			registrationStore.resetStore();
			expect(registrationStore.isLoading).toBe(false);
			expect(registrationStore.registrationSecret).toStrictEqual("");
			expect(registrationStore.userData).toBe(null);
			expect(registrationStore.roomRegistrations).toHaveLength(0);
			expect(registrationStore.selectedIds).toHaveLength(0);
		});
	});
});
