<template>
	<div class="text-center">
		<v-snackbar
			v-model="show"
			:multi-line="multiline"
			:vertical="vertical"
			:timeout="timeout"
			:color="statusColor"
			:top="position.includes('top')"
			:right="position.includes('right')"
			:bottom="position.includes('bottom')"
			:left="position.includes('left')"
			class="mt-12"
			max-width="200"
		>
			{{ notifierData.text }}

			<template #action="{ attrs }">
				<v-btn
					:color="closeButtonColor"
					text
					v-bind="attrs"
					@click="show = false"
				>
					<v-icon color="var(--color-white)">{{ mdiClose }}</v-icon>
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import { notifierModule } from "@/store";
import { mdiClose } from "@mdi/js";
export default {
	data() {
		return {
			show: false,
			mdiClose,
		};
	},
	computed: {
		notifierData() {
			return notifierModule.getNotifier;
		},
		statusColor() {
			const statusObj = {
				success: "var(--color-success)",
				error: "var(--color-danger-light)",
				warning: "var(--color-warning)",
				danger: "var(--color-danger)",
				info: "var(--color-info)",
			};
			return statusObj[this.notifierData.status] || "var(--color-primary)";
		},
		position() {
			if (this.$mq === "mobile") return ["bottom", "center"];
			return this.notifierData.position || ["top", "right"];
		},
		timeout() {
			return this.notifierData.timeout || 5000;
		},
		vertical() {
			return this.notifierData.vertical || false;
		},
		multiline() {
			return this.notifierData.multiline || false;
		},
		closeButtonColor() {
			return this.notifierData.closeButtonColor || "var(--color-secondary)";
		},
	},
	watch: {
		notifierData() {
			this.show = true;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@variables";
</style>
