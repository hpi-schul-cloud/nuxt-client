<template>
	<v-dialog
		ref="vDialog"
		v-model="isOpen"
		:max-width="size"
		@click:outside="closeDialog"
		@keydown.esc="closeDialog"
	>
		<v-card :ripple="false" data-testid="dialog-content">
			<v-card-title data-testid="dialog-title" class="dialog-title px-6 pt-4">
				<slot name="title" />
			</v-card-title>
			<v-card-text class="text--primary">
				<slot name="content" />
			</v-card-text>
			<v-card-actions v-if="hasButtons" class="action-buttons px-6">
				<div class="button-section button-left">
					<v-btn
						v-if="checkButtons('back')"
						data-testid="dialog-back"
						variant="outlined"
						@click="$emit('back')"
					>
						{{ $t("common.actions.back") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('edit')"
						data-testid="dialog-edit"
						variant="flat"
						@click="$emit('dialog-edit')"
					>
						{{ $t("common.actions.edit") }}
					</v-btn>
				</div>
				<v-spacer />
				<div class="button-section button-right">
					<v-btn
						v-if="checkButtons('cancel')"
						data-testid="dialog-cancel"
						class="dialog-closed"
						variant="text"
						@click="cancelDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('confirm')"
						data-testid="dialog-confirm"
						class="dialog-confirmed px-6"
						color="primary"
						variant="flat"
						:disabled="confirmBtnDisabled"
						@click="confirmDialog"
					>
						<v-icon v-if="confirmBtnIcon" size="small" class="mr-1">
							{{ confirmBtnIcon }}
						</v-icon>
						{{ $t(confirmBtnTitleKey) }}
					</v-btn>
					<v-btn
						v-if="checkButtons('close')"
						data-testid="dialog-close"
						variant="outlined"
						@click="closeDialog"
					>
						{{ $t("common.labels.close") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('next')"
						data-testid="dialog-next"
						color="primary"
						variant="flat"
						:disabled="nextBtnDisabled"
						@click="$emit('next')"
						>{{ $t(nextBtnTitleKey) }}
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { ModelRef, PropType } from "vue";

const props = defineProps({
	size: {
		type: Number,
		default: 480,
	},
	hasButtons: {
		type: Boolean,
	},
	confirmBtnTitleKey: {
		type: String,
		default: "common.actions.confirm",
	},
	confirmBtnIcon: {
		type: String,
		default: undefined,
	},
	confirmBtnDisabled: {
		type: Boolean,
	},
	nextBtnTitleKey: {
		type: String,
		default: "common.actions.continue",
	},
	nextBtnDisabled: {
		type: Boolean,
	},
	buttons: {
		type: Array as PropType<
			("back" | "edit" | "cancel" | "confirm" | "close" | "next")[]
		>,
		default: () => ["cancel", "confirm"],
	},
});

const emit = defineEmits([
	"dialog-closed",
	"dialog-confirmed",
	"dialog-canceled",
	"next",
	"back",
	"dialog-edit",
]);

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

const confirmDialog = () => {
	emit("dialog-confirmed");
	closeDialog();
};

const cancelDialog = () => {
	emit("dialog-canceled");
	closeDialog();
};

const closeDialog = () => {
	isOpen.value = false;
	emit("dialog-closed");
};

const checkButtons = (buttonName: string) => {
	return props.buttons.some((button) => button == buttonName);
};
</script>

<style lang="scss" scoped>
.action-buttons {
	display: flex;
	flex-direction: row;
	margin-bottom: calc(var(--space-base-vuetify) * 2);
}

.button-section {
	display: flex;
	gap: calc(var(--space-base-vuetify) * 2);
}

.dialog-title {
	white-space: normal;
	hyphens: none;
}
</style>
