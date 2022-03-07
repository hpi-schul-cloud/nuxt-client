<template>
	<v-card
		class="mx-auto mb-4 locked-card"
		max-width="100%"
		:aria-label="ariaLabel"
		tabindex="0"
		outlined
		@click.native="onClick"
	>
		<v-card-text>
			<div class="top-row-container mb-3">
				<div class="title-section" tabindex="0" :style="`color: ${titleColor}`">
					<v-icon size="20" :color="titleColor" dark>{{
						icons.mdiFormatListChecks
					}}</v-icon>
					{{ $t("pages.room.taskCard.label.task") }}
				</div>
			</div>
			<div v-if="alert">
				<v-alert
					dense
					outlined
					prominent
					type="warning"
					class="alert-locked-card"
				>
					{{ $t("pages.room.locked.label.info") }}
				</v-alert>
			</div>
			<div class="text-h6 text--primary mb-2">{{ task.name }}</div>
		</v-card-text>
	</v-card>
</template>

<script>
import { fromNow } from "@plugins/datetime";
import { mdiFormatListChecks } from "@mdi/js";

export default {
	components: {},
	props: {
		task: {
			type: Object,
			required: true,
		},
		room: {
			type: Object,
			required: true,
		},
		ariaLabel: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			fromNow,
			icons: {
				mdiFormatListChecks,
			},
			defaultTitleColor: "#54616e",
			alert: false,
			alertDuration: 5000,
		};
	},
	computed: {
		titleColor() {
			return this.room.displayColor || this.defaultTitleColor;
		},
	},
	methods: {
		onClick() {
			this.alert = true;
			setTimeout(() => {
				this.alert = false;
			}, this.alertDuration);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";
@import "@styles";

.top-row-container {
	display: grid;
	grid-template-columns: 95% 5%;
	align-items: center;
	.icon-section {
		overflow: none;
		text-align: left;
	}
	.title-section {
		color: var(--color-primary);
		text-align: left;
	}
}

.v-card {
	box-shadow: var(--shadow-sm);
	transition: box-shadow calc(var(--duration-transition-medium) * 0.5) ease-in;

	&:hover {
		box-shadow: var(--shadow-m);
	}
}
.v-card__text {
	padding-bottom: var(--space-xs-4);
}
</style>
