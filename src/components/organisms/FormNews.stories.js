import { storiesOf } from "@storybook/vue";
import { action } from "@storybook/addon-actions";

import FormNews from "./FormNews";
import FormActions from "@components/molecules/FormActions";
import NewsDetailView from "@components/organisms/NewsDetailView";
import NewsEditView from "@components/organisms/NewsEditView";

storiesOf("6 Organisms/News", module)
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
		components: { NewsEditView },
		data: () => ({
			current: {
				id: "some_id",
				title: "test news",
				content:
					"<div><h1>this is my news content</h1><p>News content</p></div>",
				creator: {
					firstName: "Test",
					lastName: "User",
				},
				displayAt: "2021-03-02",
			},
		}),

		template: `<news-edit-view :current="current"/>`,
	}))
	.add("/details", () => ({
		components: { NewsDetailView },
		data: () => ({
			current: {
				id: "some_id",
				title: "test news",
				content:
					"<div><h1>this is my news content</h1><p>News content</p></div>",
				creator: {
					firstName: "Test",
					lastName: "User",
				},
				displayAt: "2021-03-02",
			},
		}),

		template: `<news-detail-view :current="current"/>`,
	}));
