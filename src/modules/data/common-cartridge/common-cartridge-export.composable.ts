export type CommonCartridgeVersion = "1.1.0" | "1.3.0";

export const useCommonCartridgeExport = () => {
	const allowedVersions: CommonCartridgeVersion[] = ["1.1.0", "1.3.0"];

	const startExport = async (
		version: CommonCartridgeVersion,
		roomId: string,
		topics: string[],
		tasks: string[],
		columnBoards: string[]
	): Promise<void> => {
		if (!allowedVersions.includes(version)) {
			throw new Error(`Invalid version: ${version}. Allowed versions are: ${allowedVersions.join(", ")}`);
		}

		const form = document.createElement("form");
		form.method = "POST";
		form.action = `/api/v3/common-cartridge/export/${roomId}?version=${version}`;
		form.enctype = "application/json";
		form.target = "_blank";

		const topicIdsInput = document.createElement("input");
		topicIdsInput.type = "hidden";
		topicIdsInput.name = "topics";
		topicIdsInput.value = JSON.stringify(topics);
		form.appendChild(topicIdsInput);

		const taskIdsInput = document.createElement("input");
		taskIdsInput.type = "hidden";
		taskIdsInput.name = "tasks";
		taskIdsInput.value = JSON.stringify(tasks);
		form.appendChild(taskIdsInput);

		const columnBoardIdsInput = document.createElement("input");
		columnBoardIdsInput.type = "hidden";
		columnBoardIdsInput.name = "columnBoards";
		columnBoardIdsInput.value = JSON.stringify(columnBoards);
		form.appendChild(columnBoardIdsInput);

		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	};

	return {
		startExport,
		allowedVersions,
	};
};
