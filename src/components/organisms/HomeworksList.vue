<template>
	<v-list subheader two-line>
		<v-subheader v-if="homeworks.length > 0">
			{{ $t("pages.homeworks.subtitleOpen") }}
		</v-subheader>

		<template v-if="loading.homeworks">
			<h1>
				<v-skeleton-loader :type="'text'" :max-width="'30%'" />
			</h1>
			<v-skeleton-loader :type="'text'" :max-width="'15%'" />
			<v-skeleton-loader
				v-for="homework of 7"
				ref="skeleton"
				:key="homework"
				:type="'list-item-avatar-two-line'"
			/>
		</template>

		<template v-for="(homework, index) of homeworks" v-else>
			<v-list-item :key="homework._id" :href="homeworkHref(homework._id)">
				<v-list-item-avatar>
					<img :src="taskIconSvg" role="presentation" />
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-subtitle class="text-wrap">
						{{ homework.courseName }}
					</v-list-item-subtitle>
					<v-list-item-title
						class="text-wrap"
						v-text="homework.name"
					></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-list-item-action-text
						v-text="computedDueDateLabel(homework.duedate)"
					/>
					<v-spacer />
					<v-badge v-if="false" color="error" dot inline></v-badge>
				</v-list-item-action>
			</v-list-item>
			<v-divider v-if="index < homeworks.length - 1" :key="index"></v-divider>
		</template>
	</v-list>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import taskIconSvg from "@assets/img/courses/task-new.svg";
import { printDateTimeFromStringUTC } from "@plugins/datetime";
import { mapGetters } from "vuex";

export default {
	components: {},
	props: {
		homeworks: {
			type: Array,
			required: false,
			default: () => [],
		},
	},
	data() {
		return {
			fromNow,
			taskIconSvg,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			loading: "loading",
		}),
	},

	methods: {
		computedDueDateLabel(duedate) {
			if (!duedate) return this.$t("pages.homeworks.labels.noDueDate");

			if (new Date(duedate) >= new Date())
				return (
					this.$t("pages.homeworks.labels.due") +
					printDateTimeFromStringUTC(duedate)
				);
			else return this.$t("pages.homeworks.labels.overdue");
		},
		homeworkHref: (id) => {
			return "/homework/" + id;
		},
	},
};
</script>
