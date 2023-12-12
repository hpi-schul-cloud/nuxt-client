<template>
	<div>
		<WarningAlert v-if="error">
			{{ t(errorMessage) }}
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
		error: {
			type: Object as PropType<BusinessError>,
		},
		toolOutdatedStatus: {
			type: Object as PropType<ContextExternalToolConfigurationStatus>,
			required: true,
		},
	},
	setup(props) {
		const { t } = useI18n();

		const { determineOutdatedTranslationKey } =
			useContextExternalToolConfigurationStatus();

		const { isTeacher } = useBoardPermissions();

		const isToolOutdated: ComputedRef<boolean> = computed(
			() =>
				!!props.toolOutdatedStatus?.isOutdatedOnScopeSchool ||
				!!props.toolOutdatedStatus?.isOutdatedOnScopeContext
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
