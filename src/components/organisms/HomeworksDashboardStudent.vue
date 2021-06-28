<template>
	<section class="homework-dashboard-student">
		<homeworks-list
			:homeworks="openHomeworks"
			:title="$t('pages.homeworks.subtitleOpen')"
			:type="'student'"
		/>
		<homeworks-list
			:homeworks="overDueHomeworks"
			:title="$t('pages.homeworks.student.subtitleOverDue')"
			:type="'student'"
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
			overDueHomeworks: "getOverDueHomeworks",
		}),
	},
};
</script>
