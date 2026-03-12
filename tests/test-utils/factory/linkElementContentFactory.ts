import { Factory } from "fishery";
import { LinkElementContent } from "@api-server";

export const linkElementContentFactory = Factory.define<LinkElementContent>(
	({ sequence }) => ({
		title: `name${sequence}`,
		url: "https://de.wikipedia.org/wiki/Meeresschildkr%C3%B6ten",
	})
);
