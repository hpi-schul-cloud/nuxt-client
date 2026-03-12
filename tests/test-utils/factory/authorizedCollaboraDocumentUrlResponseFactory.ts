import { AuthorizedCollaboraDocumentUrlResponse } from "@api-file-storage";
import { Factory } from "fishery";

export const authorizedCollaboraDocumentUrlResponseFactory = Factory.define<AuthorizedCollaboraDocumentUrlResponse>(
	({ sequence }) => ({
		authorizedCollaboraDocumentUrl: `https://collabora.example.com/documents/${sequence}.odt`,
	})
);
