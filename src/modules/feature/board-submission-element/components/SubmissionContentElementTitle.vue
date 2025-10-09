<template>
	<v-card-title class="pa-0 d-flex align-center" data-testid="board-submission-element-edit" inactive>
		<v-icon size="18" class="mr-2" data-testid="board-submission-element-edit-icon" :icon="mdiLightbulbOnOutline" />
		<span
			class="text-subtitle-1 d-inline-block text-truncate font-weight-bold"
			data-testid="board-submission-element-edit-content"
		>
			{{ t("components.cardElement.submissionElement") }}
		</span>
	</v-card-title>
</template>

<script lang="ts">
import { mdiLightbulbOnOutline } from "@icons/material";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "SubmissionContentElementTitle",
	setup() {
		const { t } = useI18n();
		return {
			mdiLightbulbOnOutline,
			t,
		};
	},
});
</script>
