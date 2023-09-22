<template>
	<v-dialog
		ref="vDialog"
		v-model="isDialogOpen"
		:max-width="size"
		@click:outside="closeDialog"
		@keydown.esc="closeDialog"
	>
		<v-card :ripple="false">
			<v-card-title data-testid="dialog-title">
				<slot name="title"></slot>
			</v-card-title>
			<v-card-text class="text--primary">
				<slot name="content"></slot>
			</v-card-text>
			<v-card-actions v-if="hasButtons">
				<v-spacer></v-spacer>

				<div class="button-section button-left">
					<v-btn
						v-if="checkButtons('back')"
						data-test-id="dialog-back"
						variant="outlined"
						@click="$emit('back')"
					>
						{{ $t("common.actions.back") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('edit')"
						data-test-id="dialog-edit"
						variant="flat"
						@click="$emit('dialog-edit')"
					>
						{{ $t("common.actions.edit") }}
					</v-btn>
				</div>
				<div class="button-section button-right">
					<v-btn
						v-if="checkButtons('cancel')"
						data-test-id="dialog-cancel"
						class="dialog-closed"
						variant="text"
						@click="cancelDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('confirm')"
						data-test-id="dialog-confirm"
						class="dialog-confirmed px-6"
						color="primary"
						variant="flat"
						:disabled="confirmBtnDisabled"
						@click="confirmDialog"
						>{{ $t(confirmBtnTitleKey) }}
					</v-btn>
					<v-btn
						v-if="checkButtons('close')"
						data-test-id="dialog-close"
						variant="outlined"
						@click="closeDialog"
					>
						{{ $t("common.labels.close") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('next')"
						data-test-id="dialog-next"
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
import { computed } from "vue";

const props = defineProps({
	isOpen: { type: Boolean, required: true },
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
		type: Array,
		default: () => ["cancel", "confirm"],
	},
});

const emit = defineEmits([
	"dialog-closed",
	"dialog-confirmed",
	"dialog-canceled",
	"back",
	"dialog-edit",
]);

const isDialogOpen = computed({
	get() {
		return props.isOpen;
	},
	set(value) {
		if (value === true) closeDialog();
	},
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
	emit("dialog-closed");
};

const checkButtons = (buttonName: string) => {
	return props.buttons.some((button) => button == buttonName);
};
</script>

<style lang="scss" scoped>
.button-left {
	width: 25%;
	text-align: left;
}

.button-right {
	display: inline-block;
	width: 75%;
	text-align: right;
}
.button-section {
	margin-bottom: calc(var(--space-base-vuetify) * 2);
}

.button-section > button {
	margin-left: calc(var(--space-base-vuetify) * 2);
}
</style>
