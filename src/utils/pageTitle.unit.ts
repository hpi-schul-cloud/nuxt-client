import { buildPageTitle } from "./pageTitle";
import { createTestEnvStore } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { beforeAll } from "vitest";

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

	describe("when parent title is passed", () => {
		it("should set page title with parent title", () => {
			const parentTitle = "parentTitle";
			const pageTitle = buildPageTitle(undefined, parentTitle);
			expect(pageTitle).toEqual(`${parentTitle} - ${instanceTitle}`);
		});
	});

	describe("when custom page title is passed", () => {
		it("should add prefix to default page title", () => {
			const customPageTitle = "customPageTitle";
			const pageTitle = buildPageTitle(customPageTitle);
			expect(pageTitle).toEqual(`${customPageTitle} - ${instanceTitle}`);
		});
	});

	describe("when custom page title and parent title are passed", () => {
		it("should include both titles in the page title", () => {
			const customPageTitle = "customPageTitle";
			const parentTitle = "parentTitle";
			const pageTitle = buildPageTitle(customPageTitle, parentTitle);
			expect(pageTitle).toEqual(`${customPageTitle} - ${parentTitle} - ${instanceTitle}`);
		});
	});
});
