<template>
	<div>
		<base-breadcrumb
			:inputs="[
				{
					to: { name: 'news' },
					text: 'News',
				},
				{
					text: 'Artikel erstellen',
				},
			]"
		/>
		<h1>Artikel erstellen</h1>
		<form-news #actions="{ create }">
			<form-actions>
				<template #primary>
					<base-button design="primary" type="submit" @click.prevent="create">
						Anlegen
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
};
</script>
