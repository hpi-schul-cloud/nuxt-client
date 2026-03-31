import colors from "vuetify/lib/util/colors";

export enum ColorPickerDefaultColors {
	WHITE = "white",
	PINK = "pink",
	PURPLE = "purple",
	INDIGO = "indigo",
	BLUE = "blue",
	CYAN = "cyan",
	GREEN = "green",
	LIGHT_GREEN = "lightGreen",
	AMBER = "amber",
	DEEP_ORANGE = "deepOrange",
	BLUE_GREY = "blueGrey",
}

export type ColorPickerDefaultShade = "lighten-5";

export const ColorNameToHexMap = Object.fromEntries(
	Object.values(ColorPickerDefaultColors).map((color) => [
		color,
		color === ColorPickerDefaultColors.WHITE ? colors.shades.white : colors[color].lighten3,
	])
) as Record<ColorPickerDefaultColors, string>;

export const HexToColorNameMap = Object.fromEntries(
	Object.entries(ColorNameToHexMap).map(([name, hex]) => [hex, name])
) as Record<string, ColorPickerDefaultColors>;
