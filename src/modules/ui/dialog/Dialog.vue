<template>
	<VDialog
		v-model="isOpen"
		:data-testid="attrs['data-testid'] ?? identifier"
		:max-width="480"
		:aria-labelledby="`dialog-${uid}-title`"
		@after-leave="() => emit('after-leave')"
	>
		<UseFocusTrap>
			<VCard :loading="isLoading">
				<template v-if="title" #title>
					<h2 :id="`dialog-${uid}-title`" class="ma-0 dialog-title" :data-testid="`${identifier}-title`">
						{{ title }}
					</h2>
				</template>
				<template #text>
					<slot name="content" />
				</template>
				<template v-if="!noActions" #actions>
					<VSpacer />
					<div class="d-flex ga-2">
						<slot name="actions">
							<DialogBtnCancel :identifier="identifier" :disabled="areActionsDisabled" @click="onCancel" />
							<DialogBtnConfirm
								:identifier="identifier"
								:text="t(confirmBtnLangKey)"
								:disabled="areActionsDisabled || confirmBtnDisabled"
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
import DialogBtnCancel from "./DialogBtnCancel.vue";
import DialogBtnConfirm from "./DialogBtnConfirm.vue";
import { useUid } from "@/utils/uid";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";
import { VCard, VDialog, VSpacer } from "vuetify/lib/components/index";

defineProps({
	identifier: { type: String, default: "dialog" },
	title: { type: String, default: undefined },
	isLoading: { type: Boolean, default: false },
	areActionsDisabled: { type: Boolean, default: false },
	confirmBtnDisabled: { type: Boolean, default: false },
	confirmBtnLangKey: { type: String, default: "common.actions.confirm" },
	noActions: { type: Boolean, default: false },
});

const emit = defineEmits(["cancel", "confirm", "after-leave"]);

const isOpen = defineModel({
	type: Boolean,
	default: false,
});

const { t } = useI18n();
const { uid } = useUid();
const attrs = useAttrs();

const onCancel = () => {
	isOpen.value = false;
	emit("cancel");
};

const onConfirm = () => {
	isOpen.value = false;
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
}

.v-card :deep(.v-card-actions) {
	padding: 8px 24px 24px 24px;
}
</style>
