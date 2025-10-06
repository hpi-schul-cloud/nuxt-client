import { Arrayable, MaybeComputedElementRef } from "@vueuse/core";
import { useFocusTrap, UseFocusTrapOptions } from "@vueuse/integrations/useFocusTrap";
import { MaybeRefOrGetter, ModelRef, Ref, watch } from "vue";

// This composable makes sure the focus trap is properly deactivated when isActiveRef (e. g. the v-model of a dialog) boolean changes to false.
export function useSafeFocusTrap(
	isActiveRef: ModelRef<boolean> | Ref<boolean>,
	target: Arrayable<MaybeRefOrGetter<string> | MaybeComputedElementRef>,
	options?: UseFocusTrapOptions
) {
	const { pause, unpause, activate, deactivate, hasFocus, isPaused } = useFocusTrap(target, {
		immediate: true,
		...options,
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
