import { MediaSchoolLicenseResponse } from "@/serverApi/v3";
import { Factory } from "fishery";

export const mediaSchoolLicenseResponseFactory =
	Factory.define<MediaSchoolLicenseResponse>(({ sequence }) => ({
		mediumId: "123421",
		mediaSourceId: "vidis.fwu.de",
		mediaSourceName: "VIDIS",
		schoolId: "schoolId",
		id: `media-id-${sequence}`,
	}));
