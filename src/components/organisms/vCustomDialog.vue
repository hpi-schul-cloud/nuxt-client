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
				<v-btn
					data-testId="dialog-cancel"
					class="dialog-closed"
					depressed
					text
					@click="$emit('dialog-closed', false)"
				>
					{{ this.$t("common.actions.cancel") }}
				</v-btn>
				<v-btn
					data-testId="dialog-confirm"
					class="dialog-confirmed px-6"
					color="primary"
					depressed
					@click="confirmDialog"
					>{{ this.$t(confirmBtnTitleKey) }}</v-btn
				>
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
	},
	methods: {
		confirmDialog() {
			this.$emit("dialog-confirmed");
			this.$emit("dialog-closed", false);
		},
	},
};
</script>
