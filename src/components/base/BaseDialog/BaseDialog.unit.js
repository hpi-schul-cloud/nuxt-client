import BaseDialog from "./BaseDialog";

describe("@components/BaseDialog", () => {
	it(...isValidComponent(BaseDialog));

	xdescribe("appearance", () => {
		xit("should display message", () => {});
		xit("icon should have by default the actionDesign prop color", () => {});
	});
	xdescribe("behaviour", () => {
		xit("should auto open on mount", () => {});
		xit("should close on confirm", () => {});
		xit("should close on cancel", () => {});
		xit("should close on click outside", () => {});
		xit("should call onConfirm prop on primary action click", () => {});
		xit("should call onCancel prop on secondary action click", () => {});
		xit("should call onClickOutside prop on click outside", () => {});
	});
});
