export interface ElementPositionProps {
	isFirstElement: boolean;
	isLastElement: boolean;
	hasMultipleElements: boolean;
	"@move-down:element": () => void;
	"@move-up:element": () => void;
	"@delete:element": (deleteDirectly: true | undefined) => Promise<void>;
}
