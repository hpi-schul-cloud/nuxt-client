import { storiesOf } from "@storybook/vue";
import Color from "@components/Color";

storiesOf("Colors", module)
	.add("Color", () => ({
		components: { Color },
		template: `<div>
		<h3>Main Colors</h3>

		<Color color="#e98404" class="color-primary-main"/> 
		<Color color="#ec962a" class="color-primary-light"/>
		<Color color="#af6303" class="color-primary-dark"/>
		<Color color="#b1063a" class="color-secondary-main"/>
		<Color color="#bd2b58" class="color-secondary-light"/>
		<Color color="#85052c" class="color-secondary-dark"/>
		<Color gradient1="#f6a800" gradient2="#b1063a"class="secondary-fancy"/>
		<Color color="#455b6a" class="#color-tertiary-main"/>
		<Color color="#617480" class="#color-tertiary-light"/>
		<Color color="#344450" class="#color-tertiary-dark"/>

		<h3>Shades</h3>
		<Color color="#000000"class="color-black"/>
		<Color color="#aaaaaa"class="color-gray-main"/>
		<Color color="#eeeeee"class="color-gray-light"/>
		<Color color="#444444"class="color-gray-dark"/>
		<Color color="#ffffff" class="color-white"/>
		
		<h3>Feedback</h3>
		<Color color="#13ba98"class="color-sucess"/>
		<Color color="#ffd611" class="color-warning"/>
		<Color color="#ff1134" class="color-danger"/>
		<Color color="#36bdfb" class="color-info"/>	
	</div>
	`,

		methods: {},
	}))
	.add("CourseColors", () => ({
		components: { Color },
		template: `<div>
		<h3>Course Colors</h3>
		<Color gradient1="#f22a19" gradient2="#f96464" title="Deutsch"/>
		<Color gradient1="#049EDA" gradient2="#02dafd" title="Mathe"/>
		<Color gradient1="#029b95" gradient2="#03b2d6" title="Biologie, Chemie, Physik"/>
		<Color gradient1="#0d2a36" gradient2="#147a98" title="Informatik, Technik"/>
		<Color gradient1="#ffc400" gradient2="#ff7400" title="Fremdsprachen"/>
		<Color gradient1="#75270d" gradient2="#b6916a" title="Ehrziehungs- und Gesellschaftswissenschaften, Erdkunde, Politik, Wirtschaft, Sozialwissenschaften"/>
		<Color gradient1="#3b1e65" gradient2="#e42c85" title="Bildende Kunst, Musik"/>
		<Color gradient1="#2c3e50" gradient2="#fd746c" title="Philisophie, Ethik"/>
		<Color gradient1="#f4d03f" gradient2="#16a085" title="Sport"/>
		<Color gradient1="#0d2a36" gradient2="#a6a6a6" title="Sonstiges"/>
 	</div>`,
		methods: {},
	}))
	.add("States", () => ({
		components: { Color },
		template: `<div>
		<h3>States</h3>
		<Color color="#00000" state="enabled" title="enabled"/> 
		<Color color="#d9d9d9" state="disabled" title="disabled"/>
		<Color color="#9d9d9d" state="disabled-dark" title="disabled-dark"/>
		<Color color="#d9d9d9" state="hover" title="hover"/>
		<Color color="#d9d9d9" state="focused" title="focused"/>
		<Color color="#b2b2b2" state="pressed" title="pressed"/>
		<Color borderColor="#9e9e9e" borderThickness="2"  state="disabled-dark" title="disabled-dark"/>
		<Color borderColor="#d9d9d9" borderThickness="3"  state="hover" title="hover"/>
		<Color borderColor="#d9d9d9" borderThickness="3" state="focused" title="focused"/>
		<Color borderColor="#b2b2b2" borderThickness="3" state="pressed" title="pressed"/>
</div>`,
		methods: {},
	}))
	.add("Elevation", () => ({
		components: { Color },
		template: `<div>
		<h3>States</h3>
		<Color state="pressed" shadow="3"/>
		<Color state="pressed" shadow="5"/>
		<Color state="pressed" shadow="7"/>
		<Color state="pressed" shadow="9"/>
		<Color state="pressed" shadow="11"/>
		<Color state="pressed" shadow="13"/>
		<Color state="pressed" shadow="15"/>
		<Color state="pressed" shadow="22"/>
	</div>`,
		methods: {},
	}));
