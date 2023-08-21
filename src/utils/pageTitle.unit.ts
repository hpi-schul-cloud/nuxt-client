import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { buildPageTitle } from "./pageTitle";
import { Envs } from "@/store/types/env-config";

describe("pageTitle", () => {
	const instanceTitle = "mockedTitle";

	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
		envConfigModule.setEnvs({ SC_TITLE: instanceTitle } as Envs);
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
