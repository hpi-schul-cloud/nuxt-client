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
import { useToolConfigurationStatus } from "@data-external-tool";
import { ToolConfigurationStatus } from "@/store/external-tool";

export default defineComponent({
	components: {
		WarningAlert,
	},
	props: {
		error: {
			type: Object as PropType<BusinessError>,
		},
		toolOutdatedStatus: {
			type: Object as PropType<ToolConfigurationStatus | undefined>,
			required: true,
		},
	},
	setup(props) {
		const { t } = useI18n();

		const { determineOutdatedTranslationKey } = useToolConfigurationStatus();

		const { isTeacher } = useBoardPermissions();

		const isToolOutdated: ComputedRef<boolean> = computed(
			() =>
				(props.toolOutdatedStatus?.isOutdatedOnScopeSchool ||
					props.toolOutdatedStatus?.isOutdatedOnScopeContext) ??
				false
		);

		const errorMessage: ComputedRef<string> = computed(() =>
			isTeacher
				? "feature-board-external-tool-element.alert.error.teacher"
				: "feature-board-external-tool-element.alert.error.student"
		);

		const outdatedMessage: ComputedRef<string> = computed(() => {
			const translationKey = determineOutdatedTranslationKey(
				props.toolOutdatedStatus
			);

			return t(translationKey);
		});

		return {
			t,
			errorMessage,
			outdatedMessage,
			isToolOutdated,
		};
	},
});
</script>
