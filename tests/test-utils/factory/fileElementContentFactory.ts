import { FileElementContent } from "@/generated/serverApi/v3";
import { Factory } from "fishery";

export const fileElementContent = Factory.define<FileElementContent>(() => ({
	caption: "caption",
	alternativeText: "alternativeText",
}));
