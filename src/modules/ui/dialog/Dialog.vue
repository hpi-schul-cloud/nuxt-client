<template>
	<VDialog v-model="isDialogOpen" data-testid="dialog" :max-width="480">
		<UseFocusTrap>
			<VCard>
				<template #title>
					<h2
						:id="`modal-${uid}-title`"
						class="ma-0 dialog-title"
						data-testid="dialog-title"
					>
						{{ message }}
					</h2>
				</template>
				<template #text>
					<div :id="`modal-${uid}-body`">
						<slot name="content" />
					</div>
				</template>
				<template #actions>
					<VSpacer />
					<div class="d-flex ga-2">
						<VBtn
							data-testid="dialog-cancel"
							:aria-label="t('common.actions.cancel')"
							variant="text"
							:text="t('common.actions.cancel')"
							@click="onCancel"
						/>
						<VBtn
							data-testid="dialog-confirm"
							:aria-label="t('common.actions.confirm')"
							class="px-6"
							color="primary"
							variant="flat"
							:text="t(confirmBtnLangKey)"
							:disabled="confirmBtnDisabled"
							@click="onConfirm"
						/>
					</div>
				</template>
			</VCard>
		</UseFocusTrap>
	</VDialog>
</template>

<script setup lang="ts">
import { useUid } from "@/utils/uid";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { VBtn, VCard, VDialog, VSpacer } from "vuetify/lib/components/index";

const props = defineProps({
	message: { type: String, required: false, default: "" },
	confirmBtnDisabled: { type: Boolean, required: false, default: false },
	confirmBtnLangKey: { type: String, required: false, default: "" },
});

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const emit = defineEmits(["cancel", "confirm"]);

const { t } = useI18n();

const { uid } = useUid();

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
.v-card :deep(.v-card-item) {
	padding: 1.25rem 1.5rem;
}
.v-card :deep(.v-card-text) {
	padding: 0 1.5rem;
}
.v-card :deep(.v-card-actions) {
	padding: 0 1.5rem 1.5rem;
}
</style>
