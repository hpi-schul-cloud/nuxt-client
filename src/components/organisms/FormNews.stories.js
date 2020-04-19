import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import FormNews from "./FormNews";
import FormActions from "@components/molecules/FormActions";

storiesOf("6 Organisms/FormNews", module)
	.add("/new", () => ({
		components: { FormNews, FormActions },
		template: `
	<form-news #actions="{ create, cancel }" action="create" @update:news="onNewsChange">
		<form-actions>
			<template #primary>
				<base-button design="primary" type="submit">
					Create
				</base-button>
				<base-button design="text" @click.prevent="cancel">
					{{ $t("common.actions.cancel") }}
				</base-button>
			</template>
		</form-actions>
	</form-news>`,
		methods: {
			onNewsChange: action("@update:news"),
		},
	}))
	.add("/edit", () => ({
		components: { FormNews, FormActions },
		template: `
	<form-news #actions="{ remove, cancel }" action="patch" @update:news="onNewsChange">
	<form-actions>
	<template v-slot:secondary>
		<base-button
			design="danger text"
			type="button"
			@click.prevent="remove"
		>
			{{ $t("common.actions.remove") }}
		</base-button>
	</template>
	<template v-slot:primary>
		<base-button design="primary" type="submit">
			{{ $t("common.actions.save") }}
		</base-button>
		<base-button design="text" @click.prevent="cancel">
			{{ $t("common.actions.cancel") }}
		</base-button>
	</template>
</form-actions>
	</form-news>`,
		methods: {
			onNewsChange: action("@update:news"),
		},
	}));
