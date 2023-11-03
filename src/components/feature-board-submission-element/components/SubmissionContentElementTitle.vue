<template>
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
			{{ t("components.cardElement.submissionElement") }}
		</span>
	</v-card-title>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "SubmissionContentElementTitle",
	setup() {
		const { t } = useI18n();
		return {
			t,
		};
	},
});
</script>
