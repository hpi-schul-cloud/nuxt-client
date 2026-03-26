import { ConsentVersion } from "@data-school";
import { Factory } from "fishery";

const consentVersionFactory = Factory.define<ConsentVersion>(({ sequence }) => {
	const schoolId = `schoolId #${sequence}`;
	return {
		_id: `consentVersion #${sequence}`,
		schoolId,
		title: `title #${sequence}`,
		consentText: `text #${sequence}`,
		publishedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		consentTypes: ["privacy", "termsOfUse"],
		consentData: {
			_id: `consentDataId #${sequence}`,
			schoolId,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			filename: `filename #${sequence}`,
			filetype: "pdf",
			data: "data:application/pdf;base64,",
		},
	};
});

export const privacyPolicyFactory = consentVersionFactory.params({
	consentTypes: ["privacy"],
	consentData: {
		filename: "Privacy Policy",
	},
});

export const termsOfUseFactory = consentVersionFactory.params({
	consentTypes: ["termsOfUse"],
	consentData: {
		filename: "Terms of Use",
	},
});
