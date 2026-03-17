import { FileElementContent } from "@api-server";
import { Factory } from "fishery";

export const fileElementContent = Factory.define<FileElementContent>(() => ({
	caption: "caption",
	alternativeText: "alternativeText",
}));
