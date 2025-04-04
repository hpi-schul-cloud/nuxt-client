<template>
	<div>
		<WarningAlert v-if="error">
			{{ $t(errorMessage) }}
		</WarningAlert>

		<WarningAlert v-if="toolStatus && toolStatus.isDeactivated">
			{{
				$t(toolDeactivatedMessage, {
					toolName: toolDisplayName,
				})
			}}
		</WarningAlert>

		<WarningAlert v-else-if="toolStatus && toolStatus.isNotLicensed">
			{{
				$t(toolNotLicensedMessage, {
					toolName: toolDisplayName,
				})
			}}
		</WarningAlert>

		<InfoAlert v-if="isToolIncompleteOperational">
			{{ $t(toolStatusMessage, { toolName: toolDisplayName }) }}
		</InfoAlert>

		<WarningAlert v-if="isToolNotLaunchable">
			{{ $t(toolStatusMessage, { toolName: toolDisplayName }) }}
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
import { InfoAlert, WarningAlert } from "@ui-alert";
import { computed, ComputedRef, defineComponent, PropType } from "vue";

export default defineComponent({
	components: {
		InfoAlert,
		WarningAlert,
	},
	props: {
		toolDisplayName: {
			type: String,
			required: true,
		},
		error: {
			type: Object as PropType<BusinessError>,
			default: undefined,
		},
		toolStatus: {
			type: Object as PropType<ContextExternalToolConfigurationStatus>,
			required: true,
		},
	},
	setup(props) {
		const {
			determineToolStatusTranslationKey,
			determineDeactivatedTranslationKey,
			determineNotLicensedTranslationKey,
		} = useContextExternalToolConfigurationStatus();

		const { isTeacher } = useBoardPermissions();

		const isToolNotLaunchable: ComputedRef<boolean> = computed(
			() =>
				props.toolStatus.isOutdatedOnScopeSchool ||
				props.toolStatus.isOutdatedOnScopeContext ||
				props.toolStatus.isIncompleteOnScopeContext
		);

		const isToolIncompleteOperational: ComputedRef<boolean> = computed(
			() =>
				props.toolStatus.isIncompleteOperationalOnScopeContext &&
				isTeacher.value
		);

		const errorMessage: ComputedRef<string> = computed(() =>
			isTeacher.value
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
			const translationKey = determineDeactivatedTranslationKey();

			return translationKey;
		});

		const toolNotLicensedMessage: ComputedRef<string> = computed(() => {
			const translationKey = determineNotLicensedTranslationKey();

			return translationKey;
		});

		return {
			errorMessage,
			toolStatusMessage,
			isToolNotLaunchable,
			isToolIncompleteOperational,
			toolDeactivatedMessage,
			toolNotLicensedMessage,
		};
	},
});
</script>
