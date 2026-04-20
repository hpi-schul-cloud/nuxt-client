import { Colors } from "@api-server";
import colors from "vuetify/lib/util/colors";

export type ColorShade = "lighten3" | "lighten5";

const DEFAULT_COLORS = [
	Colors.TRANSPARENT,
	Colors.LIGHT_GREEN,
	Colors.GREEN,
	Colors.CYAN,
	Colors.BLUE,
	Colors.INDIGO,
	Colors.PURPLE,
	Colors.PINK,
	Colors.DEEP_ORANGE,
	Colors.AMBER,
	Colors.BLUE_GREY,
];

const colorToHex = (color: Colors, shade: ColorShade): string =>
	color === Colors.TRANSPARENT ? colors.shades.white : colors[color][shade];

const buildDefaultColors = (shade: ColorShade) =>
	Object.fromEntries(DEFAULT_COLORS.map((color) => [color, colorToHex(color, shade)]));

export const COLORS_LIGHTEN3 = buildDefaultColors("lighten3");
export const COLORS_LIGHTEN5 = buildDefaultColors("lighten5");

export const HEX_TO_COLOR_LIGHTEN3 = Object.fromEntries(
	Object.entries(COLORS_LIGHTEN3).map(([k, v]) => [v, k as Colors])
);
export const HEX_TO_COLOR_LIGHTEN5 = Object.fromEntries(
	Object.entries(COLORS_LIGHTEN5).map(([k, v]) => [v, k as Colors])
);

export const colorToHexLighten3 = (color: Colors) => COLORS_LIGHTEN3[color];
export const colorToHexLighten5 = (color: Colors) => COLORS_LIGHTEN5[color];

export const hexToColorLighten3 = (hex: string) => HEX_TO_COLOR_LIGHTEN3[hex.toLowerCase()];
export const hexToColorLighten5 = (hex: string) => HEX_TO_COLOR_LIGHTEN5[hex.toLowerCase()];
