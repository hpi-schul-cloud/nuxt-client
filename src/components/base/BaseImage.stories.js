import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import BaseImage from "@basecomponents/BaseImage";

storiesOf("4 Base UI Components/Base UI", module).add("Base Image", () => ({
	components: { BaseImage },
	data: () => ({
		imgsrc: text(
			"Image Source (starting with @assets for internal or url for external)",
			"@assets/img/svgImageExample.svg"
		),
		imgAlt: text("Image Alt", "Dummy image"),
		imgHeight: text("Image Height", "200px"),
		fillColor: text("Fill Color", "var(--color-primary)"),
	}),
	template: `<div><BaseImage :img-src="imgsrc" :img-alt="imgAlt" :img-height="imgHeight" :fill="fillColor"/>
	<p style="text-align: center">
		This component is used to render images.<br>
		Internal Svgs located in (@assets/img) are rendered as <b>HTML SVG</b> component.<br>
		External urls are rendered as <b>HTML IMG</b> component <br>
		You can override <b>fill color</b> only for the <b> default SVG</b> with any color value including variables <br>
		In order to be able to fill color in other svgs <b>root fill property should be removed from the svg</b>
	</p>
	</div>`,
}));
