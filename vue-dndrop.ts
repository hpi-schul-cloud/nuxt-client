declare module "vue-dndrop" {
	import Vue from "vue";

	type Payload = unknown;

	interface DropResult {
		removedIndex: number;
		addedIndex: number;
		payload: Payload;
		element: Element;
	}

	interface DragEvent {
		isSource: boolean;
		payload: Payload;
		willAcceptDrop: boolean;
	}

	interface NodeDescription {
		value: string;
		props: Vue.VNodeData;
	}

	interface ContainerProps {
		orientation?: string;
		behaviour?: string;
		tag?: string | NodeDescription;
		groupName?: string;
		lockAxis?: string;
		dragHandleSelector?: string;
		nonDragAreaSelector?: string;
		dragBeginDelay?: number;
		animationDuration?: number;
		autoScrollEnabled?: boolean;
		dragClass?: string;
		dropClass?: string;
		removeOnDropOut?: boolean;
		getChildPayload?: (index: number) => Payload;
		shouldAnimateDrop?: (
			sourceContainerOptions: ContainerProps,
			payload: Payload
		) => boolean;
		shouldAcceptDrop?: (
			sourceContainerOptions: ContainerProps,
			payload: Payload
		) => boolean;
		getGhostParent: () => Element;
		onDragStart?: (dragEvent: DragEvent) => void;
		onDragEnd?: (dragEvent: DragEvent) => void;
		onDrop?: (dropResult: DropResult) => void;
		onDragEnter?: () => void;
		onDragLeave?: () => void;
		onDropReady?: (dropResult: DropResult) => void;
	}

	class Container extends Vue {
		props: ContainerProps;
	}

	class Draggable extends Vue {
		props: {
			tag?: string | NodeDescription;
		};
	}
}
