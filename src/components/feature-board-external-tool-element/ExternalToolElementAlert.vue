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
import { ToolConfigurationStatus } from "../../store/external-tool";

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
		toolConfigurationStatus: {
			type: Object as PropType<ToolConfigurationStatus>,
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
			if (isTeacher) {
				if (
					props.toolConfigurationStatus?.isOutdatedOnScopeContext ||
					props.toolConfigurationStatus?.isOutdatedOnScopeSchool
				) {
					return "feature-board-external-tool-element.alert.outdatedOnSchoolAndContext.teacher";
				} else if (!props.toolConfigurationStatus?.isOutdatedOnScopeSchool) {
					return "feature-board-external-tool-element.alert.outdatedOnContext.teacher";
				} else {
					return "feature-board-external-tool-element.alert.outdatedOnSchool.teacher";
				}
			} else {
				return "feature-board-external-tool-element.alert.outdated.student";
			}
		});

		return {
			t,
			errorMessage,
			outdatedMessage,
		};
	},
});
</script>
