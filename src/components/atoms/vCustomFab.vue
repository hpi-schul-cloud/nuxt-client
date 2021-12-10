<template>
	<v-speed-dial
		v-if="hasMultipleActions"
		v-model="isSpeedDialExpanded"
		v-bind="$attrs"
		:bottom="!positionAtTop"
		:top="positionAtTop"
		right
		class="fixed transition"
		:class="positionAtTop ? topPositionClass : ''"
		:direction="speedDialDirection"
	>
		<template v-slot:activator>
			<v-btn
				id="fab"
				v-model="isSpeedDialExpanded"
				color="primary"
				fab
				rounded
				:small="isCollapsed"
				class="transition"
				:class="{ 'extended-fab': isCollapsed }"
			>
				<v-icon v-if="isSpeedDialExpanded" name="fab-icon">
					{{ mdiClose }}
				</v-icon>
				<div v-else class="d-flex align-center">
					<v-icon name="fab-icon" :class="{ 'mr-1': extended }">
						{{ icon }}
					</v-icon>
					<span v-if="extended">{{ title }}</span>
				</div>
			</v-btn>
		</template>
		<template v-for="(action, index) of actions">
			<div :key="index" class="d-flex align-center justify-end">
				<span>
					{{ action.label }}
				</span>
				<v-btn
					fab
					small
					:href="action.href"
					:to="action.to"
					class="fab-action"
					:data-testid="action.dataTestid"
				>
					<v-icon small class="fab-action-icon">{{ action.icon }}</v-icon>
				</v-btn>
			</div>
		</template>
		<v-overlay
			:value="showOverlay"
			color="#fff"
			z-index="-1"
			opacity="0.9"
		></v-overlay>
	</v-speed-dial>
	<v-btn
		v-else
		v-bind="$attrs"
		fab
		fixed
		right
		:bottom="!positionAtTop"
		:top="positionAtTop"
		color="primary"
		dark
		rounded
		:small="extended"
		:href="href"
		:class="classes"
	>
		<v-icon name="fab-icon" :class="{ 'mr-1': extended }">{{ icon }}</v-icon>
		<span v-if="extended">{{ title }}</span>
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
		topPositionClass: {
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
			extended: !!this.title,
			mdiClose,
		};
	},
	computed: {
		positionAtTop: function () {
			return this.$vuetify.breakpoint.lgAndUp;
		},
		hasMultipleActions: function () {
			return this.actions.length > 0;
		},
		speedDialDirection: function () {
			return !this.positionAtTop ? "top" : "bottom";
		},
		isCollapsed: function () {
			return this.extended && !this.isSpeedDialExpanded;
		},
		showOverlay: function () {
			return this.isSpeedDialExpanded;
		},
		classes: function () {
			let className = "transition";

			if (this.extended) className = className.concat(" ", "extended-fab");
			if (this.positionAtTop)
				className = className.concat(" ", this.topPositionClass);

			return className;
		},
	},
	created() {
		window.addEventListener("scroll", this.onScroll);
	},
	destroyed() {
		window.removeEventListener("scroll", this.onScroll);
	},
	methods: {
		detectScrollingDirection() {
			if (this.title === "" || typeof window === "undefined") return;

			const top = window.pageYOffset || 0;

			if (top >= this.pageOffset) {
				this.extended = false;
			}
			if (top <= this.pageOffset) {
				this.extended = true;
			}

			this.pageOffset = top;
		},
		onScroll() {
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

::v-deep .v-btn--has-bg {
	background-color: var(--color-white) !important;
}

.fab-action-icon {
	color: var(--color-primary) !important;
}
.fab-action:hover .fab-action-icon {
	color: var(--color-primary-dark) !important;
}
</style>
