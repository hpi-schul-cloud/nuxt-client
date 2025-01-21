import { envConfigModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import { envsFactory } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
import { getSupportMail } from "./mail.helper";

describe("getSupportMail", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	const setupEnv = (mail = "") => {
		const envs = envsFactory.build({
			SC_CONTACT_EMAIL: mail,
		});
		envConfigModule.setEnvs(envs);
	};

	describe("when environment variable is a valid email", () => {
		it("should use correct values from contactEmail and mailtocontactEmail", () => {
			const envSupportEmail = "support@example.com";
			setupEnv(envSupportEmail);

			const expectedMailto = `mailto:${envSupportEmail}`;

			const { supportMail, mailtoSupportMail } = getSupportMail();
			expect(mailtoSupportMail).toBe(expectedMailto);
			expect(supportMail).toBe(envSupportEmail);
		});
	});

	describe("when environment variable is no valid email", () => {
		it("should not use environment variable", () => {
			setupEnv("invalid_email");

			const fallbackEmail = "support@dbildungscloud.de";
			const expectedMailto = `mailto:${fallbackEmail}`;

			const { supportMail, mailtoSupportMail } = getSupportMail();
			expect(supportMail).toBe(fallbackEmail);
			expect(mailtoSupportMail).toBe(expectedMailto);
		});
	});
});
