import { checkRegisterExternalPersonsFeature } from "./check-register-external-persons-feature";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { RouteLocationNormalized } from "vue-router";

vi.mock("@/utils/inject");

describe("checkRegisterExternalPersonsFeature Guard", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("should call next with no arguments when FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED is true", () => {
		createTestEnvStore({ FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED: true });

		const to = {} as RouteLocationNormalized;
		const from = {} as RouteLocationNormalized;
		const next = vi.fn();

		checkRegisterExternalPersonsFeature(to, from, next);
		expect(next).toHaveBeenCalledWith();
	});

	it("should call next with correct arguments when FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED is false", () => {
		createTestEnvStore({ FEATURE_ROOM_REGISTER_EXTERNAL_PERSONS_ENABLED: false });

		const to = {} as RouteLocationNormalized;
		const from = {} as RouteLocationNormalized;
		const next = vi.fn();

		checkRegisterExternalPersonsFeature(to, from, next);
		expect(next).toHaveBeenCalledWith("/");
	});
});
