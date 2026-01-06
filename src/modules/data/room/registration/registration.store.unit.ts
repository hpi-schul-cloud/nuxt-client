import { useRoomDetailsStore } from "../RoomDetails.store";
import { type RegistrationList, useRegistrationStore } from "./registration.store";
import { useI18nGlobal } from "@/plugins/i18n";
import * as serverApi from "@/serverApi/v3/api";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import {
	axiosErrorFactory,
	expectNotification,
	mockedPiniaStoreTyping,
	registrationFactory,
	roomFactory,
} from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";

vi.mock("@/plugins/i18n");
(useI18nGlobal as Mock).mockReturnValue({ t: (key: string) => key });

describe("registration.store", () => {
	let registrationApi: DeepMocked<serverApi.RegistrationApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		registrationApi = createMock<serverApi.RegistrationApiInterface>();
		vi.spyOn(serverApi, "RegistrationApiFactory").mockReturnValue(registrationApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: { registrationSecret?: string; registrations?: RegistrationList }) => {
		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		roomDetailsStore.room = roomFactory.build();

		const registrationStore = mockedPiniaStoreTyping(useRegistrationStore);

		if (options?.registrationSecret !== undefined) {
			registrationStore.registrationSecret = options.registrationSecret;
		}

		if (options?.registrations) {
			registrationStore.registrations = options.registrations;
		}

		return { registrationStore, roomDetailsStore };
	};

	describe("fetchRegistrationsForCurrentRoom", () => {
		describe("when successful", () => {
			it("should store registrations for current room", async () => {
				const registration = registrationFactory.buildList(1)[0];
				const { registrationStore, roomDetailsStore } = setup({ registrations: [registration] });

				registrationApi.registrationControllerFindByRoom.mockResolvedValueOnce([registration]);

				await registrationStore.fetchRegistrationsForCurrentRoom();

				expect(registrationApi.registrationControllerFindByRoom).toHaveBeenCalledWith(roomDetailsStore.room?.id);
				expect(registrationStore.registrations).toEqual([registration]);
			});
		});

		describe("when error happens", () => {
			it("should notify", async () => {
				const { registrationStore, roomDetailsStore } = setup();

				registrationApi.registrationControllerFindByRoom.mockResolvedValueOnce(new Error("Error"));

				await registrationStore.fetchRegistrationsForCurrentRoom();

				expect(registrationApi.registrationControllerFindByRoom).toHaveBeenCalledWith(roomDetailsStore.room?.id);
				expectNotification("error");
			});
		});
	});

	describe("fetchUserData", () => {
		describe("when successful", () => {
			it("stores user data", async () => {
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
		});

		describe("when 404 error happens", () => {
			it("shows error notification and sets hasApiErrorOccurred", async () => {
				const mockedSecret = "secret-123";
				const { registrationStore } = setup({ registrationSecret: mockedSecret });
				expect(registrationStore.hasApiErrorOccurred).toBe(false);

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.NotFound).build();
				registrationApi.registrationControllerGetBySecret.mockRejectedValueOnce(axiosError);

				await registrationStore.fetchUserData();

				expect(registrationApi.registrationControllerGetBySecret).toHaveBeenCalledWith(mockedSecret);
				expectNotification("error");
				expect(registrationStore.hasApiErrorOccurred).toBe(true);
			});
		});

		describe("when other error happens", () => {
			it("shows error notification and sets hasApiErrorOccurred", async () => {
				const mockedSecret = "secret-123";
				const { registrationStore } = setup({ registrationSecret: mockedSecret });
				expect(registrationStore.hasApiErrorOccurred).toBe(false);

				const axiosError = axiosErrorFactory.withStatusCode(HttpStatusCode.InternalServerError).build();
				registrationApi.registrationControllerGetBySecret.mockRejectedValueOnce(axiosError);

				await registrationStore.fetchUserData();

				expect(registrationApi.registrationControllerGetBySecret).toHaveBeenCalledWith(mockedSecret);
				expectNotification("error");
				expect(registrationStore.hasApiErrorOccurred).toBe(true);
			});
		});
	});

	describe("completeRegistration", () => {
		describe("when successful", () => {
			it("returns true", async () => {
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
		});

		describe("when error happens", () => {
			it("returns false and notifies", async () => {
				const { registrationStore } = setup({ registrationSecret: "secret-123" });

				registrationApi.registrationControllerCompleteRegistration.mockRejectedValueOnce(new Error("Error"));

				const result = await registrationStore.completeRegistration(serverApi.LanguageType.De, "badpassword");
				expect(result).toBe(false);
				expectNotification("error");
			});
		});
	});

	describe("removeInvitations", () => {
		describe("when successful", () => {
			it("removes invitation", async () => {
				const registration = registrationFactory.buildList(1)[0];
				const { registrationStore, roomDetailsStore } = setup({ registrations: [registration] });

				registrationApi.registrationControllerCancelRegistration.mockResolvedValueOnce({});

				await registrationStore.removeInvitations([registration.id]);

				expect(registrationApi.registrationControllerCancelRegistration).toHaveBeenCalledWith(
					registration.id,
					roomDetailsStore.room?.id
				);
				expect(registrationStore.registrations).not.toContainEqual(registration);
			});
		});

		describe("when error happens", () => {
			it("does not remove invitation and notifies", async () => {
				const { registrationStore } = setup();

				registrationApi.registrationControllerCancelRegistration.mockRejectedValueOnce(new Error("Error"));

				await registrationStore.removeInvitations(["random-registration-id"]);
				expectNotification("error");
			});
		});
	});

	describe("getRegistrationById", () => {
		describe("when id exists", () => {
			it("should return registration", () => {
				const registrations = registrationFactory.buildList(2);
				const { registrationStore } = setup({ registrations });

				const result = registrationStore.getRegistrationById(registrations[0].id);

				expect(result).toEqual(registrations[0]);
			});
		});

		describe("when id does not exist", () => {
			it("should return undefined", () => {
				const registrations = registrationFactory.buildList(1);
				const { registrationStore } = setup({ registrations });

				const result = registrationStore.getRegistrationById("999");

				expect(result).toBeUndefined();
			});
		});

		describe("when registrations is empty", () => {
			it("should return undefined", () => {
				const { registrationStore } = setup({ registrations: [] });

				const result = registrationStore.getRegistrationById("1");

				expect(result).toBeUndefined();
			});
		});
	});

	describe("getEmailOfRegistration", () => {
		describe("when registration exists", () => {
			it("should return email", () => {
				const registrations = registrationFactory.buildList(2);
				const { registrationStore } = setup({ registrations });

				const result = registrationStore.getEmailOfRegistration(registrations[0].id);

				expect(result).toBe(registrations[0].email);
			});
		});

		describe("when registration does not exist", () => {
			it("should return empty string", () => {
				const registrations = registrationFactory.buildList(1);
				const { registrationStore } = setup({ registrations });
				const result = registrationStore.getEmailOfRegistration("999");

				expect(result).toBe("");
			});
		});

		describe("when registrationId is empty string", () => {
			it("should return empty string", () => {
				const registrations = registrationFactory.buildList(1);
				const { registrationStore } = setup({ registrations });

				const result = registrationStore.getEmailOfRegistration("");

				expect(result).toBe("");
			});
		});

		describe("when registrations is empty", () => {
			it("should return empty string", () => {
				const { registrationStore } = setup({ registrations: [] });

				const result = registrationStore.getEmailOfRegistration("1");

				expect(result).toBe("");
			});
		});

		describe("when registration exists but has no email", () => {
			it("should return empty string", () => {
				const registrations = [{ id: "1", email: "", firstName: "John", lastName: "Doe" }] as RegistrationList;
				const { registrationStore } = setup({ registrations });

				const result = registrationStore.getEmailOfRegistration("1");

				expect(result).toBe("");
			});
		});
	});

	describe("resendInvitations", () => {
		describe("when successful", () => {
			it("resends invitations", async () => {
				const registrations = registrationFactory.buildList(2);
				const { registrationStore, roomDetailsStore } = setup({ registrations });

				registrationApi.registrationControllerResendRegistrationMail.mockResolvedValueOnce({});
				registrationApi.registrationControllerResendRegistrationMail.mockResolvedValueOnce({});

				await registrationStore.resendInvitations([registrations[0].id, registrations[1].id]);

				expect(registrationApi.registrationControllerResendRegistrationMail).toHaveBeenCalledWith(
					registrations[0].id,
					roomDetailsStore.room?.id
				);
				expect(registrationApi.registrationControllerResendRegistrationMail).toHaveBeenCalledWith(
					registrations[1].id,
					roomDetailsStore.room?.id
				);
			});

			it("fetches updated registrations after resending", async () => {
				const registrations = registrationFactory.buildList(1);
				const { registrationStore, roomDetailsStore } = setup({ registrations });

				registrationApi.registrationControllerResendRegistrationMail.mockResolvedValueOnce({});

				await registrationStore.resendInvitations([registrations[0].id]);

				expect(registrationApi.registrationControllerFindByRoom).toHaveBeenCalledWith(roomDetailsStore.room?.id);
			});
		});

		describe("when resentAt is within 2 minutes", () => {
			it("does not resend invitations and notifies as info", async () => {
				const now = new Date();
				const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000).toISOString();

				const registrations = registrationFactory.buildList(1, {
					resentAt: oneMinuteAgo,
				});
				const { registrationStore } = setup({ registrations });

				await registrationStore.resendInvitations([registrations[0].id]);

				expect(registrationApi.registrationControllerResendRegistrationMail).not.toHaveBeenCalled();
				expectNotification("info");
			});
		});

		describe("when error happens", () => {
			it("notifies", async () => {
				const registrations = registrationFactory.buildList(1);
				const { registrationStore } = setup({ registrations });

				registrationApi.registrationControllerResendRegistrationMail.mockRejectedValueOnce(new Error("Error"));

				await registrationStore.resendInvitations([registrations[0].id]);

				expectNotification("error");
			});
		});
	});

	describe("resetStore", () => {
		it("reset the store", async () => {
			const registrations = registrationFactory.buildList(2);
			const { registrationStore } = setup({ registrations });

			registrationStore.registrations = registrations;
			expect(registrationStore.registrations).toHaveLength(registrations.length);

			registrationStore.resetStore();
			expect(registrationStore.isLoading).toBe(false);
			expect(registrationStore.registrationSecret).toStrictEqual("");
			expect(registrationStore.userData).toBe(null);
			expect(registrationStore.registrations).toHaveLength(0);
			expect(registrationStore.selectedIds).toHaveLength(0);
		});
	});
});
