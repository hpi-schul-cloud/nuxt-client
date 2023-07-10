import {
	FileRecordParentType,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { ref } from "vue";
import { useFileRecord } from "./FileRecord.composable";

describe("FileRecord Composable", () => {
	const setup = () => {
		const parentId = ObjectIdMock();
		const parentType = FileRecordParentType.BOARDNODES;
		const fileRecordResponse = ref(
			fileRecordResponseFactory.build({
				parentId,
				parentType,
			})
		);

		return { fileRecordResponse };
	};

	it("should set isImage to be false", async () => {
		const { fileRecordResponse } = setup();

		const { isImage } = useFileRecord(fileRecordResponse);

		expect(isImage.value).toBe(false);
	});

	it("should set isBlockedByVirusScan to be false", async () => {
		const { fileRecordResponse } = setup();

		const { isBlockedByVirusScan } = useFileRecord(fileRecordResponse);

		expect(isBlockedByVirusScan.value).toBe(false);
	});

	it("should set url correctly", async () => {
		const { fileRecordResponse } = setup();

		const { url } = useFileRecord(fileRecordResponse);

		expect(url.value).toBe(fileRecordResponse.value.url);
	});

	describe("when file is an image", () => {
		const setup = () => {
			const parentId = ObjectIdMock();
			const parentType = FileRecordParentType.BOARDNODES;
			const fileRecordResponse = ref(
				fileRecordResponseFactory.build({
					parentId,
					parentType,
					mimeType: "image/png",
				})
			);

			return { fileRecordResponse };
		};

		it("should set isImage to be true", async () => {
			const { fileRecordResponse } = setup();

			const { isImage } = useFileRecord(fileRecordResponse);

			expect(isImage.value).toBe(true);
		});
	});

	describe("when file is blocked by the virus scanner", () => {
		const setup = () => {
			const parentId = ObjectIdMock();
			const parentType = FileRecordParentType.BOARDNODES;
			const fileRecordResponse = ref(
				fileRecordResponseFactory.build({
					parentId,
					parentType,
					securityCheckStatus: FileRecordScanStatus.BLOCKED,
				})
			);

			return { fileRecordResponse };
		};

		it("should set isBlockedByVirusScan to be true", async () => {
			const { fileRecordResponse } = setup();

			const { isBlockedByVirusScan } = useFileRecord(fileRecordResponse);

			expect(isBlockedByVirusScan.value).toBe(true);
		});

		it("should set url to be empty", async () => {
			const { fileRecordResponse } = setup();

			const { url } = useFileRecord(fileRecordResponse);

			expect(url.value).toBe("");
		});
	});
});
