<template>
	<div data-testid="class-members-info-box">
		<v-alert v-show="hasSystem" light text type="info" class="mb-0">
			<div class="alert-text">
				{{ t("page-class-members.systemInfoText") }}
			</div>
		</v-alert>
		<h2 class="text-h4">
			Schüler:innen sind noch nicht in der Niedersächsischen Bildungscloud?
		</h2>
		<p>
			Eine Einverständniserklärung bei der Registrierung von Schüler:innen muss
			nicht eingeholt werden. Die Nutzung der Niedersächsischen Bildungscloud
			ist im niedersächsischen Schulgesetz (§ 31 Abs. 5 NSchG) geregelt.
		</p>
		<p>
			Falls die Schule die Daten der Nutzenden über ein externes System bezieht
			bzw. übermittelt bekommt, sind keine weiteren Schritte in der Cloud
			notwendig. Die Registrierung erfolgt über das externe System.
		</p>
		<p>
			Anderenfalls können über den Verwaltungsbereich der Cloud Einladungen zur
			Registrierung per Link versendet werden:
		</p>
		<ul>
			<li>
				Versand von Registrierungslinks an die hinterlegten E-Mail-Adressen
				(auch direkt beim Importieren/Anlegen möglich)
			</li>
			<li>
				Registrierungslinks als QR-Druckbogen drucken, ausschneiden und
				QR-Zettel an Schüler:innen verteilen
			</li>
			<li>
				Einen oder mehrere Nutzer:innen auswählen, z.B. alle Schüler:innen einer
				Klasse, und dann die gewünschte Aktion durchführen
			</li>
			<li>
				Alternativ möglich: Wechseln in den Bearbeiten-Modus des Nutzerprofils
				und den individuellen Registrierungslink direkt abrufen, um ihn händisch
				zu versenden
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
import { useI18n } from "@/composables/i18n.composable";
import { System, useSystemApi } from "@data-system";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	ref,
	Ref,
	watch,
} from "vue";

export default defineComponent({
	props: {
		systemId: {
			type: String,
			default: "",
		},
	},
	setup(props) {
		const { getSystem } = useSystemApi();
		const { t } = useI18n();

		const system: Ref<System | undefined> = ref();

		onMounted(async () => {
			if (props.systemId) {
				system.value = await getSystem(props.systemId);
			}
		});

		watch(
			() => props.systemId,
			async (value, oldValue) => {
				if (value && value !== oldValue) {
					system.value = await getSystem(props.systemId);
				}
			}
		);

		const hasSystem: ComputedRef<boolean> = computed(() => !!system.value);

		const systemName: ComputedRef<string> = computed(() => {
			return system.value?.displayName ?? "";
		});

		return {
			t,
			hasSystem,
			systemName,
		};
	},
});
</script>
