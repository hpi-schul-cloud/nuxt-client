import { storiesOf } from "@storybook/vue";

import ResponsiveIconButton from "./ResponsiveIconButton";

storiesOf("5 Molecules/ResponsiveButton", module)
	.addParameters({
		notes: "Resize the frame to see changes.",
	})
	.add("default", () => ({
		components: { ResponsiveIconButton },

		template: `
		<responsive-icon-button
			design="primary text"
			source="material"
			icon="add"
			responsivedesign="primary text icon"
		>
			My Responsive Button
		</responsive-button>`,
	}));
