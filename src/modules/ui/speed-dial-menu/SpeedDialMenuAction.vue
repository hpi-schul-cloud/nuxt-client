-
<template>
	<transition :name="orientation === 'left' ? 'slide-fade-left' : 'slide-fade-right'">
		<div v-if="isShow" class="d-flex flex-row pt-4 align-center" :class="classes" :style="styles">
			<template v-if="orientation === 'left'">
				<v-btn
					color="primary"
					class="elevation-6"
					icon
					size="small"
					:href="href"
					:to="to"
					role="menuitem"
					:data-testid="dataTestId"
					@click="onClick"
				>
					<v-icon>{{ props.icon }}</v-icon>
					<span class="d-sr-only"> <slot /> </span>
				</v-btn>
				<v-btn class="ml-4 elevation-6" tabindex="-1" aria-hidden="true" :href="href" :to="to" @click="onClick"
					><slot />
				</v-btn>
			</template>

			<template v-else>
				<v-btn
					class="mr-4 elevation-6"
					tabindex="-1"
					aria-hidden="true"
					:href="href"
					:to="to"
					:data-testid="dataTestId"
					@click="onClick"
					><slot />
				</v-btn>
				<v-btn
					color="primary"
					class="elevation-6"
					icon
					size="small"
					:href="href"
					:to="to"
					role="menuitem"
					@click="onClick"
				>
					<v-icon>{{ props.icon }}</v-icon>
					<span class="d-sr-only"> <slot /></span>
				</v-btn>
			</template>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import {
	INJECT_SPEED_DIAL_ACTION_CLICKED,
	INJECT_SPEED_DIAL_DIRECTION,
	INJECT_SPEED_DIAL_ORIENTATION,
} from "./injection-tokens";
import { delay } from "@/utils/helpers";
import { injectStrict } from "@/utils/inject";
import { computed, onMounted, Ref, ref, unref } from "vue";

interface Props {
	icon: string;
	dataTestId?: string;
	speedDialIndex?: number;
	href?: string;
	to?: string;
}

const props = withDefaults(defineProps<Props>(), {
	dataTestId: "",
	href: "",
	to: "",
	speedDialIndex: 0,
});

const emit = defineEmits<{
	(event: "click"): void;
}>();

const orientation = injectStrict<Ref<"left" | "right">>(INJECT_SPEED_DIAL_ORIENTATION);
const direction = injectStrict<Ref<"top" | "bottom">>(INJECT_SPEED_DIAL_DIRECTION);
const closeMenu = injectStrict<() => void>(INJECT_SPEED_DIAL_ACTION_CLICKED);

const isShow = ref(false);

const classes = computed(() => {
	const classList: string[] = [];
	if (orientation.value === "left") {
		classList.push("justify-start pl-2");
	}
	if (orientation.value === "right") {
		classList.push("justify-end pr-2");
	}
	if (direction.value === "top") {
		classList.push("fix-to-top");
	}
	return classList.join(" ");
});

const styles = computed(() => {
	if (direction.value === "top" && props.speedDialIndex > 0) {
		/**
		 * offset for inverted menu order
		 */
		return { "margin-top": -112 + "px" };
	}
	return {};
});

const onClick = () => {
	emit("click");
	closeMenu();
};

onMounted(async () => {
	const index = unref(props.speedDialIndex);
	if (index === undefined) return;
	await delay(100 * index);
	isShow.value = true;
});
</script>

<style scoped>
.slide-fade-left-enter-active,
.slide-fade-right-enter-active {
	transition: all 0.15s ease-out;
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
	transform: translateX(20px);
	opacity: 0;
}

.slide-fade-right-enter-from,
.slide-fade-right-leave-to {
	transform: translateX(-20px);
	opacity: 0;
}

.fixed-width {
	width: 25px !important;
}

.fix-to-top {
	top: 0;
}
</style>
