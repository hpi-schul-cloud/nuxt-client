import {
	extraSizeForInsertion,
	translationValue,
	visibilityValue,
} from "./constants";
import * as Utils from "./utils";
/* eslint-disable no-undef */
const horizontalMap = {
	size: "offsetWidth",
	distanceToParent: "offsetLeft",
	translate: "transform",
	begin: "left",
	end: "right",
	dragPosition: "x",
	scrollSize: "scrollWidth",
	offsetSize: "offsetWidth",
	scrollValue: "scrollLeft",
	scale: "scaleX",
	setSize: "width",
	setters: {
		translate: (val) => `translate3d(${val}px, 0, 0)`,
	},
};
const verticalMap = {
	size: "offsetHeight",
	distanceToParent: "offsetTop",
	translate: "transform",
	begin: "top",
	end: "bottom",
	dragPosition: "y",
	scrollSize: "scrollHeight",
	offsetSize: "offsetHeight",
	scrollValue: "scrollTop",
	scale: "scaleY",
	setSize: "height",
	setters: {
		translate: (val) => `translate3d(0,${val}px, 0)`,
	},
};
function orientationDependentProps(map) {
	function get(obj, prop) {
		const mappedProp = map[prop];
		return obj[mappedProp || prop];
	}
	function set(obj, prop, value) {
		obj[map[prop]] = map.setters[prop] ? map.setters[prop](value) : value;
	}
	return { get, set };
}
export default function layoutManager(
	containerElement,
	orientation,
	_animationDuration
) {
	containerElement[extraSizeForInsertion] = 0;
	const map = orientation === "horizontal" ? horizontalMap : verticalMap;
	const propMapper = orientationDependentProps(map);
	const values = {
		translation: 0,
		lastVisibleRect: {}, // this fixes the initial error
	};
	window.addEventListener("resize", function () {
		invalidateContainerRectangles(containerElement);
	});
	setTimeout(() => {
		invalidate();
	}, 10);
	function invalidate() {
		invalidateContainerRectangles(containerElement);
		invalidateContainerScale(containerElement);
	}
	function invalidateContainerRectangles(containerElement) {
		values.rect = Utils.getContainerRect(containerElement);
		const visibleRect = Utils.getVisibleRect(containerElement, values.rect);
		values.visibleRect = visibleRect;
	}
	function invalidateContainerScale(containerElement) {
		const rect = containerElement.getBoundingClientRect();
		values.scaleX = containerElement.offsetWidth
			? (rect.right - rect.left) / containerElement.offsetWidth
			: 1;
		values.scaleY = containerElement.offsetHeight
			? (rect.bottom - rect.top) / containerElement.offsetHeight
			: 1;
	}
	function getContainerRectangles() {
		return {
			rect: values.rect,
			visibleRect: values.visibleRect,
			lastVisibleRect: values.lastVisibleRect,
		};
	}
	function getBeginEndOfDOMRect(rect) {
		return {
			begin: propMapper.get(rect, "begin"),
			end: propMapper.get(rect, "end"),
		};
	}
	function getBeginEndOfContainer() {
		const begin = propMapper.get(values.rect, "begin");
		const end = propMapper.get(values.rect, "end");
		return { begin, end };
	}
	function getBeginEndOfContainerVisibleRect() {
		const begin = propMapper.get(values.visibleRect, "begin");
		const end = propMapper.get(values.visibleRect, "end");
		return { begin, end };
	}
	function getSize(element) {
		const htmlElement = element;
		if (htmlElement.tagName) {
			const rect = htmlElement.getBoundingClientRect();
			return orientation === "vertical"
				? rect.bottom - rect.top
				: rect.right - rect.left;
		}
		return propMapper.get(element, "size") * propMapper.get(values, "scale");
	}
	function getDistanceToOffsetParent(element) {
		const distance =
			propMapper.get(element, "distanceToParent") +
			(element[translationValue] || 0);
		return distance * propMapper.get(values, "scale");
	}
	function getBeginEnd(element) {
		const begin =
			getDistanceToOffsetParent(element) +
			propMapper.get(values.rect, "begin") -
			propMapper.get(containerElement, "scrollValue");
		return {
			begin,
			end: begin + getSize(element) * propMapper.get(values, "scale"),
		};
	}
	function setSize(element, size) {
		propMapper.set(element, "setSize", size);
	}
	function getAxisValue(position) {
		return propMapper.get(position, "dragPosition");
	}
	function setTranslation(element, translation) {
		if (!translation) {
			element.style.removeProperty("transform");
		} else {
			propMapper.set(element.style, "translate", translation);
		}
		element[translationValue] = translation;
	}
	function getTranslation(element) {
		return element[translationValue];
	}
	function setVisibility(element, isVisible) {
		if (
			element[visibilityValue] === undefined ||
			element[visibilityValue] !== isVisible
		) {
			if (isVisible) {
				element.style.removeProperty("visibility");
			} else {
				element.style.visibility = "hidden";
			}
			element[visibilityValue] = isVisible;
		}
	}
	function isVisible(element) {
		return element[visibilityValue] === undefined || element[visibilityValue];
	}
	function getTopLeftOfElementBegin(begin) {
		let top = 0;
		let left = 0;
		if (orientation === "horizontal") {
			left = begin;
			top = values.rect.top;
		} else {
			left = values.rect.left;
			top = begin;
		}
		return {
			top,
			left,
		};
	}

	function getPosition(position) {
		return getAxisValue(position);
	}
	function invalidateRects() {
		invalidateContainerRectangles(containerElement);
	}
	function setBegin(style, value) {
		propMapper.set(style, "begin", value);
	}
	return {
		getSize,
		getContainerRectangles,
		getBeginEndOfDOMRect,
		getBeginEndOfContainer,
		getBeginEndOfContainerVisibleRect,
		getBeginEnd,
		getAxisValue,
		setTranslation,
		getTranslation,
		setVisibility,
		isVisible,
		setSize,
		getTopLeftOfElementBegin,
		invalidate,
		invalidateRects,
		getPosition,
		setBegin,
	};
}
