import colors from "vuetify/lib/util/colors.mjs";
import { MediaBoardColors } from "../data";

export const isMediaBoardColor = (
	colorName: string
): colorName is MediaBoardColors =>
	Object.values<string>(MediaBoardColors).includes(colorName);

export type ColorShade =
	| "base"
	| "lighten5"
	| "lighten4"
	| "lighten3"
	| "lighten2"
	| "lighten1"
	| "darken1"
	| "darken2"
	| "darken3"
	| "darken4";

const getHexToColorMap = (): Record<string, MediaBoardColors> => {
	const colorNames: string[] = Object.keys(colors);

	const looseColorMap: Record<string, MediaBoardColors>[] = colorNames.map(
		(colorName: string): Record<string, MediaBoardColors> => {
			if (
				isMediaBoardColor(colorName) &&
				colorName !== MediaBoardColors.TRANSPARENT
			) {
				const hexValues: string[] = Object.values(colors[colorName]);

				return hexValues.reduce(
					(
						previousValue: Record<string, MediaBoardColors>,
						currentValue: string
					): Record<string, MediaBoardColors> => {
						previousValue[currentValue] = colorName;

						return previousValue;
					},
					{}
				);
			}
			return {};
		}
	);

	const colorMap: Record<string, MediaBoardColors> = Object.assign(
		{},
		...looseColorMap
	);

	return colorMap;
};

const hexToColorMap: Record<string, MediaBoardColors> = getHexToColorMap();

export class MediaBoardColorMapper {
	static mapColorToHex(colorName: MediaBoardColors, shade: ColorShade): string {
		if (colorName === MediaBoardColors.TRANSPARENT) {
			return colors.shades.white;
		}

		const colorSet = colors[colorName];

		return colorSet[shade];
	}

	static mapHexToColor(hex: string): MediaBoardColors | undefined {
		if (hex.toLowerCase() === colors.shades.white) {
			return MediaBoardColors.TRANSPARENT;
		}

		return hexToColorMap[hex.toLowerCase()];
	}
}
