import { Colors } from "@api-server";
import colors from "vuetify/lib/util/colors";

export const isMediaBoardColor = (colorName: string): colorName is Colors =>
	Object.values<string>(Colors).includes(colorName);

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

const getHexToColorMap = (): Record<string, Colors> => {
	const colorNames: string[] = Object.keys(colors);

	const looseColorMap: Record<string, Colors>[] = colorNames.map(
		(colorName: string): Record<string, Colors> => {
			if (isMediaBoardColor(colorName) && colorName !== Colors.TRANSPARENT) {
				const hexValues: string[] = Object.values(colors[colorName]);

				return hexValues.reduce(
					(previousValue: Record<string, Colors>, currentValue: string): Record<string, Colors> => {
						previousValue[currentValue] = colorName;

						return previousValue;
					},
					{}
				);
			}
			return {};
		}
	);

	const colorMap: Record<string, Colors> = Object.assign({}, ...looseColorMap);

	return colorMap;
};

const hexToColorMap: Record<string, Colors> = getHexToColorMap();

export class MediaBoardColorMapper {
	static mapColorToHex(colorName: Colors, shade: ColorShade): string {
		if (colorName === Colors.TRANSPARENT) {
			return colors.shades.white;
		}

		const colorSet = colors[colorName];

		return colorSet[shade];
	}

	static mapHexToColor(hex: string): Colors | undefined {
		if (hex.toLowerCase() === colors.shades.white) {
			return Colors.TRANSPARENT;
		}

		return hexToColorMap[hex.toLowerCase()];
	}
}
