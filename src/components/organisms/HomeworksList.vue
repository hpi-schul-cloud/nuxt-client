<template>
	<v-list subheader two-line>
		<template v-for="(homework, index) of homeworks">
			<v-list-item :key="homework._id" :href="'/homework/' + homework._id">
				<v-list-item-avatar>
					<img :src="taskImage" />
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title
						class="text-wrap"
						v-text="homework.name"
					></v-list-item-title>
					<v-list-item-subtitle class="text-wrap">
						Kursname
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-badge color="error" dot inline></v-badge>
					<v-spacer />
					<v-list-item-action-text
						v-text="
							$t('pages.homeworks.labels.due') + fromNow(homework.dueDate)
						"
					/>
				</v-list-item-action>
			</v-list-item>
			<v-divider v-if="index < homeworks.length - 1" :key="index"></v-divider>
		</template>
	</v-list>
</template>

<script>
import { mapGetters } from "vuex";
import { fromNow } from "@plugins/datetime";
import taskImage from "@assets/img/courses/task-new.svg";

export default {
	components: {},
	data() {
		return {
			fromNow,
			taskImage: taskImage,
		};
	},
	computed: {
		...mapGetters("homeworks", {
			homeworks: "list",
		}),
	},
};
</script>
