export type CommonCartridgeVersion = "1.1.0" | "1.3.0";

export const allowedVersions: CommonCartridgeVersion[] = ["1.1.0", "1.3.0"];

export const startExport = async (
	version: CommonCartridgeVersion,
	roomId: string,
	topics: string[],
	tasks: string[],
	columnBoards: string[]
): Promise<void> => {
	if (!allowedVersions.includes(version)) {
		throw new Error(`Invalid version: ${version}. Allowed versions are: ${allowedVersions.join(", ")}`);
	}

	const createHiddenInputElement = (name: string, value: string): HTMLInputElement => {
		const input = document.createElement("input");
		input.type = "hidden";
		input.name = name;
		input.value = value;
		return input;
	};

	const form = document.createElement("form");
	form.method = "POST";
	form.action = `/api/v3/common-cartridge/export/${roomId}?version=${version}`;
	form.enctype = "application/json";
	form.target = "_blank";

	const topicIdsInput = createHiddenInputElement("topics", JSON.stringify(topics));
	const taskIdsInput = createHiddenInputElement("tasks", JSON.stringify(tasks));
	const columnBoardIdsInput = createHiddenInputElement("columnBoards", JSON.stringify(columnBoards));

	form.appendChild(topicIdsInput);
	form.appendChild(taskIdsInput);
	form.appendChild(columnBoardIdsInput);

	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
};
