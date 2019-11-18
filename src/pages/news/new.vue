<template>
	<div>
		<base-breadcrumb
			:inputs="[
				{
					to: { name: 'news' },
					text: 'News',
				},
				{
					text: $t('pages.news.new.title'),
				},
			]"
		/>
		<h1>{{ $t("pages.news.new.title") }} </h1>
		<form-news #actions="{ cancel }" action="create">
			<form-actions>
				<template #primary>
					<base-button design="primary" type="submit">
						{{ $t("pages.news.new.create") }}
					</base-button>
					<base-button design="text" @click.prevent="cancel">
						{{ $t("common.actions.cancel") }}
					</base-button>
				</template>
			</form-actions>
		</form-news>
	</div>
</template>

<script>
import FormNews from "@components/organisms/FormNews";
import FormActions from "@components/molecules/FormActions";

export default {
	components: {
		FormNews,
		FormActions,
	},
	head() {
		return {
			title: "News erstellen",
		};
	},
	meta: {
		requiredPermissions: ["NEWS_CREATE"],
	},
	head() {
		return {
			title: "News erstellen",
		};
	},
};
</script>
