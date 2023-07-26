/* eslint-disable no-useless-call */
import { containerInstance } from "./constants";
export const getIntersection = (rect1, rect2) => {
	return {
		left: Math.max(rect1.left, rect2.left),
		top: Math.max(rect1.top, rect2.top),
		right: Math.min(rect1.right, rect2.right),
		bottom: Math.min(rect1.bottom, rect2.bottom),
	};
};

const ScrollAxis = {
	x: "x",
	y: "y",
	xy: "xy",
};

export const getIntersectionOnAxis = (rect1, rect2, axis) => {
	if (axis === "x") {
		return {
			left: Math.max(rect1.left, rect2.left),
			top: rect1.top,
			right: Math.min(rect1.right, rect2.right),
			bottom: rect1.bottom,
		};
	} else {
		return {
			left: rect1.left,
			top: Math.max(rect1.top, rect2.top),
			right: rect1.right,
			bottom: Math.min(rect1.bottom, rect2.bottom),
		};
	}
};
export const getContainerRect = (element) => {
	const _rect = element.getBoundingClientRect();
	const rect = {
		left: _rect.left,
		right: _rect.right,
		top: _rect.top,
		bottom: _rect.bottom,
	};
	if (hasBiggerChild(element, "x")) {
		const width = rect.right - rect.left;
		rect.right = rect.right + element.scrollWidth - width;
	}
	if (hasBiggerChild(element, "y")) {
		const height = rect.bottom - rect.top;
		rect.bottom = rect.bottom + element.scrollHeight - height;
	}
	return rect;
};
export const getScrollingAxis = (element) => {
	const style = window.getComputedStyle(element);
	const overflow = style.overflow;
	const general = overflow === "auto" || overflow === "scroll";
	if (general) return ScrollAxis.xy;
	const overFlowX = style["overflow-x"];
	const xScroll = overFlowX === "auto" || overFlowX === "scroll";
	const overFlowY = style["overflow-y"];
	const yScroll = overFlowY === "auto" || overFlowY === "scroll";
	if (xScroll && yScroll) return ScrollAxis.xy;
	if (xScroll) return ScrollAxis.x;
	if (yScroll) return ScrollAxis.y;
	return null;
};
export const isScrolling = (element, axis) => {
	return false; //general || dimensionScroll; // <=== important
};
export const isScrollingOrHidden = (element, axis) => {
	return false; //general || dimensionScroll; // <==== important
};
export const hasBiggerChild = (element, axis) => {
	if (axis === "x") {
		return element.scrollWidth > element.clientWidth;
	} else {
		return element.scrollHeight > element.clientHeight;
	}
};
export const getVisibleRect = (element, elementRect) => {
	let currentElement = element;
	const rect = elementRect || getContainerRect(element);
	currentElement = element.parentElement;
	while (currentElement) {
		currentElement = currentElement.parentElement;
	}
	return rect;
};
export const getParentRelevantContainerElement = (
	element,
	relevantContainers
) => {
	let current = element;
	while (current) {
		if (current[containerInstance]) {
			const container = current[containerInstance];
			if (relevantContainers.some((p) => p === container)) {
				return container;
			}
		}
		current = current.parentElement;
	}
	return null;
};
export const hasParent = (element, parent) => {
	let current = element;
	while (current) {
		if (current === parent) {
			return true;
		}
		current = current.parentElement;
	}
	return false;
};
export const getParent = (element, selector) => {
	let current = element;
	while (current) {
		if (current.matches(selector)) {
			return current;
		}
		current = current.parentElement;
	}
	return null;
};
export const hasClass = (element, cls) => {
	return (
		element.className
			.split(" ")
			.map((p) => p)
			.indexOf(cls) > -1
	);
};
export const addClass = (element, cls) => {
	if (element) {
		const classes = element.className.split(" ").filter((p) => p);
		if (classes.indexOf(cls) === -1) {
			classes.unshift(cls);
			element.className = classes.join(" ");
		}
	}
};
export const removeClass = (element, cls) => {
	if (element) {
		const classes = element.className.split(" ").filter((p) => p && p !== cls);
		element.className = classes.join(" ");
	}
};
export const debounce = (fn, delay, immediate) => {
	let timer = null;
	return (...params) => {
		if (timer) {
			clearTimeout(timer);
		}
		if (immediate && !timer) {
			fn.call(null, ...params);
		} else {
			timer = setTimeout(() => {
				timer = null;
				fn.call(null, ...params);
			}, delay);
		}
	};
};
export const removeChildAt = (parent, index) => {
	return parent.removeChild(parent.children[index]);
};
export const addChildAt = (parent, child, index) => {
	if (index >= parent.children.length) {
		parent.appendChild(child);
	} else {
		parent.insertBefore(child, parent.children[index]);
	}
};
export const isMobile = () => {
	if (typeof window !== "undefined") {
		if (
			window.navigator.userAgent.match(/Android/i) ||
			window.navigator.userAgent.match(/webOS/i) ||
			window.navigator.userAgent.match(/iPhone/i) ||
			window.navigator.userAgent.match(/iPad/i) ||
			window.navigator.userAgent.match(/iPod/i) ||
			window.navigator.userAgent.match(/BlackBerry/i) ||
			window.navigator.userAgent.match(/Windows Phone/i)
		) {
			return true;
		} else {
			return false;
		}
	}
	return false;
};
export const clearSelection = () => {
	if (window.getSelection) {
		if (window.getSelection().empty) {
			// Chrome
			window.getSelection().empty();
		} else if (window.getSelection().removeAllRanges) {
			// Firefox
			window.getSelection().removeAllRanges();
		}
	} else if (window.document.selection) {
		// IE?
		window.document.selection.empty();
	}
};
export const getElementCursor = (element) => {
	if (element) {
		const style = window.getComputedStyle(element);
		if (style) {
			return style.cursor;
		}
	}
	return null;
};
export const getDistanceToParent = (parent, child) => {
	let current = child;
	let dist = 0;
	while (current) {
		if (current === parent) {
			return dist;
		}
		dist++;
		current = current.parentElement;
	}
	return null;
};
export function isVisible(rect) {
	return true;
	// return !(rect.bottom <= rect.top || rect.right <= rect.left);
}
