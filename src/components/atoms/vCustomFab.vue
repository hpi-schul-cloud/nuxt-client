<template>
	<v-btn
		fab
		fixed
		right
		:bottom="$vuetify.breakpoint.mdAndDown"
		color="primary"
		dark
		:width="extended ? '120' : ''"
		rounded
		:small="extended"
		:class="$vuetify.breakpoint.lgAndUp ? 'top-alignment fixed' : 'fixed'"
		:href="href"
	>
		<v-icon :class="extended ? 'mr-1' : ''">{{ icon }}</v-icon>
		<span v-if="extended">{{ $t("common.words.task") }}</span>
	</v-btn>
</template>

<script>
export default {
	props: {
		isScrolling: {
			type: Boolean,
			required: false,
		},
		icon: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: false,
			default: "",
		},
		href: {
			type: String,
			required: false,
			default: "",
		},
	},
	data() {
		return {
			pageOffset: 0,
			extended: true,
		};
	},
	methods: {
		detectScrollingDirection() {
			if (typeof window === "undefined") return;
			const top = window.pageYOffset || 0;

			if (top >= this.pageOffset) {
				this.extended = false;
			}
			if (top <= this.pageOffset) {
				this.extended = true;
			}

			this.pageOffset = top;
		},
	},
	onEventBus: {
		isScrolling: function () {
			this.detectScrollingDirection();
		},
	},
};
</script>

<style lang="scss" scoped>
.top-alignment {
	top: 193px;
}

.fixed {
	position: fixed !important;
	transition: width 0.3s ease-in-out, height 0.2s ease-in-out;
}
</style>
