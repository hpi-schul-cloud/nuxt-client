<template>
	<v-dialog v-model="isOpen" max-width="600">
		<v-card>
			<v-card-title class="text-h5">
				<slot name="dialog-title">{{ title }}</slot>
			</v-card-title>
			<v-card-text>
				<slot name="dialog-content">{{ text }}</slot>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="isOpen = false">
					Abbrechen
				</v-btn>
				<v-btn color="primary" text @click="isOpen = false">Bestätigen</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		//btn-text?
	},
	data() {
		return {
			isOpen: false,
		};
	},
};
</script>
