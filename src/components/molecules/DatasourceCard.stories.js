import { storiesOf } from "@storybook/vue";

import DatasourceCard from "./DatasourceCard";
import ExampleImage from "@assets/img/logo/logo-webuntis.svg";

storiesOf("Molecules|DatasourceCard", module).add("default", () => ({
	components: { DatasourceCard },
	data: () => ({
		img: ExampleImage,
	}),
	template: `<div><DatasourceCard :image="img" title="Ein Title" subtitle="ich bin ein Subtitle">
	<template v-slot:actions>Datenquelle</template>
	</DatasourceCard>
	<br/>
	<DatasourceCard :image="img" title="Ein Title">
	<template v-slot:actions>Datenquelle</template>
	</DatasourceCard>
	<div>`,
}));
