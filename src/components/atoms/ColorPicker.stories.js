import { storiesOf } from "@storybook/vue";

import notes from "@docs/storybook/ColorPicker.md";
import ColorPicker from "@components/atoms/ColorPicker";

storiesOf("Atoms/ColorPicker", module)
	.addParameters({
		notes,
	})
	.add("Color Picker Default", () => ({
		components: { ColorPicker },
		template: `<ColorPicker v-model="color"/>`,
		methods: {},
		data: () => ({
			color: "",
		}),
	}))
	.add("Color Picker Circles Inline", () => ({
		components: { ColorPicker },
		template: `<ColorPicker v-model="color" :colors="colors" shapes="circles" inline />`,
		methods: {},
		data: () => ({
			color: "#00E5FF",
			colors: [
				"#ACACAC",
				"#D4AF37",
				"#00E5FF",
				"#1DE9B6",
				"#546E7A",
				"#FFC400",
				"#BCAAA4",
				"#FF4081",
				"#FFEE58",
			],
		}),
	}))
	.add("Color Picker Circles Popover", () => ({
		components: { ColorPicker },
		template: `<ColorPicker v-model="color" :colors="colors" row-length="3" shapes="circles" show-border popover-to="right"/>`,
		methods: {},
		data: () => ({
			color: "#00E5FF",
			colors: [
				"#ACACAC",
				"#D4AF37",
				"#00E5FF",
				"#1DE9B6",
				"#546E7A",
				"#FFC400",
				"#BCAAA4",
				"#FF4081",
				"#FFEE58",
			],
		}),
	}));
