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
			min-width="320"
		>
			<div class="snackbar_content">
				<div class="extra-border"></div>
				<v-icon color="var(--color-success-dark)">{{ mdiCheckCircle }}</v-icon>
				Aufgabe erfolgreich kopiert
			</div>
			<template #action="{ attrs }">
				<v-btn
					:color="closeButtonColor"
					text
					v-bind="attrs"
					@click="show = false"
				>
					<v-icon color="var(--color-black)">{{ mdiClose }}</v-icon>
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script>
import { notifierModule } from "@/store";
import { mdiClose, mdiAlert, mdiCheckCircle } from "@mdi/js";
export default {
	data() {
		return {
			show: true,
			mdiClose,
			mdiAlert,
			mdiCheckCircle,
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
			//return statusObj[this.notifierData.status] || "var(--color-primary)";
			return statusObj[this.notifierData.status] || "warning";
		},
		position() {
			if (this.$mq === "mobile") return ["bottom", "center"];
			return this.notifierData.position || ["top", "right"];
		},
		timeout() {
			return this.notifierData.timeout || 5000 * 1000;
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

.snackbar_content {
	color: var(--color-black);

	.extra-border {
		position: absolute;
		top: 0;
		left: 0;
		width: 5px;
		height: 100%;
		background-color: var(--color-success-dark);
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
}
</style>
