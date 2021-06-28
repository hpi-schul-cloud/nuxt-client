<template>
	<v-chip
		small
		class="mr-2 mt-2"
		:color="rssFeedStatusColor(rssFeedStatus)"
		text-color="black"
	>
		{{
			rssFeedStatus === "pending"
				? $t("pages.administration.school.index.rssFeeds.status.inQueue")
				: rssFeedStatus === "success"
				? $t("pages.administration.school.index.rssFeeds.status.active")
				: $t("pages.administration.school.index.rssFeeds.status.error")
		}}
	</v-chip>
</template>

<script>
export default {
	props: {
		rssFeedStatus: {
			type: String,
			required: true,
		},
	},
	methods: {
		rssFeedStatusColor(rssFeedStatus) {
			return rssFeedStatus === "pending"
				? "orange lighten-3"
				: rssFeedStatus === "success"
				? "green lighten-3"
				: "error lighten-5";
		},
	},
};
</script>
