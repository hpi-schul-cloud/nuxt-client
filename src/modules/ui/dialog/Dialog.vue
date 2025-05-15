<template>
	<VDialog
		v-model="isDialogOpen"
		data-testid="delete-dialog-item"
		:max-width="480"
	>
		<UseFocusTrap>
			<VCard>
				<div class="mx-4">
					<h4 class="dialog-title" data-testid="dialog-title">
						{{ message }}
					</h4>

					<slot name="content" />
				</div>

				<template #actions>
					<VSpacer />
					<div class="action-buttons mx-4">
						<VBtn
							data-testid="dialog-cancel"
							aria-label=""
							variant="text"
							:text="t('common.actions.cancel')"
							@click="onCancel"
						/>
						<VBtn
							data-testid="dialog-confirm"
							class="px-6"
							color="primary"
							variant="flat"
							:text="t(confirmBtnLangKey)"
							@click="onConfirm"
						/>
					</div>
				</template>
			</VCard>
		</UseFocusTrap>
	</VDialog>
</template>

<script setup lang="ts">
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
	VBtn,
	VCard,
	VDialog,
	VSpacer,
} from "vuetify/lib/components/index.mjs";

const props = defineProps({
	message: { type: String, required: false, default: "" },
	confirmBtnLangKey: { type: String, required: false, default: "" },
});

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const emit = defineEmits(["cancel", "confirm"]);

const { t } = useI18n();

const confirmBtnLangKey = computed(() =>
	props.confirmBtnLangKey ? props.confirmBtnLangKey : "common.actions.confirm"
);

const onCancel = () => {
	emit("cancel");
};
const onConfirm = () => {
	emit("confirm");
};
</script>

<style scoped>
.dialog-title {
	white-space: normal;
	hyphens: none;
	word-break: break-word;
	line-height: var(--line-height-lg);
}

.action-buttons {
	display: flex;
	margin-bottom: calc(var(--space-base-vuetify) * 2);
	gap: calc(var(--space-base-vuetify) * 2);
}
</style>
