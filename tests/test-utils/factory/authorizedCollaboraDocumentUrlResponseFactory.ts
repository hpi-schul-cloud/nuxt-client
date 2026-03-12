import { AuthorizedCollaboraDocumentUrlResponse } from "@/generated/fileStorageApi/v3/models";
import { Factory } from "fishery";

export const authorizedCollaboraDocumentUrlResponseFactory =
	Factory.define<AuthorizedCollaboraDocumentUrlResponse>(({ sequence }) => ({
		authorizedCollaboraDocumentUrl: `https://collabora.example.com/documents/${sequence}.odt`,
	}));
