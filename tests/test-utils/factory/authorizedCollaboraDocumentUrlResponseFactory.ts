import { AuthorizedCollaboraDocumentUrlResponse } from "@/fileStorageApi/v3";
import { Factory } from "fishery";

export const authorizedCollaboraDocumentUrlResponseFactory =
	Factory.define<AuthorizedCollaboraDocumentUrlResponse>(({ sequence }) => ({
		authorizedCollaboraDocumentUrl: `https://collabora.example.com/documents/${sequence}.odt`,
	}));
