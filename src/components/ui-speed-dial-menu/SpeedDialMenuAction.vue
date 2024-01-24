<template>
	<transition
		:name="orientation === 'left' ? 'slide-fade-left' : 'slide-fade-right'"
	>
		<div
			v-if="isShow"
			class="d-flex flex-row justify-start pt-4 align-center"
			:class="orientation === 'left' ? 'justify-start' : 'justify-end'"
		>
			<template v-if="orientation === 'left'">
				<v-btn color="primary" icon size="small">
					<v-icon>{{ props.icon }}</v-icon>
					<span class="d-sr-only"> <slot /></span>
				</v-btn>
				<v-btn
					density="compact"
					color="secondary"
					variant="tonal"
					class="ml-4"
					tabindex="-1"
					><slot /> {{ props.speedDialIndex }}
				</v-btn>
			</template>
			<template v-else>
				<v-btn
					density="compact"
					color="secondary"
					variant="tonal"
					class="mr-4"
					tabindex="-1"
					><slot /> {{ props.speedDialIndex }}
				</v-btn>
				<v-btn color="primary" icon size="small">
					<v-icon>{{ props.icon }}</v-icon>
					<span class="d-sr-only"> <slot /></span>
				</v-btn>
			</template>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import { INJECT_SPEED_DIAL_ORIENTATION } from "./injection-tokens";
import { delay } from "@/utils/helpers";
import { injectStrict } from "@/utils/inject";
import { onMounted, ref, unref } from "vue";

const props = defineProps<{
	icon: string;
	/**
	 * internal prop for animation order
	 */
	speedDialIndex?: number;
	href?: string;
}>();
defineEmits<{
	(event: "click"): void;
}>();

const isShow = ref(false);

const orientation = injectStrict(INJECT_SPEED_DIAL_ORIENTATION);
// const direction = injectStrict(INJECT_SPEED_DIAL_DIRECTION);

onMounted(async () => {
	const index = unref(props.speedDialIndex);
	if (index === undefined) return;
	await delay(150 * index);
	isShow.value = true;
});
</script>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-left-enter-active,
.slide-fade-right-enter-active {
	transition: all 0.2s ease-out;
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
</style>
