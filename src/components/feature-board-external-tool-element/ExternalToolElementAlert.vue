<template>
	<div>
		<WarningAlert v-if="error">
			{{ t(errorMessage) }}
		</WarningAlert>

		<WarningAlert v-if="isToolOutdated">
			{{ t(outdatedMessage) }}
		</WarningAlert>
	</div>
</template>

<script lang="ts">
import { useI18n } from "@/composables/i18n.composable";
import { BusinessError } from "@/store/types/commons";
import { useBoardPermissions } from "@data-board";
import { WarningAlert } from "@ui-alert";
import { computed, ComputedRef, defineComponent, PropType } from "vue";

export default defineComponent({
	components: {
		WarningAlert,
	},
	props: {
		error: {
			type: Object as PropType<BusinessError>,
		},
		isToolOutdated: {
			type: Boolean,
		},
		toolOutdatedTranslationkey: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const { t } = useI18n();

		const { isTeacher } = useBoardPermissions();

		const errorMessage: ComputedRef<string> = computed(() =>
			isTeacher
				? "feature-board-external-tool-element.alert.error.teacher"
				: "feature-board-external-tool-element.alert.error.student"
		);

		const outdatedMessage: ComputedRef<string> = computed(() => {
			return props.toolOutdatedTranslationkey;
		});

		return {
			t,
			errorMessage,
			outdatedMessage,
		};
	},
});
</script>
