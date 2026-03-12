import { LinkElementContent } from "@api-server";
import { Factory } from "fishery";

export const linkElementContentFactory = Factory.define<LinkElementContent>(({ sequence }) => ({
	title: `name${sequence}`,
	url: "https://de.wikipedia.org/wiki/Meeresschildkr%C3%B6ten",
}));
