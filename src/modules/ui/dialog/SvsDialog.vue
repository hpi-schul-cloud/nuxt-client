<template>
	<UseFocusTrap>
		<VDialog
			v-model="isOpen"
			:data-testid="testId"
			:max-width="maxWidth"
			:aria-labelledby="`dialog-${uid}-title`"
			@after-leave="emit('after-leave')"
			@click:outside="emit('cancel')"
			@keydown.esc="emit('cancel')"
		>
			<VCard :loading="isLoading">
				<VCardItem class="pa-4">
					<VCardTitle v-if="titleString">
						<h2 :id="`dialog-${uid}-title`" class="ma-0 dialog-title" :data-testid="`${testId}-title`">
							{{ titleString }}
						</h2>
					</VCardTitle>
				</VCardItem>
				<VCardText v-if="$slots.content" class="pa-4">
					<slot name="content" />
				</VCardText>
				<VCardActions v-if="!noActions" class="pa-4 pt-2 ga-2 justify-end flex-wrap">
					<slot name="actions">
						<SvsDialogBtnCancel
							v-if="!noCancel"
							:text-lang-key="cancelBtnLangKey"
							:data-testid="`${testId}-cancel`"
							:disabled="areActionsDisabled"
							@click="onCancel"
						/>
						<SvsDialogBtnConfirm
							v-if="!noConfirm"
							:data-testid="`${testId}-confirm`"
							:text-lang-key="confirmBtnLangKey"
							:disabled="areActionsDisabled || confirmBtnDisabled"
							@click="onConfirm"
						/>
					</slot>
				</VCardActions>
			</VCard>
		</VDialog>
	</UseFocusTrap>
</template>

<script setup lang="ts">
import SvsDialogBtnCancel from "./SvsDialogBtnCancel.vue";
import SvsDialogBtnConfirm from "./SvsDialogBtnConfirm.vue";
import { i18nKeyExists } from "@/plugins/i18n";
import { useUid } from "@/utils/uid";
import { UseFocusTrap } from "@vueuse/integrations/useFocusTrap/component";
import { computed, useAttrs } from "vue";
import { useI18n } from "vue-i18n";
import { VCard, VDialog } from "vuetify/components";

const props = defineProps({
	title: { type: String, required: true }, // Allowing text or i18n key
	isLoading: { type: Boolean, default: false },
	maxWidth: { type: [Number, String], default: 480 },
	areActionsDisabled: { type: Boolean, default: false },
	confirmBtnDisabled: { type: Boolean, default: false },
	confirmBtnLangKey: { type: String, default: "common.actions.confirm" },
	cancelBtnLangKey: { type: String, default: "common.actions.cancel" },
	noActions: { type: Boolean, default: false },
	noConfirm: { type: Boolean, default: false },
	noCancel: { type: Boolean, default: false },
	isOpenStateManagedExternally: { type: Boolean, default: false },
});

const { t } = useI18n();
const emit = defineEmits(["cancel", "confirm", "after-leave"]);

const isOpen = defineModel({
	type: Boolean,
	default: false,
});

const { uid } = useUid();
const attrs = useAttrs();

const testId = attrs["data-testid"] ?? "dialog";
const titleString = computed(() => (i18nKeyExists(props.title) ? t(props.title) : props.title));

const onCancel = () => {
	emit("cancel");
	if (!props.isOpenStateManagedExternally) {
		isOpen.value = false;
	}
};

const onConfirm = () => {
	emit("confirm");
	if (!props.isOpenStateManagedExternally) {
		isOpen.value = false;
	}
};
</script>

<style scoped>
.dialog-title {
	white-space: normal;
	hyphens: none;
	word-break: break-word;
}
</style>
