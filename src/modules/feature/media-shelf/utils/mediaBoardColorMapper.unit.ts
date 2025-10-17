import { isMediaBoardColor, MediaBoardColorMapper } from "./mediaBoardColorMapper";
import { MediaBoardColors } from "@/serverApi/v3";
import colors from "vuetify/lib/util/colors";

describe(MediaBoardColorMapper.name, () => {
	describe("isMediaBoardColor", () => {
		describe("when it is a media board color", () => {
			it("should return true", () => {
				const result = isMediaBoardColor(MediaBoardColors.Red);

				expect(result).toEqual(true);
			});
		});

		describe("when it is not a media board color", () => {
			it("should return true", () => {
				const result = isMediaBoardColor("treeBrown");

				expect(result).toEqual(false);
			});
		});
	});

	describe("mapColorToHex", () => {
		describe("when the color is a vuetify color", () => {
			it("should return the hex value for the vuetify color", () => {
				const result = MediaBoardColorMapper.mapColorToHex(MediaBoardColors.Red, "lighten5");

				expect(result).toEqual(colors.red.lighten5);
			});
		});

		describe("when the color is transparent", () => {
			it("should return white", () => {
				const result = MediaBoardColorMapper.mapColorToHex(MediaBoardColors.Transparent, "lighten5");

				expect(result).toEqual(colors.shades.white);
			});
		});
	});

	describe("mapHexToColor", () => {
		describe("when the color is a vuetify color", () => {
			it("should return the color name", () => {
				const result = MediaBoardColorMapper.mapHexToColor(colors.blue.darken1);

				expect(result).toEqual(MediaBoardColors.Blue);
			});
		});

		describe("when the hex value is white", () => {
			it("should return transparent", () => {
				const result = MediaBoardColorMapper.mapHexToColor(colors.shades.white);

				expect(result).toEqual(MediaBoardColors.Transparent);
			});
		});

		describe("when the hex value is unknown", () => {
			it("should return undefined", () => {
				const result = MediaBoardColorMapper.mapHexToColor("#FFFFF0");

				expect(result).toBeUndefined();
			});
		});
	});
});
