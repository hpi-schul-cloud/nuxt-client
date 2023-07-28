import { useFileRecord } from "@/components/feature-board/content-elements/file-content-element";
import { jest } from "@jest/globals";
import { computed } from "vue";

interface Props {
	isImageMock?: boolean;
	isBlockedByVirusScanMock?: boolean;
	urlMock?: string;
}

export const setupFileRecordMock = (props: Props = {}) => {
	const { isImageMock, isBlockedByVirusScanMock, urlMock } = props;

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

	const useFileRecordMock = jest.mocked(useFileRecord);
	useFileRecordMock.mockReturnValue(mocks);
};
