import { storiesOf } from "@storybook/vue";
//import notes from "@docs/storybook/Color.md";
import Color from "@components/Color";

storiesOf("Colors", module)
	.addParameters({
		notes,
	})
	.add("Color", () => ({
		components: { Color },
		template: `<div>
		<Color color="#E98404"/>
		<Color color="#ffa"/>
		<Color color="#ffa"/>
		<Color color="#ffa"/>
		<Color color="#ffa"/>
		<Color color="#ffa"/>
	</div>
	`,
		methods: {},
	}));
