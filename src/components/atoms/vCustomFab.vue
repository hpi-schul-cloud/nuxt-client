<template>
	<v-speed-dial
		v-if="hasMultipleActions"
		v-model="isSpeedDialExpanded"
		fixed
		:bottom="isMobile"
		right
		class="fixed transition"
		:direction="speedDialDirection"
	>
		<template v-slot:activator>
			<v-btn
				v-model="isSpeedDialExpanded"
				color="primary"
				dark
				fab
				rounded
				:small="isCollapsed"
				class="transition"
				:class="{ 'extended-fab': isCollapsed }"
			>
				<v-icon v-if="isSpeedDialExpanded"> {{ mdiClose }} </v-icon>
				<div v-else>
					<v-icon> {{ icon }} </v-icon>
					<span v-if="extended">{{ title }}</span>
				</div>
			</v-btn>
		</template>
		<template v-for="(action, index) of actions">
			<div :key="index" class="d-flex align-center justify-end">
				<v-btn dark small color="secondary" :href="action.href" :to="action.to">
					{{ action.label }}
				</v-btn>
				<v-btn
					:key="index"
					fab
					dark
					small
					color="secondary"
					:href="action.href"
					:to="action.to"
				>
					<v-icon small>{{ action.icon }}</v-icon>
				</v-btn>
			</div>
		</template>
	</v-speed-dial>
	<v-btn
		v-else
		fab
		fixed
		right
		:bottom="isMobile"
		color="primary"
		dark
		rounded
		:small="extended"
		class="fixed transition"
		:class="{ 'extended-fab': extended }"
		:href="href"
	>
		<v-icon :class="{ 'mr-1': extended }">{{ icon }}</v-icon>
		<span v-if="extended">{{ $t("common.words.task") }}</span>
	</v-btn>
</template>

<script>
import { mdiClose } from "@mdi/js";

export default {
	props: {
		actions: {
			type: Array,
			required: false,
			default: () => [],
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
			scrollTimer: -1,
			isSpeedDialExpanded: false,
			pageOffset: 0,
			extended: true,
			mdiClose,
		};
	},
	computed: {
		isMobile: function () {
			return this.$vuetify.breakpoint.mdAndDown;
		},
		hasMultipleActions: function () {
			return this.actions.length > 0;
		},
		speedDialDirection: function () {
			return this.isMobile ? "top" : "bottom";
		},
		isCollapsed: function () {
			return this.extended && !this.isSpeedDialExpanded;
		},
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
			if (this.scrollTimer !== -1) {
				clearTimeout(this.scrollTimer);
			}
			this.scrollTimer = setTimeout(() => {
				this.scrollTimer = -1;
			}, 300);

			this.detectScrollingDirection();
		},
	},
};
</script>

<style lang="scss" scoped>
.fixed {
	position: fixed !important;
}

.transition {
	transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
}

::v-deep .v-speed-dial__list {
	right: 0 !important;
	left: initial;
	align-items: end;
	width: auto;
}

.extended-fab {
	width: 120px !important;
	padding: 0 12px 0 8px; // stylelint-disable sh-waqar/declaration-use-variable
	transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
}
</style>
