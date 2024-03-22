import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { envsFactory } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { buildPageTitle } from "./pageTitle";

describe("pageTitle", () => {
	const instanceTitle = "mockedTitle";

	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
		const envs = envsFactory.build({
			SC_TITLE: instanceTitle,
		});
		envConfigModule.setEnvs(envs);
	});

	it("should set default page title", async () => {
		const pageTitle = buildPageTitle();
		expect(pageTitle).toBe(instanceTitle);
	});

	it("should add prefix to default page title if custom page title is passed", async () => {
		const customPageTitle = "customPageTitle";
		const pageTitle = buildPageTitle(customPageTitle);
		expect(pageTitle).toEqual(`${customPageTitle} - ${instanceTitle}`);
	});
});
