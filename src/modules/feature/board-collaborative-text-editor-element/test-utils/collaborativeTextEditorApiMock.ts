import { useCollaborativeTextEditorApi } from "../composables/CollaborativeTextEditorApi.composable";

interface Props {
	getUrlMock?: jest.Mock;
}

export const setupCollaborativeTextEditorApiMock = (props: Props = {}) => {
	const { getUrlMock } = props;
	const mockedCollaborativeTextEditorApi = jest.mocked(
		useCollaborativeTextEditorApi
	);

	const getUrl = getUrlMock ?? jest.fn();

	const mocks = {
		getUrl,
	};

	mockedCollaborativeTextEditorApi.mockReturnValue(mocks);

	return mocks;
};
