import { createInputMask } from "./InputMask.factory";

export const dateInputMask = createInputMask({
	mask: "##.##.####",
});

export const timeInputMask = createInputMask({ mask: "##:##" });
