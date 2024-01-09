<template>
	<v-custom-dialog
		v-if="status"
		:is-open="$props.isOpen"
		:has-buttons="true"
		:buttons="['close']"
		data-testId="error-dialog"
		@dialog-closed="onCloseCustomDialog"
	>
		<h2 slot="title" class="text-h4 my-2">
			{{ t(getTitle, { toolName }) }}
		</h2>
		<template #content>
			<RenderHTML
				:html="t(getText, { toolName })"
				component="p"
				class="text-md mt-2"
			/>
		</template>
	</v-custom-dialog>
</template>
<script lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import RenderHTML from "@/components/feature-render-html/RenderHTML.vue";
import { computed, ComputedRef, defineComponent, PropType } from "vue";
import { useContextExternalToolConfigurationStatus } from "@data-external-tool";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { useI18n } from "@/composables/i18n.composable";

export default defineComponent({
	name: "RoomExternalToolsErrorDialog",
	components: { RenderHTML, VCustomDialog },
	emits: ["closed"],
	props: {
		selectedItem: {
			type: Object as PropType<ExternalToolDisplayData>,
			required: true,
		},
		isOpen: {
			type: Boolean,
			required: true,
		},
	},
	setup(props, { emit }) {
		const { determineOutdatedTranslationKey } =
			useContextExternalToolConfigurationStatus();

		const { t } = useI18n();

		const onCloseCustomDialog = () => {
			emit("closed");
		};

		const isToolOutdated: ComputedRef<boolean> = computed(() => {
			return (
				props.selectedItem.status.isOutdatedOnScopeContext ||
				props.selectedItem.status.isOutdatedOnScopeSchool
			);
		});

		const getTitle: ComputedRef<string> = computed(() => {
			if (props.selectedItem.status.isDeactivated) {
				return "pages.rooms.tools.deactivatedDialog.title";
			}

			if (isToolOutdated.value) {
				return "pages.rooms.tools.outdatedDialog.title";
			}

			return "";
		});

		const getText: ComputedRef<string> = computed(() => {
			if (!props.selectedItem) {
				return "";
			}

			if (props.selectedItem.status.isDeactivated) {
				return "common.tool.information.deactivated";
			}

			return determineOutdatedTranslationKey(props.selectedItem.status);
		});

		return {
			t,
			onCloseCustomDialog,
			getTitle,
			getText,
			status: props.selectedItem.status,
			toolName: props.selectedItem.name,
		};
	},
});
</script>