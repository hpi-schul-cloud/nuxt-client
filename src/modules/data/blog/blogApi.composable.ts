import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";

type BlogFeedResponseChannelItem = {
	title: string;
	pubDate: string;
	description: string;
	"media:content"?: { "@_url": string };
	link?: string;
};

type BlogFeedResponse = {
	rss: {
		channel: { item: BlogFeedResponseChannelItem[] };
	};
};

export type BlogFeedData = BlogFeedResponseChannelItem & {
	description: string;
	url: string;
	img: {
		src: string;
		alt: string;
	};
};

const stripHTML = (html: string) => {
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = html;
	return tempDiv.textContent || tempDiv.innerText || "";
};

export const useBlogApi = () => {
	const envConfigModule: EnvConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

	const fetchBlogFeedData = async (): Promise<BlogFeedData[]> => {
		const blogFeedUrl = new URL("/rss", envConfigModule.getGhostBaseUrl);

		const response = await axios.get<string>(blogFeedUrl.href, {
			timeout: 2000,
		});

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "@_",
		});
		const parsedResponse: BlogFeedResponse = parser.parse(response.data);

		const blogFeed = parsedResponse.rss.channel.item
			.filter((item) => item["media:content"] !== undefined && item.link)
			.slice(0, 3)
			.map((e) => {
				const date = new Date(e.pubDate);
				const locale = "en-us";
				const month = date.toLocaleString(locale, { month: "long" });

				const feedData: BlogFeedData = {
					...e,
					pubDate: `${date.getDate()}. ${month}`,
					description: stripHTML(e.description),
					url: e.link as string,
					img: {
						src: e["media:content"]?.["@_url"] as string,
						alt: e.title,
					},
				};

				return feedData;
			});

		return blogFeed;
	};

	return {
		fetchBlogFeedData,
	};
};
