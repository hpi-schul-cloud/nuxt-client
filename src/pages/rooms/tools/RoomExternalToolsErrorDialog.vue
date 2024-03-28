<template>
	<v-custom-dialog
		v-if="status"
		:is-open="$props.isOpen"
		:has-buttons="true"
		:buttons="['close']"
		data-testId="error-dialog"
		@dialog-closed="onCloseCustomDialog"
	>
		<template #title>
			<h2 class="text-h4 my-2">
				{{ $t(getTitle, { toolName }) }}
			</h2>
		</template>
		<template #content>
			<RenderHTML
				:html="$t(getText, { toolName })"
				component="p"
				class="text-md mt-2"
			/>
		</template>
	</v-custom-dialog>
</template>
<script lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { RenderHTML } from "@feature-render-html";
import { computed, ComputedRef, defineComponent, PropType } from "vue";
import { useContextExternalToolConfigurationStatus } from "@data-external-tool";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { useI18n } from "vue-i18n";

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
		const {
			determineOutdatedTranslationKey,
			determineIncompleteTranslationKey,
		} = useContextExternalToolConfigurationStatus();

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

		const isToolIncomplete: ComputedRef<boolean> = computed(() => {
			return props.selectedItem.status.isIncompleteOnScopeContext;
		});

		const getTitle: ComputedRef<string> = computed(() => {
			if (props.selectedItem.status.isDeactivated) {
				return "pages.rooms.tools.deactivatedDialog.title";
			}

			if (isToolOutdated.value && !isToolIncomplete.value) {
				return "pages.rooms.tools.outdatedDialog.title";
			} else if (isToolIncomplete.value) {
				return "pages.rooms.tools.incompleteDialog.title";
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

			if (isToolOutdated.value && !isToolIncomplete.value) {
				return determineOutdatedTranslationKey(props.selectedItem.status);
			} else {
				return determineIncompleteTranslationKey();
			}
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
