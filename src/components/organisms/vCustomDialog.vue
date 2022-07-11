<template>
	<v-dialog
		ref="vDialog"
		:value="isOpen"
		:max-width="size"
		@click:outside="$emit('dialog-closed', false)"
		@keydown.esc="$emit('dialog-closed', false)"
	>
		<v-card :ripple="false">
			<v-card-title>
				<slot name="title"></slot>
			</v-card-title>
			<v-card-text>
				<slot name="content"></slot>
			</v-card-text>
			<v-card-actions v-if="hasButtons">
				<v-spacer></v-spacer>

				<div class="button-section button-left">
					<v-btn
						v-if="checkButtons('back')"
						data-testId="dialog-back"
						depressed
						outlined
						@click="$emit('back')"
					>
						{{ $t("common.actions.back") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('edit')"
						data-testId="dialog-edit"
						depressed
						@click="$emit('dialog-edit')"
					>
						{{ $t("common.actions.edit") }}
					</v-btn>
				</div>
				<div class="button-section button-right">
					<v-btn
						v-if="checkButtons('cancel')"
						data-testId="dialog-cancel"
						class="dialog-closed"
						depressed
						text
						@click="$emit('dialog-closed', false)"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('confirm')"
						data-testId="dialog-confirm"
						class="dialog-confirmed px-6"
						color="primary"
						depressed
						:disabled="confirmBtnDisabled"
						@click="confirmDialog"
						>{{ $t(confirmBtnTitleKey) }}
					</v-btn>
					<v-btn
						v-if="checkButtons('close')"
						data-testId="dialog-close"
						depressed
						outlined
						@click="$emit('dialog-closed', false)"
					>
						{{ $t("common.labels.close") }}
					</v-btn>
					<v-btn
						v-if="checkButtons('next')"
						data-testId="dialog-next"
						color="primary"
						depressed
						:disabled="nextBtnDisabled"
						@click="$emit('next')"
						>{{ $t(nextBtnTitleKey) }}
					</v-btn>
				</div>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	model: {
		prop: "isOpen",
		event: "dialog-closed",
	},
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
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
	},
	methods: {
		confirmDialog() {
			this.$emit("dialog-confirmed");
			this.$emit("dialog-closed", false);
		},
		checkButtons(buttonName) {
			return this.buttons.some((button) => button == buttonName);
		},
	},
};
</script>
<style scoped>
.button-left {
  width: 25%;
  text-align: left;
}

.button-right {
  display: inline-block;
  width: 75%;
  text-align: right;
}
</style>
