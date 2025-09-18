<template>
	<v-custom-dialog
		:is-open="isOpen"
		:has-buttons="false"
		@dialog-closed="onCancel"
	>
		<template #title>
			<h2 class="my-2">
				{{ t("feature-board-external-tool-element.dialog.title") }}
			</h2>
		</template>
		<template #content>
			<ContextExternalToolConfigurator
				ref="contextExternalToolConfigurator"
				class="mb-4"
				:config-id="configId"
				:context-id="contextId"
				:context-type="contextType"
				:display-settings-title="false"
				@success="onSuccess"
				@cancel="onCancel"
			/>
		</template>
	</v-custom-dialog>
</template>

<script setup lang="ts">
import ContextExternalToolConfigurator from "@/components/external-tools/configuration/ContextExternalToolConfigurator.vue";
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { ToolContextType } from "@/serverApi/v3";
import { ContextExternalTool } from "@data-external-tool";
import { useBoardNotifier } from "@util-board";
import { nextTick, onMounted, PropType, ref, Ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	isOpen: {
		type: Boolean,
		required: true,
	},
	contextId: {
		type: String,
		required: true,
	},
	contextType: {
		type: String as PropType<ToolContextType>,
		default: ToolContextType.BoardElement,
	},
	configId: {
		type: [String, null],
		required: true,
	},
});

const emit = defineEmits<{
	(e: "close"): void;
	(e: "save", value: ContextExternalTool): void;
}>();

const { t } = useI18n();
const { showSuccess } = useBoardNotifier();

const contextExternalToolConfigurator: Ref<InstanceType<
	typeof ContextExternalToolConfigurator
> | null> = ref(null);

const closeDialog = () => {
	contextExternalToolConfigurator.value?.clearData();

	emit("close");
};

const onCancel = () => {
	closeDialog();
};

const onSuccess = (savedTool: ContextExternalTool) => {
	emit("save", savedTool);

	const message = props.configId
		? t("components.administration.externalToolsSection.notification.updated")
		: t("components.administration.externalToolsSection.notification.created");

	showSuccess(message);

	closeDialog();
};

const onOpen = async () => {
	// Needs to wait for the contextExternalToolConfigurator-ref to be available after dialog opens
	await nextTick();

	await contextExternalToolConfigurator.value?.fetchData();
};

watch(
	() => props.isOpen,
	async (value, oldValue) => {
		if (value && value !== oldValue) {
			await onOpen();
		}
	}
);

onMounted(async () => {
	if (props.isOpen) {
		await onOpen();
	}
});
</script>
