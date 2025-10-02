import { createTestEnvStore } from "@@/tests/test-utils";
import { buildPageTitle } from "./pageTitle";
import { beforeAll } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

describe("pageTitle", () => {
	const instanceTitle = "mockedTitle";

	beforeAll(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			SC_TITLE: instanceTitle,
		});
	});

	it("should set default page title", () => {
		const pageTitle = buildPageTitle();
		expect(pageTitle).toBe(instanceTitle);
	});

	it("should add prefix to default page title if custom page title is passed", () => {
		const customPageTitle = "customPageTitle";
		const pageTitle = buildPageTitle(customPageTitle);
		expect(pageTitle).toEqual(`${customPageTitle} - ${instanceTitle}`);
	});
});
