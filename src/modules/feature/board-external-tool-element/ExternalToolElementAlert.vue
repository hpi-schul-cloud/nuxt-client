<template>
	<div>
		<WarningAlert v-if="error">
			{{ $t(errorMessage) }}
		</WarningAlert>

		<WarningAlert v-if="toolStatus && toolStatus.isDeactivated">
			{{
				$t("common.tool.information.deactivated", {
					toolDisplayName,
				})
			}}
		</WarningAlert>

		<WarningAlert v-if="isToolIncomplete">
			{{ incompleteMessage }}
		</WarningAlert>

		<WarningAlert v-if="isToolOutdated">
			{{ outdatedMessage }}
		</WarningAlert>
	</div>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { BusinessError } from "@/store/types/commons";
import { useBoardPermissions } from "@data-board";
import { WarningAlert } from "@ui-alert";
import { computed, ComputedRef, defineComponent, PropType } from "vue";
import { useContextExternalToolConfigurationStatus } from "@data-external-tool";
import { ContextExternalToolConfigurationStatus } from "@/store/external-tool";

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

		const {
			determineOutdatedTranslationKey,
			determineIncompleteTranslationKey,
		} = useContextExternalToolConfigurationStatus();

		const { isTeacher } = useBoardPermissions();

		const isToolOutdated: ComputedRef<boolean> = computed(
			() =>
				!!props.toolStatus?.isOutdatedOnScopeSchool ||
				!!props.toolStatus?.isOutdatedOnScopeContext
		);

		const isToolIncomplete: ComputedRef<boolean> = computed(
			() => !!props.toolStatus?.isIncompleteOnScopeContext
		);

		const errorMessage: ComputedRef<string> = computed(() =>
			isTeacher
				? "feature-board-external-tool-element.alert.error.teacher"
				: "feature-board-external-tool-element.alert.error.student"
		);

		const outdatedMessage: ComputedRef<string> = computed(() => {
			const translationKey = determineOutdatedTranslationKey(props.toolStatus);

			return t(translationKey);
		});

		const incompleteMessage: ComputedRef<string | undefined> = computed(() => {
			const translationKey = determineIncompleteTranslationKey();

			return t(translationKey);
		});

		return {
			errorMessage,
			outdatedMessage,
			incompleteMessage,
			isToolOutdated,
			isToolIncomplete,
		};
	},
});
</script>
