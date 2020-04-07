<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.students.consent.title") }}
		</h1>
        <div>
			<step-progress :steps="progressSteps" :current-step="currentStep"/>
		</div>
	</section>
</template>

<script>
import StepProgress from "@components/organisms/StepProgress";

export default {
	components: {
        StepProgress
	},
	meta: {
		requiredPermissions: ["STUDENT_CREATE"],
	},
	data() {
		return {
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.students.index.title"),
					to: "/administration/students",
				}
			],
            roleName: "student",
            progressSteps: [
                { name: this.$t("pages.administration.students.consent.steps.confirm") },
                { name: this.$t("pages.administration.students.consent.steps.logins") },
                { name: this.$t("pages.administration.students.consent.steps.finish") }
            ],
            currentStep: 0
		};
	},
	methods: {
		error() {
			this.$toast.error(this.$t("pages.administration.students.consent.error"));
		},
		success() {
			this.$toast.success(this.$t("pages.administration.students.consent.success"));
			this.$router.push({
				path: `/administration/students`,
			});
		},
	},
};
</script>
