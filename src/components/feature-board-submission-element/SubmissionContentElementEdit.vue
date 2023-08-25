<template>
	<div class="grey lighten-4 pa-4 rounded">
		<v-card-title
			class="pa-0"
			data-testid="board-submission-element-edit"
			inactive
		>
			<v-icon
				color="black"
				size="18"
				class="mr-2"
				data-testid="board-submission-element-edit-icon"
			>
				$mdiLightbulbOnOutline
			</v-icon>
			<span
				class="subtitle-1 d-inline-block text-truncate black--text font-weight-bold"
				data-testid="board-submission-element-edit-content"
			>
				{{ $t("components.cardElement.submissionElement") }}
			</span>
			<div class="menu">
				<SubmissionContentElementMenu
					:isFirstElement="isFirstElement"
					:isLastElement="isLastElement"
					:hasMultipleElements="hasMultipleElements"
					@move-down:element="onMoveElementDown"
					@move-up:element="onMoveElementUp"
					@delete:element="onDeleteElement"
				/>
			</div>
		</v-card-title>
		<date-time-picker
			:date-input-label="t('common.labels.date')"
			:time-input-label="t('common.labels.time')"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SubmissionContentElementMenu from "./SubmissionContentElementMenu.vue";
import { DateTimePicker } from "@feature-date-time-picker";
import { useI18n } from "@/composables/i18n.composable";

export default defineComponent({
	name: "SubmissionContentElementEdit",
	components: { SubmissionContentElementMenu, DateTimePicker },
	props: {
		dueDate: {
			type: String,
			required: true,
		},
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: ["delete:element", "move-down:element", "move-up:element"],
	setup(props, { emit }) {
		const { t } = useI18n();

		const onMoveElementDown = () => {
			emit("move-down:element");
		};

		const onMoveElementUp = () => {
			emit("move-up:element");
		};

		const onDeleteElement = () => {
			emit("delete:element");
		};

		return {
			t,
			onMoveElementDown,
			onMoveElementUp,
			onDeleteElement,
		};
	},
});
</script>

<style lang="scss" scoped>
.menu {
	position: absolute;
	right: 4px;
	top: 4px;
}
</style>
