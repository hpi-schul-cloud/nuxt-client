<template>
	<v-speed-dial
		v-if="actions.length > 0"
		v-model="fab"
		fixed
		:bottom="$vuetify.breakpoint.mdAndDown"
		right
		class="fixed"
		direction="bottom"
	>
		<template v-slot:activator>
			<v-btn
				v-model="fab"
				color="primary"
				dark
				fab
				:width="extended && !fab ? '120' : ''"
				rounded
				:small="extended && !fab"
			>
				<v-icon v-if="fab"> {{ mdiClose }} </v-icon>
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
		:bottom="$vuetify.breakpoint.mdAndDown"
		color="primary"
		dark
		:width="extended ? '120' : ''"
		rounded
		:small="extended"
		class="fixed"
		:href="href"
	>
		<v-icon :class="extended ? 'mr-1' : ''">{{ icon }}</v-icon>
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
			fab: false,
			pageOffset: 0,
			extended: true,
			mdiClose,
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
.fixed {
	position: fixed !important;
	transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
}

::v-deep .v-speed-dial__list {
	right: 0 !important;
	left: initial;
	align-items: end;
	width: auto;
}
</style>
