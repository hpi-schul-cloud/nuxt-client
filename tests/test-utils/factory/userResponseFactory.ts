import { UserResponse } from "@api-server";
import { Factory } from "fishery";

export const userResponseFactory = Factory.define<UserResponse>(({ sequence }) => ({
	_id: `id-${sequence}`,
	firstName: `firstName${sequence}`,
	lastName: `lastName${sequence}`,
	email: `email${sequence}@example.com`,
	createdAt: new Date().toISOString(),
	birthday: new Date(1990, 0, 1).toISOString(),
	classes: [],
	consentStatus: "ok",
	preferences: {},
	consent: {
		userConsent: {
			form: "digital",
			privacyConsent: true,
			termsOfUseConsent: true,
			dateOfPrivacyConsent: new Date().toISOString(),
			dateOfTermsOfUseConsent: new Date().toISOString(),
		},
		parentConsents: [],
	},
	importHash: `importHash-${sequence}`,
	lastLoginSystemChange: new Date().toISOString(),
	outdatedSince: "",
}));
