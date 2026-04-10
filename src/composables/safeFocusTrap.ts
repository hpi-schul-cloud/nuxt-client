import { Arrayable, MaybeComputedElementRef } from "@vueuse/core";
import { useFocusTrap, UseFocusTrapOptions } from "@vueuse/integrations/useFocusTrap";
import { MaybeRefOrGetter, ModelRef, nextTick, Ref, watch } from "vue";
import { useDisplay } from "vuetify";

// This composable makes sure the focus trap is properly deactivated when isActiveRef (e. g. the v-model of a dialog) boolean changes to false.
export function useSafeFocusTrap(
	isActiveRef: ModelRef<boolean> | Ref<boolean>,
	target: Arrayable<MaybeRefOrGetter<string> | MaybeComputedElementRef>,
	options?: UseFocusTrapOptions
) {
	const { mobile } = useDisplay();
	const { pause, unpause, activate, deactivate, hasFocus, isPaused } = useFocusTrap(target, {
		...options,
	});

	watch(
		isActiveRef,
		async (isActive: boolean) => {
			// On mobile, we do not want to activate the focus trap because focus-trap is not officially supporting mobile devices.
			// See: https://github.com/focus-trap/focus-trap?tab=readme-ov-file#browser-support
			// If this was active on mobile devices focus would be restored to the first focusable element on every interaction which would lead to a broken user experience.
			if (isActive && !mobile.value) {
				await nextTick();
				activate();
			} else {
				await nextTick();
				deactivate();
			}
		},
		{ immediate: true }
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
