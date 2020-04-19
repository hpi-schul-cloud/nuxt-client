import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import BaseGrid from "@components/base/BaseGrid";

storiesOf("2 Layouts/BaseGrid", module)
	.add("Default Grid", () => ({
		components: { BaseGrid },
		template: `
		<BaseGrid>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
		</BaseGrid>`,
	}))
	.add("Custom Column Width", () => ({
		components: { BaseGrid },
		template: `
		<BaseGrid :column-width=columnWidth>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
			<div style="background-color: lightseagreen; height: 150px;"/>
		</BaseGrid>`,
		data: () => ({
			columnWidth: text("columnWidth", "8rem"),
		}),
	}));
