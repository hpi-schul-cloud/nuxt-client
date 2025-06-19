import { useCollaborativeTextEditorApi } from "../composables/CollaborativeTextEditorApi.composable";

interface Props {
	getUrlMock?: vi.Mock;
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
