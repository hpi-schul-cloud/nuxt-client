<template>
	<VDialog
		v-model="isDialogOpen"
		data-testid="dialog"
		:max-width="480"
		:aria-labelledby="`modal-${uid}-title`"
		:aria-describedby="`modal-${uid}-body`"
	>
		<UseFocusTrap>
			<VCard>
				<div class="mx-4">
					<h2
						:id="`modal-${uid}-title`"
						class="ma-2 dialog-title"
						data-testid="dialog-title"
					>
						{{ message }}
					</h2>

					<div :id="`modal-${uid}-body`">
						<slot name="content" />
					</div>
				</div>

				<template #actions>
					<VSpacer />
					<div class="d-flex mb-2 gap-2 mx-4">
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
</style>
