<template>
	<section class="homework-dashboard-teacher">
		<homeworks-list
			:homeworks="openHomeworks"
			:title="$t('pages.homeworks.subtitleAssigned')"
			type="teacher"
		/>
	</section>
</template>

<script>
import HomeworksList from "@components/organisms/HomeworksList";
import { mapGetters } from "vuex";

export default {
	components: { HomeworksList },
	computed: {
		...mapGetters("homeworks", {
			openHomeworks: "getOpenHomeworks",
		}),
	},
};
</script>
