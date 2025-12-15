<template>
	<!-- TODO: identifier prop to add to data-testids? -->
	<VDialog v-model="isOpen" data-testid="dialog" :max-width="480" :aria-labelledby="`dialog-${uid}-title`">
		<UseFocusTrap>
			<VCard :loading>
				<template #title>
					<h2 :id="`dialog-${uid}-title`" class="ma-0 dialog-title" data-testid="dialog-title">
						{{ title }}
					</h2>
				</template>
				<template #text>
					<div :id="`dialog-${uid}-body`">
						<slot name="content" />
					</div>
				</template>
				<template #actions>
					<slot name="actions">
						<VSpacer />
						<div class="d-flex ga-2">
							<VBtn
								data-testid="dialog-cancel"
								:disabled="areActionsDisabled"
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
								:disabled="confirmBtnDisabled || areActionsDisabled"
								@click="onConfirm"
							/>
						</div>
					</slot>
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
	title: { type: String, required: true },
	loading: { type: Boolean, default: false },
	areActionsDisabled: { type: Boolean, default: false },
	confirmBtnDisabled: { type: Boolean, required: false, default: false },
	confirmBtnLangKey: { type: String, required: false, default: "" },
});

const emit = defineEmits(["cancel", "confirm"]);

const isOpen = defineModel({
	type: Boolean,
	default: false,
});

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
}

.v-card :deep(.v-card-item) {
	padding: 16px 24px;
}

.v-card :deep(.v-card-text) {
	padding: 16px 24px 24px 24px;
	margin-bottom: 1rem;
}

.v-card :deep(.v-card-actions) {
	padding: 8px 24px 24px 24px;
}
</style>
