<template>
	<VDialog
		v-model="isOpen"
		:data-testid="attrs['data-testid'] ?? identifier"
		:max-width="480"
		:aria-labelledby="`dialog-${uid}-title`"
		@after-leave="onAfterLeave"
	>
		<UseFocusTrap>
			<VCard :loading>
				<template v-if="title" #title>
					<h2 :id="`dialog-${uid}-title`" class="ma-0 dialog-title" :data-testid="`${identifier}-title`">
						{{ title }}
					</h2>
				</template>
				<template #text>
					<div :id="`dialog-${uid}-body`">
						<slot name="content" />
					</div>
				</template>
				<template #actions>
					<VSpacer />
					<div class="d-flex ga-2">
						<slot name="actions">
							<VBtn
								:data-testid="`${identifier}-cancel`"
								:disabled="areActionsDisabled"
								variant="text"
								:text="t('common.actions.cancel')"
								@click="onCancel"
							/>
							<VBtn
								:data-testid="`${identifier}-confirm`"
								class="px-6"
								color="primary"
								variant="flat"
								:text="t(confirmBtnLangKey)"
								:disabled="confirmBtnDisabled || areActionsDisabled"
								@click="onConfirm"
							/>
						</slot>
					</div>
				</template>
			</VCard>
		</UseFocusTrap>
	</VDialog>
</template>

<script setup lang="ts">
import { useUid } from "@/utils/uid";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { computed, useAttrs } from "vue";
import { useI18n } from "vue-i18n";
import { VBtn, VCard, VDialog, VSpacer } from "vuetify/lib/components/index";

const props = defineProps({
	identifier: { type: String, default: "dialog" },
	title: { type: String, default: undefined },
	loading: { type: Boolean, default: false },
	areActionsDisabled: { type: Boolean, default: false },
	confirmBtnDisabled: { type: Boolean, default: false },
	confirmBtnLangKey: { type: String, default: "common.actions.confirm" },
});

const emit = defineEmits(["cancel", "confirm", "after-leave"]);

const isOpen = defineModel({
	type: Boolean,
	default: false,
});

const { t } = useI18n();
const { uid } = useUid();
const attrs = useAttrs();

const confirmBtnLangKey = computed(() =>
	props.confirmBtnLangKey ? props.confirmBtnLangKey : "common.actions.confirm"
);

const onCancel = () => {
	emit("cancel");
};

const onConfirm = () => {
	emit("confirm");
};

const onAfterLeave = () => {
	emit("after-leave");
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
}

.v-card :deep(.v-card-actions) {
	padding: 8px 24px 24px 24px;
}
</style>
