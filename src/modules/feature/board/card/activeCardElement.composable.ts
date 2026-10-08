import { onScopeDispose, type Ref, ref, watch } from "vue";

const READING_LINE_RATIO = 0.3;
const BOTTOM_TOLERANCE_PX = 2;

export const useActiveCardElement = (
	scroller: Readonly<Ref<HTMLElement | null>>,
	isEnabled: Readonly<Ref<boolean>>
) => {
	const activeElementId = ref<string>();
	let frame: number | undefined;

	const update = () => {
		frame = undefined;
		const container = scroller.value;
		if (!container) return;

		const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-element-id]"));
		if (elements.length === 0) {
			activeElementId.value = undefined;
			return;
		}

		const isAtBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - BOTTOM_TOLERANCE_PX;
		if (isAtBottom && container.scrollTop > 0) {
			activeElementId.value = elements[elements.length - 1].dataset.elementId;
			return;
		}

		const containerRect = container.getBoundingClientRect();
		const readingLine = containerRect.top + container.clientHeight * READING_LINE_RATIO;
		const passed = elements.filter((element) => element.getBoundingClientRect().top <= readingLine);

		activeElementId.value = (passed[passed.length - 1] ?? elements[0]).dataset.elementId;
	};

	const scheduleUpdate = () => {
		frame ??= requestAnimationFrame(update);
	};

	const stop = watch(
		[scroller, isEnabled],
		([container, enabled], _previous, onCleanup) => {
			if (!container || !enabled) {
				activeElementId.value = undefined;
				return;
			}

			container.addEventListener("scroll", scheduleUpdate, { passive: true });
			scheduleUpdate();

			onCleanup(() => {
				container.removeEventListener("scroll", scheduleUpdate);
				if (frame !== undefined) cancelAnimationFrame(frame);
				frame = undefined;
			});
		},
		{ immediate: true, flush: "post" }
	);

	onScopeDispose(stop);

	return { activeElementId, refresh: scheduleUpdate };
};
