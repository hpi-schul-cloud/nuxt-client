<template>
	<section class="section">
		<base-button @click="backButtonHandler">Züruck</base-button>
		<h1 class="h3">Folgende Datensätze stehen zur Synchronization bereit</h1>
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

		<p class="subtitle-text">Beispeil Nutzer:innen</p>
		<div>
			<span
				v-for="(row, index) in Object.entries(systemData.users.sample)"
				:key="index"
			>
				<div>{{ row[0] }}{{ row[0] === "roles" ? row[1][0] : row[1] }}</div>
			</span>
		</div>

		<p class="subtitle-text">Beispiel Klasse</p>
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
			<base-button @click="submitButtonHandler"
				>Synchronization aktivieren</base-button
			>
		</div>
		<base-modal :active.sync="submitted.ok" :background-click-disabled="true">
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info
					title="Deine Konfiguration ist gespeichert Die Synchronisation kann bis zu einigen Stunden andauern."
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="check_circle"
							style="color: var(--color-success)"
						/>
					</template>
				</modal-body-info>
			</template>
			<template v-slot:footer>
				<modal-footer-confirm
					backgroundcolor="var(--color-success)"
					text="Ok"
					@click="okButtonHandler"
				/>
			</template>
		</base-modal>
	</section>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";
import { mapState } from "vuex";

export default {
	components: { BaseButton, ModalBodyInfo, ModalFooterConfirm },
	meta: {
		requiredPermissions: ["ADMIN_VIEW", "SCHOOL_EDIT"],
	},
	computed: {
		...mapState("ldap-config", {
			systemData: "systemVerificationData",
			tempData: "temp",
			submitted: "dataSubmission",
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
		submitButtonHandler() {
			this.$store.dispatch("ldap-config/submitData", this.tempData);
		},
		okButtonHandler() {
			this.$router.push({
				path: `/administration/school`,
			});
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
