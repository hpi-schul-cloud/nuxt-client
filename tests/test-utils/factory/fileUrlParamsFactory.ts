import { FileUrlParams } from "@/fileStorageApi/v3";
import { Factory } from "fishery";

export const fileUrlParamsFactory = Factory.define<FileUrlParams>(({ sequence }) => ({
	url: `https://example.com/file${sequence}`,
	fileName: `file${sequence}.txt`,
	headers: {
		"User-Agent": "Embed Request User Agent",
	},
}));
