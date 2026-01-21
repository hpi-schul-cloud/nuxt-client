<template>
	<VDialog
		v-model="isOpen"
		:data-testid="testId"
		:max-width="480"
		:aria-labelledby="`dialog-${uid}-title`"
		@after-leave="() => emit('after-leave')"
	>
		<UseFocusTrap>
			<VCard :loading="isLoading">
				<VCardItem class="py-4 px-6">
					<VCardTitle v-if="title">
						<h2 :id="`dialog-${uid}-title`" class="ma-0 dialog-title" :data-testid="`${testId}-title`">
							{{ title }}
						</h2>
					</VCardTitle>
				</VCardItem>
				<VCardText class="pa-6 pt-4">
					<slot name="content" />
				</VCardText>
				<VCardActions v-if="!noActions" class="pa-6 pt-2">
					<VSpacer />
					<div class="d-flex ga-2">
						<slot name="actions">
							<DialogBtnCancel :data-testid="`${testId}-cancel`" :disabled="areActionsDisabled" @click="onCancel" />
							<DialogBtnConfirm
								:data-testid="`${testId}-confirm`"
								:text-lang-key="confirmBtnLangKey"
								:disabled="areActionsDisabled || confirmBtnDisabled"
								@click="onConfirm"
							/>
						</slot>
					</div>
				</VCardActions>
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
import { VCard, VDialog, VSpacer } from "vuetify/lib/components/index";

defineProps({
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

const { uid } = useUid();
const attrs = useAttrs();

const testId = attrs["data-testid"] ?? "dialog";

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
</style>
