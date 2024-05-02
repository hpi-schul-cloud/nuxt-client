<template>
	<div>
		<WarningAlert v-if="error">
			{{ $t(errorMessage) }}
		</WarningAlert>

		<WarningAlert v-if="toolStatus && toolStatus.isDeactivated">
			{{
				t(toolDeactivatedMessage, {
					tool: toolDisplayName,
				})
			}}
		</WarningAlert>

		<WarningAlert v-if="isToolIncompleteOperational" color="info">
			{{ t(toolStatusMessage, { tool: toolDisplayName }) }}
		</WarningAlert>

		<WarningAlert v-if="isToolNotLaunchable">
			{{ t(toolStatusMessage, { tool: toolDisplayName }) }}
		</WarningAlert>
	</div>
</template>

<script lang="ts">
import { BusinessError } from "@/store/types/commons";
import { useBoardPermissions } from "@data-board";
import {
	ContextExternalToolConfigurationStatus,
	useContextExternalToolConfigurationStatus,
} from "@data-external-tool";
import { WarningAlert } from "@ui-alert";
import { computed, ComputedRef, defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	components: {
		WarningAlert,
	},
	props: {
		toolDisplayName: {
			type: String,
			required: true,
		},
		error: {
			type: Object as PropType<BusinessError>,
		},
		toolStatus: {
			type: Object as PropType<ContextExternalToolConfigurationStatus>,
			required: true,
		},
	},
	setup(props) {
		const { t } = useI18n();

		const { determineToolStatusTranslationKey, determineDeactivatedMessage } =
			useContextExternalToolConfigurationStatus();

		const { isTeacher } = useBoardPermissions();

		const isToolNotLaunchable: ComputedRef<boolean> = computed(
			() =>
				!!props.toolStatus?.isOutdatedOnScopeSchool ||
				!!props.toolStatus?.isOutdatedOnScopeContext ||
				!!props.toolStatus?.isIncompleteOnScopeContext
		);

		const isToolIncompleteOperational: ComputedRef<boolean> = computed(
			() => props.toolStatus.isIncompleteOperationalOnScopeContext
		);

		const errorMessage: ComputedRef<string> = computed(() =>
			isTeacher
				? "feature-board-external-tool-element.alert.error.teacher"
				: "feature-board-external-tool-element.alert.error.student"
		);

		const toolStatusMessage: ComputedRef<string> = computed(() => {
			const translationKey = determineToolStatusTranslationKey(
				props.toolStatus
			);

			return translationKey;
		});

		const toolDeactivatedMessage: ComputedRef<string> = computed(() => {
			const translationKey = determineDeactivatedMessage();

			return translationKey;
		});

		return {
			errorMessage,
			toolStatusMessage,
			isToolNotLaunchable,
			isToolIncompleteOperational,
			toolDeactivatedMessage,
			t,
		};
	},
});
</script>
