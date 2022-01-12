<template>
	<v-hover v-model="onHover" :disabled="isMenuActive">
		<v-list-item
			:key="task.id"
			class="mx-n4 mx-sm-0"
			v-bind="$attrs"
			:ripple="false"
			@click="onTaskItemClick"
		>
			<v-list-item-avatar>
				<v-icon class="fill" :color="iconColor">{{ avatarIcon }}</v-icon>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-subtitle class="d-inline-flex">
					<span class="text-truncate" data-testid="taskSubtitle">{{
						courseName
					}}</span>
					{{
						`&nbsp;– ${computedDueDateLabel(
							task.duedate,
							(shorten = $vuetify.breakpoint.xsOnly)
						)}`
					}}
				</v-list-item-subtitle>
				<v-list-item-title data-testid="taskTitle" v-text="task.name" />
				<v-list-item-subtitle class="d-inline-flex">
					<span class="text-truncate">{{ topic }}</span>
				</v-list-item-subtitle>
				<v-list-item-subtitle class="hidden-sm-and-up text--primary text-wrap">
					<i18n path="components.molecules.VTaskItemTeacher.status">
						<template #submitted>{{ task.status.submitted }}</template>
						<template #max>{{ task.status.maxSubmissions }}</template>
						<template #graded>{{ task.status.graded }}</template>
					</i18n>
				</v-list-item-subtitle>
			</v-list-item-content>
			<section v-if="!isDraft" class="mr-13">
				<v-list-item-action class="hidden-xs-only ml-4">
					<v-list-item-subtitle>{{
						$t("components.molecules.VTaskItemTeacher.submitted")
					}}</v-list-item-subtitle>
					<v-list-item-title data-testid="taskSubmitted"
						>{{ task.status.submitted }}/{{
							task.status.maxSubmissions
						}}</v-list-item-title
					>
				</v-list-item-action>
				<v-list-item-action class="hidden-xs-only">
					<v-list-item-subtitle>{{
						$t("components.molecules.VTaskItemTeacher.graded")
					}}</v-list-item-subtitle>
					<v-list-item-title data-testid="taskGraded">{{
						task.status.graded
					}}</v-list-item-title>
				</v-list-item-action>
			</section>
			<v-list-item-action>
				<v-menu
					bottom
					left
					offset-y
					close-on-click
					:class="onHover ? 'menu-visible' : 'menu-hidden'"
					@update:return-value="handleHover(true)"
				>
					<template v-slot:activator="{ on, attrs, value }">
						<v-btn
							class="context-menu-btn"
							v-bind="attrs"
							icon
							:data-testId="`task-menu-${task.name}`"
							v-on="on"
							@click="handleHover(value)"
						>
							<v-icon>{{ mdiDotsVertical }}</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item
							:href="`${taskHref(task.id)}/edit`"
							class="task-action"
							:data-testId="`task-edit-${task.name}`"
						>
							<v-list-item-title>
								<v-icon class="task-action-icon">
									{{ mdiPencilOutline }}
								</v-icon>
								{{ $t("common.actions.edit") }}
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-list-item-action>
		</v-list-item>
	</v-hover>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import { printDateFromStringUTC } from "@plugins/datetime";
import { mdiDotsVertical, mdiPencilOutline } from "@mdi/js";

// TODO - different requiredKeys for finished and other tasks?
// const taskRequiredKeys = ["courseName", "createdAt", "id", "name", "status"];
const taskRequiredKeys = ["createdAt", "id", "name"];

export default {
	components: {},
	props: {
		task: {
			type: Object,
			required: true,
			validator: (task) => taskRequiredKeys.every((key) => key in task),
		},
	},
	data() {
		return {
			fromNow,
			mdiDotsVertical,
			mdiPencilOutline,
			isMenuActive: false,
			onHover: true,
		};
	},
	computed: {
		avatarIcon() {
			return this.isDraft ? "$taskDraft" : "$taskOpenFilled";
		},
		iconColor() {
			return this.task.displayColor || this.defaultIconColor;
		},
		defaultIconColor() {
			return "#54616e";
		},
		isDraft() {
			return this.task.status.isDraft;
		},
		courseName() {
			const baseName =
				this.task.courseName || this.$t("pages.tasks.labels.noCourse");
			const prefix =
				this.task.status.isSubstitutionTeacher === true
					? this.$t("common.words.substitute") + " "
					: "";

			return `${prefix}${baseName}`;
		},
		topic() {
			return this.task.description
				? `${this.$t("pages.tasks.subtitleTopic")} ${this.task.description}`
				: "";
		},
	},
	mounted() {
		this.handleHover(true);
	},
	methods: {
		computedDueDateLabel(dueDate) {
			if (!dueDate) {
				return this.$t("pages.tasks.labels.noDueDate");
			} else {
				return (
					this.$t("pages.tasks.labels.due") + printDateFromStringUTC(dueDate)
				);
			}
		},
		taskHref: (id) => {
			return `/homework/${id}`;
		},
		onTaskItemClick() {
			this.$router.push(this.taskHref(this.task.id));
		},

		handleHover(value) {
			const stateValue = this.$vuetify.breakpoint.mobile ? true : !value;
			this.$set(this, "isMenuActive", stateValue);
			this.$set(this, "onHover", stateValue);
		},
	},
};
</script>

<style lang="scss" scoped>
.fill {
	fill: currentColor;
}

// stylelint-disable sh-waqar/declaration-use-variable
.task-action {
	min-height: 25px;
}

.task-action-icon {
	width: 1rem;
	height: 1rem;
	margin-top: -2px;
	margin-right: 4px;
	font-size: 1rem;
	color: rgba(0, 0, 0, 0.87);
}

.menu-visible {
	visibility: visible;
}

.menu-hidden {
	visibility: hidden;
}
</style>
