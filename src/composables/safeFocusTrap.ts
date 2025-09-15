import { MaybeRefOrGetter, ModelRef, Ref, watch } from "vue";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { Arrayable, MaybeComputedElementRef } from "@vueuse/core";

// This composable makes sure the focus trap is properly deactivated when the v-model boolean changes to false
export function useSafeFocusTrap(
	isActiveRef: ModelRef<boolean> | Ref<boolean>,
	target: Arrayable<MaybeRefOrGetter<string> | MaybeComputedElementRef>
) {
	const { pause, unpause, activate, deactivate, hasFocus, isPaused } =
		useFocusTrap(target, {
			immediate: true,
		});

	watch(
		() => isActiveRef.value,
		(isActive: boolean) => {
			if (isActive === false) {
				deactivate();
			}
		}
	);

	return {
		pause,
		unpause,
		activate,
		deactivate,
		hasFocus,
		isPaused,
	};
}
