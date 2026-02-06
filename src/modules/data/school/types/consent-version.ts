export type Base64File = {
	_id: string;
	schoolId: string;
	createdAt: string;
	updatedAt: string;
	fileType: string;
	fileName: string;
	data: string;
};

export type ConsentVersion = {
	_id: string;
	schoolId: string;
	title: string;
	consentText?: string;
	publishedAt: string;
	createdAt: string;
	updatedAt: string;
	consentTypes: ("privacy" | "termsOfUse")[];
	consentData: Base64File;
};

export type CreateConsentVersionPayload = {
	title: string;
	consentText?: string;
	schoolId: string;
	publishedAt: string;
	consentTypes: ("privacy" | "termsOfUse")[];
	consentData: string;
};
