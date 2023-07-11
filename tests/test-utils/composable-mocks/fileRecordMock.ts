import { useFileRecord } from "@/components/feature-board/content-elements/FileRecord.composable";
import { jest } from "@jest/globals";
import { computed } from "vue";

interface Props {
	isImageMock?: boolean;
	isBlockedByVirusScanMock?: boolean;
	urlMock?: string;
}

export const setupFileRecordMock = (props: Props = {}) => {
	const { isImageMock, isBlockedByVirusScanMock, urlMock } = props;
	const mockedSelectedFile = jest.mocked(useFileRecord);

	const isImage = computed(() => isImageMock ?? false);
	const isBlockedByVirusScan = computed(
		() => isBlockedByVirusScanMock ?? false
	);
	const url = computed(() => urlMock ?? "");

	const mocks = {
		isImage,
		isBlockedByVirusScan,
		url,
	};

	mockedSelectedFile.mockReturnValue(mocks);

	return mocks;
};
