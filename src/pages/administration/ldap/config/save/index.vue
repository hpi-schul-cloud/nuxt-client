<template>
	<section class="section">
		<base-button @click="backButtonHandler">Züruck</base-button>
		<h1 class="h3">
			Folgende Datensätze stehen zur Synchronization bereit
		</h1>
		<div>
			<div>
				<span></span>
				<span>{{ systemData.users.student }}</span>
				<span>Schüler:innen</span>
			</div>
			<div>
				<span></span>
				<span>{{ systemData.users.teacher }}</span>
				<span>Lehrer:innen</span>
			</div>
			<div>
				<span></span>
				<span>{{ systemData.users.admin }}</span>
				<span>Admins</span>
			</div>
			<div>
				<span></span>
				<span>{{ systemData.classes.total }}</span>
				<span>Klassen</span>
			</div>
		</div>
		<p class="subtitle-text">
			Im Folgenden kannst du an Beispielen überprüufen, ob wir die Attribute
			richtig zugeordnet haben.
		</p>

		<p class="subtitle-text">
			Beispeil Nutzer:innen
		</p>
		<div>
			<span
				v-for="(row, index) in Object.entries(systemData.users.sample)"
				:key="index"
			>
				<div>{{ row[0] }}{{ row[0] === "roles" ? row[1][0] : row[1] }}</div>
			</span>
		</div>

		<p class="subtitle-text">
			Beispiel Klasse
		</p>
		<div>
			<span
				v-for="(row, index) in Object.entries(systemData.classes.sample)"
				:key="index"
			>
				<div>{{ row[0] }}{{ row[1] }}</div>
			</span>
		</div>
		<div>
			<base-button @click="backButtonHandler">Züruck</base-button>
			<base-button>Synchronization aktivieren</base-button>
		</div>
	</section>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import { mapState } from "vuex";

export default {
	components: { BaseButton },
	meta: {
		requiredPermissions: ["ADMIN_VIEW", "SCHOOL_EDIT"],
	},
	computed: {
		...mapState("ldap-config", {
			systemData: "systemVerificationData",
		}),
	},
	created() {
		if (!this.systemData) {
			this.$router.push("/administration/ldap/config");
		}
	},
	methods: {
		backButtonHandler() {
			this.$router.push("/administration/ldap/config");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.subtitle-text {
	margin: var(--space-xl) 0;
}
.section {
	margin: var(--space-xl-2);
}
</style>
