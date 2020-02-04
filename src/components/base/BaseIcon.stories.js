import { storiesOf } from "@storybook/vue";
import { text, select, color } from "@storybook/addon-knobs";

import BaseIcon from "@basecomponents/BaseIcon";

storiesOf("3 Base UI Components/Base UI", module).add("Base Icon", () => ({
	components: { BaseIcon },
	data: () => ({
		icon: text("icon", "home"),
		source: select(
			"source",
			{ material: "material", fa: "fa", custom: "custom" },
			"material"
		),
		size: text("size", "1em"),
		color: color("color", "#f8a41b"),
	}),
	template: `<div>
			<p>
				Icon usage is simple: <base-icon :source="source" :icon="icon" :style="{'font-size': size, fill: color}"/>
			</p>
			<p>
				You can als use icons from fontawesome: <base-icon source="fa" icon="solid/address-book" :style="{'font-size': size}"/>
			</p>
			<p>
				The Color can be also be set using fill:
				<base-icon source="material" icon="add" :fill="color"/>
			</p>
			<p>
				Scaling works, by setting the font-size attribute:
				<base-icon source="custom" icon="tasks" style="font-size: 2em" />
			</p>
		</div>`,
}));
