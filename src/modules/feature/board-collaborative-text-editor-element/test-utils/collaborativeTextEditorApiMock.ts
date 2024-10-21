import { Jest as jest } from "@jest/environment";
import { useCollaborativeTextEditorApi } from "../composables/CollaborativeTextEditorApi.composable";

interface Props {
	getUrlMock?: jest.Mock;
}

export const setupCollaborativeTextEditorApiMock = (props: Props = {}) => {
	const { getUrlMock } = props;
	const mockedCollaborativeTextEditorApi = vi.mocked(
		useCollaborativeTextEditorApi
	);

	const getUrl = getUrlMock ?? vi.fn();

	const mocks = {
		getUrl,
	};

	mockedCollaborativeTextEditorApi.mockReturnValue(mocks);

	return mocks;
};
