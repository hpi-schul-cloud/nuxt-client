import { storiesOf } from "@storybook/vue";
import Color from "@storyComponents/Color";
import Gradient from "@storyComponents/Gradient";
import Elevation from "@storyComponents/Elevation";
import ColorOnText from "@storyComponents/ColorOnText";

storiesOf("Styles|Colors", module)
	.add("Main", () => ({
		components: { Color, Gradient },
		template: `<div>
		<Color title="Primary" color="#E98404" variable="--color-primary"/>
		<Color title="Primary Light" color="#EC962A" variable="--color-primary-light"/>
		<Color title="Primary Dark" color="#AF6303" variable="--color-primary-dark"/>
		<Color title="Secondary" color="#B1063A" variable="--color-secondary"/>
		<Color title="Secondary Light" color="#bd2b58" variable="--color-secondary-light"/>
		<Color title="Secondary Dark" color="#85052c" variable="--color-secondary-dark"/>
		<Gradient colorStart="#F6A800" colorEnd="#B1063A"/>
		<Color title="Tertiary" color="#455b6a" variable="--color-tertiary"/>
		<Color title="Tertiary Light" color="#617480" variable="--color-tertiary-light"/>
		<Color title="Tertiary Dark" color="#344450" variable="--color-tertiary-dark"/>
	</div>`,
	}))
	.add("Shades", () => ({
		components: { Color, Gradient },
		template: `<div>
		<h3>Shades</h3>
		<Color color="#000000" variable="--color-black"/>
		<Color color="#aaaaaa" variable="--color-gray"/>
		<Color color="#eeeeee" variable="--color-gray-light"/>
		<Color color="#444444" variable="--color-gray-dark"/>
		<Color color="#ffffff" variable="--color-white"/>
	</div>
	`,
	}))
	.add("Feedback", () => ({
		components: { Color, Gradient },
		template: `<div>
		<Color color="#13ba98"variable="--color-sucess"/>
		<Color color="#ffd611" variable="--color-warning"/>
		<Color color="#ff1134" variable="--color-danger"/>
		<Color color="#36bdfb" variable="--color-info"/>
	</div>
	`,
	}));

storiesOf("Styles|TextOnColors", module)
	.add("Main", () => ({
		components: { ColorOnText },
		template: `<div>
		<ColorOnText title="Primary" color="#E98404" variable="--color-primary" textColor="--color-on-primary"/>
		<ColorOnText title="Primary Light" color="#EC962A" variable="--color-primary-light" textColor="--color-on-primary-light"/>
		<ColorOnText title="Primary Dark" color="#AF6303" variable="--color-primary-dark" textColor="--color-on-primary-dark"/>
		<ColorOnText title="Secondary" color="#B1063A" variable="--color-secondary" textColor="--color-on-secondary"/>
		<ColorOnText title="Secondary Light" color="#bd2b58" variable="--color-secondary-light" textColor="--color-on-secondary-light"/>
		<ColorOnText title="Secondary Dark" color="#85052c" variable="--color-secondary-dark" textColor="--color-on-secondary-dark"/>
		<ColorOnText title="Tertiary" color="#455b6a" variable="--color-tertiary" textColor="--color-on-tertiary"/>
		<ColorOnText title="Tertiary Light" color="#617480" variable="--color-tertiary-light" textColor="--color-on-tertiary-light"/>
		<ColorOnText title="Tertiary Dark" color="#344450" variable="--color-tertiary-dark" textColor="--color-on-tertiary-dark"/>
	</div>
	`,
	}))
	.add("Feedback", () => ({
		components: { ColorOnText },
		template: `<div>
		<ColorOnText color="#13ba98" variable="--color-sucess" textColor="--color-on-success"/>
		<ColorOnText color="#ffd611" variable="--color-warning" textColor="--color-on-warning"/>
		<ColorOnText color="#ff1134" variable="--color-danger" textColor="--color-on-danger"/>
		<ColorOnText color="#36bdfb" variable="--color-info" textColor="--color-on-info"/>
	</div>
	`,
	}));

storiesOf("Styles|Gradients", module).add("CourseColors", () => ({
	components: { Gradient },
	template: `<div>
			<Gradient colorStart="#f22a19" colorEnd="#f96464" title="Deutsch"/>
			<Gradient colorStart="#075DBE" colorEnd="#02dafd" title="Mathe"/>
			<Gradient colorStart="#029b95" colorEnd="#03b2d6" title="Biologie, Chemie, Physik"/>
			<Gradient colorStart="#0d2a36" colorEnd="#147a98" title="Informatik, Technik"/>
			<Gradient colorStart="#ff7400" colorEnd="#ffc400" title="Fremdsprachen"/>
			<Gradient colorStart="#75270d" colorEnd="#b6916a" title="Ehrziehungs- und Gesellschaftswissenschaften, Erdkunde, Politik, Wirtschaft, Sozialwissenschaften"/>
			<Gradient colorStart="#3b1e65" colorEnd="#e42c85" title="Bildende Kunst, Musik"/>
			<Gradient colorStart="#2c3e50" colorEnd="#fd746c" title="Philisophie, Ethik"/>
			<Gradient colorStart="#16a085" colorEnd="#f4d03f" title="Sport"/>
			<Gradient colorStart="#0d2a36" colorEnd="#a6a6a6" title="Sonstiges"/>
		</div>`,
}));

storiesOf("Styles|Elevation", module).add("default", () => ({
	components: { Elevation },
	template: `<div>
			<Elevation variable="--shadow-xxxs" title="01dp" styling="(0 1px 1px 0)(0 2px 1px -1px)(0 1px 3px 0)"/>
			<Elevation variable="--shadow-xxs" title="02dp" styling="(0 2px 2px 0)(0 3px 1px -2px)(0 1px 5px 0)"/>
			<Elevation variable="--shadow-xs" title="03dp" styling="(0 3px 4px 0)(0 3px 3px -2px)(0 1px 8px 0)"/>
			<Elevation variable="--shadow-s" title="04dp" styling="(0 4px 5px 0)(0 1px 10px -1px)(0 2px 4px -1px)"/>
			<Elevation variable="--shadow-m" title="06dp" styling="(0 6px 10px 0)(0 1px 18px 0)(0 3px 5px -1px)"/>
			<Elevation variable="--shadow-l" title="08dp" styling="(0 8px 10px 1px)(0 3px 14px 2px)(0 5px 5px -3px)"/>
			<Elevation variable="--shadow-xl" title="09dp" styling="(0 9px 12px 1px)(0 3px 16px 2px)(0 5px 6px -3px)"/>
			<Elevation variable="--shadow-xxl" title="12dp" styling="(0 12px 17px 2px)(0 5px 22px 4px)(0 7px 8px -4px)"/>
		</div>`,
	methods: {},
}));
