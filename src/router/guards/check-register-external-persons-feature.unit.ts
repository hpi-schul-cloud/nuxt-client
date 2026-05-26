import { checkRegisterExternalPersonsFeature } from "./check-register-external-persons-feature";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("checkRegisterExternalPersonsFeature Guard", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("should call next with no arguments when FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED is true", () => {
		createTestEnvStore({ FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED: true });
		const next = checkRegisterExternalPersonsFeature();
		expect(next).toEqual(true);
	});

	it("should call next with correct arguments when FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED is false", () => {
		createTestEnvStore({ FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED: false });
		const next = checkRegisterExternalPersonsFeature();
		expect(next).toEqual("/");
	});
});
