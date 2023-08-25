<template>
	<div class="grey lighten-4 pa-4 rounded">
		<SubmissionContentElementTitle />
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
		<date-time-picker
			class="mt-1"
			:dateTime="dueDate"
			:date-input-label="t('common.labels.date')"
			:time-input-label="t('common.labels.time')"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SubmissionContentElementMenu from "./SubmissionContentElementMenu.vue";
import SubmissionContentElementTitle from "./SubmissionContentElementTitle.vue";
import { DateTimePicker } from "@feature-date-time-picker";
import { useI18n } from "@/composables/i18n.composable";

export default defineComponent({
	name: "SubmissionContentElementEdit",
	components: {
		SubmissionContentElementMenu,
		SubmissionContentElementTitle,
		DateTimePicker,
	},
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
