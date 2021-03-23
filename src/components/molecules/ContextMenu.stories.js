import { storiesOf } from "@storybook/vue";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import ContextMenu from "./ContextMenu";

const actionsWithIcon = [
	{
		event: "copy",
		text: "copy",
		icon: "file_copy",
		arguments: "some argument",
	},
	{
		event: "share",
		text: "share",
		icon: "share",
		arguments: "some argument",
	},
	{
		icon: "report",
		event: "report",
		text: "report",
		arguments: "some argument",
	},
];

const eventHandler = {
	copy: action("copy"),
	share: action("share"),
	report: action("report"),
};

const actionsWithoutIcon = actionsWithIcon.map((o) => {
	return { ...o, icon: undefined };
});

const template = `
	<span style="position: relative;">
		<base-button design="text icon" @click="active = true">
			<base-icon
				class="footer__content-icon"
				source="material"
				icon="more_vert"
			/>
		</base-button>
		<ContextMenu
			:show.sync="active"
			:anchor="anchor"
			:actions="actions"
			@copy="copy"
			@share="share"
			@report="report"
		/>
	</span>`;

const anchorOptions = {
	"top-left": "top-left",
	"bottom-left": "bottom-left",
	"top-right": "top-right",
	"bottom-right": "bottom-right",
	"top-right-bottom-placed": "top-right-bottom-placed",
};

storiesOf("5 Molecules/ContextMenu", module)
	.addParameters({ layout: "centered" })
	.add("with icons", () => ({
		components: { ContextMenu },
		template,
		data: () => ({
			action,
			active: true,
			anchor: select("anchor", anchorOptions, "top-left"),
			actions: actionsWithIcon,
		}),
		methods: eventHandler,
	}))
	.add("without icons", () => ({
		components: { ContextMenu },
		template,
		data: () => ({
			action,
			active: true,
			anchor: select("anchor", anchorOptions, "top-left"),
			actions: actionsWithoutIcon,
		}),
		methods: eventHandler,
	}));
