import { AuthorizedCollaboraDocumentUrlResponse } from "@api-file-storage/models";
import { Factory } from "fishery";

export const authorizedCollaboraDocumentUrlResponseFactory =
	Factory.define<AuthorizedCollaboraDocumentUrlResponse>(({ sequence }) => ({
		authorizedCollaboraDocumentUrl: `https://collabora.example.com/documents/${sequence}.odt`,
	}));
