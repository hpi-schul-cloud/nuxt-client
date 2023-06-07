import { useBoardNotifier } from "./BoardNotifications.composable";
import { notifierModule } from "@/store";

// import NotifierModule from "@/store/notifier";

// const notifierModule = new NotifierModule({});
const showMock = jest.fn();

notifierModule.setNotifier = showMock;

const { showSuccess, showInfo, showFailure } = useBoardNotifier();

describe("BoardNotifications.composable", () => {
	describe("when showSuccess method called", () => {
		it("bla bla", () => {
			showSuccess();
			expect(showMock).toHaveBeenCalled();
		});
	});
});
