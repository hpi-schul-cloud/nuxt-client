import { storiesOf } from "@storybook/vue";

import ProgressModal from "@components/molecules/ProgressModal";
import { boolean, number, text } from "@storybook/addon-knobs";

storiesOf("4 Base UI Components/Modals", module).add("ProgressModal", () => ({
	components: { ProgressModal },
	data: () => ({
		active: boolean("active", true),
		percent: number("percent", 42),
		title: text("title", "Daten werden gelöscht"),
		description: text("description", "Bitte warten..."),
	}),
	template: `<progress-modal
								:active="active"
								:percent="percent"
								:title="title"
								:description="description"
							/>`,
}));
