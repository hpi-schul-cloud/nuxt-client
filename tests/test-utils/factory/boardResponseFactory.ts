import { timestampsResponseFactory } from "./timestampsResponseFactory";
import { BoardLayout, BoardResponse, BoardResponseAllowedOperations } from "@/serverApi/v3";
import { Factory } from "fishery";
import {} from "vue";

export const boardResponseFactory = Factory.define<BoardResponse>(({ sequence, params }) => ({
	id: `board${sequence}`,
	title: `board #${sequence}`,
	columns: [],
	timestamps: timestampsResponseFactory.build(),
	isVisible: false,
	layout: BoardLayout.Columns,
	features: [],
	permissions: [],
	allowedOperations: getAllowedOperations(params?.allowedOperations || {}),
	readersCanEdit: false,
}));

type OperationsKey = keyof BoardResponseAllowedOperations;

const getAllowedOperations = (
	allowedOperations: Partial<BoardResponseAllowedOperations>
): BoardResponseAllowedOperations => {
	const result = {
		copyBoard: false,
		deleteBoard: false,
		findBoard: false,
		relocateContent: false,
		shareBoard: false,
		updateBoardLayout: false,
		updateBoardTitle: false,
		updateReadersCanEditSetting: false,
		createColumn: false,
		deleteColumn: false,
		moveColumn: false,
		updateColumnTitle: false,
		copyCard: false,
		createCard: false,
		deleteCard: false,
		findCards: false,
		moveCard: false,
		shareCard: false,
		updateCardHeight: false,
		updateCardTitle: false,
		createElement: false,
		deleteElement: false,
		moveElement: false,
		updateElement: false,
		viewElement: false,
		createExternalToolElement: false,
		createFileElement: false,
		createSubmissionItemContent: false,
		deleteSubmissionItem: false,
		updateSubmissionItem: false,
		manageVideoConference: false,
		collapseMediaBoard: false,
		updateBoardVisibility: false,
		updateMediaBoardColor: false,
		updateMediaBoardLayout: false,
		viewMediaBoard: false,
		collapseMediaBoardLine: false,
		createMediaBoardLine: false,
		deleteMediaBoardLine: false,
		updateMediaBoardLine: false,
		updateMediaBoardLineColor: false,
	} as unknown as BoardResponseAllowedOperations;
	for (const key in allowedOperations) {
		result[key as OperationsKey] = allowedOperations[key as OperationsKey] || false;
	}
	return result;
};
