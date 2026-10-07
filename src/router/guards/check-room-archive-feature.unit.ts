import { checkRoomArchiveFeature } from "./check-room-archive-feature";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("checkRoomArchiveFeature Guard", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("should call next with no arguments when FEATURE_ROOM_ARCHIVE_ENABLED is true", () => {
		createTestEnvStore({ FEATURE_ROOM_ARCHIVE_ENABLED: true });
		const next = checkRoomArchiveFeature();
		expect(next).toEqual(true);
	});

	it("should call next with correct arguments when FEATURE_ROOM_ARCHIVE_ENABLED is false", () => {
		createTestEnvStore({ FEATURE_ROOM_ARCHIVE_ENABLED: false });
		const next = checkRoomArchiveFeature();
		expect(next).toEqual("/rooms");
	});
});
