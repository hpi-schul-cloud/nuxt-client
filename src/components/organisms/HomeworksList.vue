<template>
	<v-container>
		<v-container v-if="homeworks.length === 0">
			<v-img :src="emptyStateImage" role="presentation" width="500px" />
			<h2 class="h4">{{ $t('pages.homeworks.emptyState') }}</h2>
		</v-container>

		<v-list v-if="homeworks.length > 0" subheader two-line>
			<v-subheader>{{ $t("pages.homeworks.subtitleOpen") }}</v-subheader>
			<template v-for="(homework, index) of homeworks">
				<v-list-item :key="homework._id" :href="'/homework/' + homework._id">
					<v-list-item-avatar>
						<img :src="taskImage" role="presentation" />
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
							v-text="
								$t('pages.homeworks.labels.due') + fromNow(homework.duedate)
							"
						/>
						<v-spacer />
						<v-badge v-if="false" color="error" dot inline></v-badge>
					</v-list-item-action>
				</v-list-item>
				<v-divider v-if="index < homeworks.length - 1" :key="index"></v-divider>
			</template>
		</v-list>
	</v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { fromNow } from "@plugins/datetime";
import taskImage from "@assets/img/courses/task-new.svg";
import emptyStateImage from "@assets/img/empty-state/tasks-empty.svg";

export default {
	components: {},
	data() {
		return {
			fromNow,
			taskImage,
			emptyStateImage
		};
	},
	computed: {
		...mapGetters("homeworks", {
			homeworks: "list",
		}),
	},
};
</script>
