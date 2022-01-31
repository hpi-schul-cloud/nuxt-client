<template>
	<v-menu v-click-outside="() => toggleMenu(false)" bottom left offset-y attach>
		<template v-slot:activator="{ on, attrs, value }">
			<v-btn
				v-show="isMenuActive || isHovering || isFocused"
				id="task-menu-btn"
				v-bind="attrs"
				icon
				:data-testId="`task-menu-${task.name}`"
				v-on="on"
				@click.prevent="(e) => toggleMenu(!value, e)"
				@keydown.space.stop="toggleMenu(!value)"
				@focus="handleFocus(true)"
				@blur="handleFocus(false)"
			>
				<v-icon>{{ mdiDotsVertical }}</v-icon>
			</v-btn>
		</template>
		<v-list>
			<v-list-item
				:href="editLink"
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
			<v-list-item
				class="task-action"
				:data-testId="`task-finish-${task.name}`"
				@click.stop.prevent="handleFinish"
			>
				<v-list-item-title>
					<template v-if="task.status.isFinished">
						<v-icon class="task-action-icon">{{ mdiUndo }}</v-icon>
						Wiederherstellen
					</template>
					<template v-else>
						<v-icon class="task-action-icon"> $taskFinished </v-icon>
						Abschließen
					</template>
				</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
import { mdiDotsVertical, mdiPencilOutline, mdiUndo } from "@mdi/js";
import FinishedTaskModule from "@/store/finished-tasks";

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
		} /* 
		show: {
			type: Boolean,
			required: true,
		}, */,
		isHovering: {
			type: Boolean,
			required: true,
		},
		isFocused: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			mdiDotsVertical,
			mdiPencilOutline,
			mdiUndo,
			isMenuActive: false,
			isActive: false,
		};
	},
	computed: {
		editLink() {
			return `/homework/${this.task.id}/edit`;
		},
	},
	methods: {
		toggleMenu(stateValue, e) {
			console.log(e, !stateValue);
			this.isMenuActive = stateValue;
		},
		handleFocus(value) {
			this.isActive = value;
		},
		handleFinish() {
			if (this.task.status.isFinished) {
				FinishedTaskModule.restoreTask(this.task.id);
			} else {
				FinishedTaskModule.finishTask(this.task.id);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
// stylelint-disable sh-waqar/declaration-use-variable
.context-menu-btn {
	min-width: 45px;
}

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
</style>
