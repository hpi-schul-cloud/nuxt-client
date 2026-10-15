import { onScopeDispose, type Ref, ref, watch } from "vue";

const READING_LINE_RATIO = 0.3;
const SCROLL_SETTLE_MS = 150;

export const useActiveCardElement = (
	scroller: Readonly<Ref<HTMLElement | null>>,
	isEnabled: Readonly<Ref<boolean>>,
	elementIds?: Readonly<Ref<string[]>>
) => {
	const activeElementId = ref<string>();
	let frame: number | undefined;
	// A selected element stays active while its programmatic scroll runs, even if
	// the reading line would pick a neighbour (short elements, end of the card).
	let pinnedElementId: string | undefined;
	let settleTimer: ReturnType<typeof setTimeout> | undefined;

	const clearSettleTimer = () => {
		clearTimeout(settleTimer);
		settleTimer = undefined;
	};

	const unpin = () => {
		pinnedElementId = undefined;
		clearSettleTimer();
	};

	const update = () => {
		frame = undefined;
		const container = scroller.value;
		if (!container) return;

		const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-element-id]")).filter(
			(element) => !elementIds || elementIds.value.includes(element.dataset.elementId ?? "")
		);
		if (elements.length === 0) {
			unpin();
			activeElementId.value = undefined;
			return;
		}

		if (pinnedElementId !== undefined) {
			if (elements.some((element) => element.dataset.elementId === pinnedElementId)) {
				activeElementId.value = pinnedElementId;
				return;
			}
			unpin();
		}

		if (container.scrollTop <= 0) {
			activeElementId.value = elements[0].dataset.elementId;
			return;
		}

		// Elements at the end of a card never reach the reading line, because the scroll range ends first.
		// Over the last stretch of scrolling the line moves down to the bottom edge, so each of them gets its turn.
		const maxScrollTop = container.scrollHeight - container.clientHeight;
		const rampDistance = Math.min(container.clientHeight * (1 - READING_LINE_RATIO), maxScrollTop);
		const remainingScroll = maxScrollTop - container.scrollTop;
		const rampProgress = rampDistance > 0 ? Math.min(1, Math.max(0, 1 - remainingScroll / rampDistance)) : 0;
		const readingLineRatio = READING_LINE_RATIO + (1 - READING_LINE_RATIO) * rampProgress;

		const containerRect = container.getBoundingClientRect();
		const readingLine = containerRect.top + container.clientHeight * readingLineRatio;
		const passed = elements.filter((element) => element.getBoundingClientRect().top <= readingLine);

		activeElementId.value = (passed[passed.length - 1] ?? elements[0]).dataset.elementId;
	};

	const scheduleUpdate = () => {
		frame ??= requestAnimationFrame(update);
	};

	const startSettleTimer = () => {
		clearSettleTimer();
		settleTimer = setTimeout(() => {
			settleTimer = undefined;
		}, SCROLL_SETTLE_MS);
	};

	const onScroll = () => {
		if (pinnedElementId !== undefined) {
			if (settleTimer !== undefined) {
				startSettleTimer();
				return;
			}
			unpin();
		}

		scheduleUpdate();
	};

	const select = (elementId: string) => {
		pinnedElementId = elementId;
		activeElementId.value = elementId;
		startSettleTimer();
	};

	const stop = watch(
		[scroller, isEnabled],
		([container, enabled], _previous, onCleanup) => {
			if (!container || !enabled) {
				unpin();
				activeElementId.value = undefined;
				return;
			}

			container.addEventListener("scroll", onScroll, { passive: true });
			scheduleUpdate();

			onCleanup(() => {
				container.removeEventListener("scroll", onScroll);
				if (frame !== undefined) cancelAnimationFrame(frame);
				frame = undefined;
			});
		},
		{ immediate: true, flush: "post" }
	);

	onScopeDispose(() => {
		stop();
		clearSettleTimer();
	});

	return { activeElementId, refresh: scheduleUpdate, select };
};
