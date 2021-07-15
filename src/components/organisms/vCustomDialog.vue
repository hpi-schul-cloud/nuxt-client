<template>
	<v-dialog v-model="isOpen" :max-width="size">
		<v-card :ripple="true">
			<v-card-title>
				<slot name="title"></slot>
			</v-card-title>
			<v-card-text>
				<slot name="content"></slot>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn depressed outlined @click="$emit('dialog-closed', false)">
					{{ this.$t("common.actions.cancel") }}
				</v-btn>
				<v-btn color="primary" depressed @click="$emit('dialog-confirmed')">{{
					this.$t("common.actions.confirm")
				}}</v-btn>
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
	},
};
</script>
