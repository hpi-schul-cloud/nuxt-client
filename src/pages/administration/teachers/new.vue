<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.teachers.new.title") }}
		</h1>
		<form-create-user :role-name="roleName" @success="success" @error="error">
			<template v-slot:inputs="{ userData }">
				<base-input
					v-model="userData.birthday"
					type="date"
					:label="$t('common.labels.birthdate')"
					:placeholder="$t('common.placeholder.birthdate')"
					class="mt--md"
				>
				</base-input>
				<base-input
					v-model="userData.sendRegistration"
					type="checkbox"
					name="switch"
					class="mt--xl"
					:label="$t('pages.administration.teachers.new.checkbox.label')"
				/>
			</template>
		</form-create-user>
	</section>
</template>

<script>
import FormCreateUser from "@components/organisms/FormCreateUser";

export default {
	components: {
		FormCreateUser,
	},
	data() {
		return {
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "fas fa-cog" },
				},
				{
					text: this.$t("pages.administration.teachers.index.title"),
					to: "/administration/teachers",
				},
				{
					text: this.$t("pages.administration.teachers.new.title"),
				},
			],
			roleName: "teacher",
		};
	},
	methods: {
		error() {
			this.$toast.error(this.$t("pages.administration.teachers.new.denied"));
		},
		success() {
			this.$toast.success(this.$t("pages.administration.teachers.new.success"));
			this.$router.push({
				path: `/administration/teachers`,
			});
		},
	},
};
</script>
