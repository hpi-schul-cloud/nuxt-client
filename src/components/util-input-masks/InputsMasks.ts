import { createInputMask } from "./InputMask.factory";

export const dateInputMask = createInputMask({
	mask: "##.##.####",
	preProcess: (value: string) => {
		const [year, month, day] = value.split("-");
		return day + month + year;
	},
});

export const timeInputMask = createInputMask({ mask: "##:##" });
