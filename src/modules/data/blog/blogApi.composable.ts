import { BlogApiFactory, BlogFeedDataResponse } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

const stripHTML = (html: string) => {
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = html;
	return tempDiv.textContent || tempDiv.innerText || "";
};

export const useBlogApi = () => {
	const blogApi = BlogApiFactory(undefined, "/v3", $axios);

	const fetchBlogFeedData = async (): Promise<BlogFeedDataResponse[]> => {
		const response = await blogApi.blogControllerFetchBlogFeed();

		/*
		 FIXME: this should be done in the backend, but I cannot find an elegant solution to both strip html and decode
		 the double encoded characters gotten from the blog sites, putting in the the "document" decodes them properly
		 */
		response.data.blogFeed.forEach((feedData) => {
			feedData.description = stripHTML(feedData.description);
		});

		return response.data.blogFeed;
	};

	return {
		fetchBlogFeedData,
	};
};
