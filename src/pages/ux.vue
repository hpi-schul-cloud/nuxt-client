<template>
	<default-wireframe :headline="$t('Board-Karte-Elemente')" :full-width="true">
		<template>
			<div>
				<v-card
					class="mx-auto ma-6"
					color="grey lighten-3"
					max-width="312"
					elevation="0"
					outlined
				>
					<!-- Das `@click` Event öffnet den Dialog mit dem vergrößerten Bild -->
					<v-img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFw3rV31_OwEu8gQF0czauXCdgr4RSCKwpgXGyJE9jlxmG6as1611TIU2NhHsEmVtueMQ&usqp=CAU"
						@click="dialog = true"
						class="image-hover-effect"
					></v-img>
					<v-card-text class="text--primary">
						<div>
							Supernase Hund! Darum können Hunde so exzellent riechen...
						</div>
					</v-card-text>
				</v-card>

				<!-- Der Dialog, der das vergrößerte Bild zeigt -->
				<v-dialog v-model="dialog" max-width="80%">
					<v-img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFw3rV31_OwEu8gQF0czauXCdgr4RSCKwpgXGyJE9jlxmG6as1611TIU2NhHsEmVtueMQ&usqp=CAU"
					></v-img>
				</v-dialog>
			</div>
			<div>
				<v-card
					class="mx-auto ma-6"
					color="grey lighten-3"
					max-width="312"
					elevation="0"
					outlined
				>
					<v-img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFw3rV31_OwEu8gQF0czauXCdgr4RSCKwpgXGyJE9jlxmG6as1611TIU2NhHsEmVtueMQ&usqp=CAU"
					></v-img>
					<v-card-text class="text--primary">
						<div>
							Supernase Hund! Darum können Hunde so exzellent riechen...
						</div>
					</v-card-text>
				</v-card>
			</div>
			<div>
				<v-card
					class="mx-auto ma-6"
					color="grey lighten-3"
					max-width="312"
					elevation="0"
					outlined
				>
					<!-- <v-img
						src="https://www.robertfreund.de/blog/wp-content/uploads/2022/11/tldraw-00.jpg"
						height="200px"
					></v-img> -->
					<v-card-subtitle class="pb-1 text--primary font-weight-bold">
						<v-icon color="black" class="mr-0" small left>
							{{ mdiFileOutline }}
						</v-icon>
						Dateiname
					</v-card-subtitle>
					<!-- <v-card-text class="text--primary">
						<div>Whitehaven Beach</div>
					</v-card-text> -->
					<div>
						<v-card-text class="white">
							<v-chip small outlined>
								<v-icon small left> {{ mdiFilePdfBox }} </v-icon>
								Name_einer_Datei.pdf | 4MB
							</v-chip></v-card-text
						>
					</div>
				</v-card>
			</div>
			<div>
				<v-card
					class="mx-auto ma-6"
					color="grey lighten-3"
					max-width="312"
					elevation="0"
					outlined
				>
					<v-img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFw3rV31_OwEu8gQF0czauXCdgr4RSCKwpgXGyJE9jlxmG6as1611TIU2NhHsEmVtueMQ&usqp=CAU"
					></v-img>
					<!-- <v-card-subtitle class="pb-1 text--primary font-weight-bold">
						<v-icon color="black" class="mr-0" small left>
							{{ mdiFileOutline }}
						</v-icon>
						Titel
					</v-card-subtitle> -->
					<v-card-text class="text--primary">
						<div>
							Supernase Hund! Darum können Hunde so exzellent riechen...
						</div>
					</v-card-text>
					<v-card-text class="white">
						<v-chip small outlined label>
							<v-icon small left> {{ mdiFilePdfBox }} </v-icon>
							Name_einer_Datei.jpg | 4MB
						</v-chip></v-card-text
					>
				</v-card>
			</div>
			<div>
				<v-card
					class="mx-auto ma-6"
					color="grey lighten-3"
					max-width="312"
					elevation="0"
					outlined
				>
					<v-img
						src="https://cdn.prod.www.spiegel.de/images/9b089eaf-ae42-47b0-ae80-2f60d9d39b5b_w948_r1.778_fpx46_fpy35.jpg"
					></v-img>
					<!-- <v-card-subtitle class="pb-1 text--primary font-weight-bold">
						<v-icon color="black" class="mr-0" small left>
							{{ mdiFileOutline }}
						</v-icon>
						Titel
					</v-card-subtitle> -->
					<!-- <v-card-text class="text--primary">
						<div>
							Supernase Hund! Darum können Hunde so exzellent riechen...
						</div>
					</v-card-text> -->
					<v-card-text class="white">
						<v-chip small outlined>
							<v-icon small left> {{ mdiFilePdfBox }} </v-icon>
							Name_einer_Datei.jpg | 4MB
						</v-chip></v-card-text
					>
				</v-card>
			</div>
			<div>
				<v-card
					class="mx-auto ma-6"
					color="grey lighten-3"
					max-width="312"
					elevation="0"
					outlined
				>
					<!-- <v-img
						src="https://www.robertfreund.de/blog/wp-content/uploads/2022/11/tldraw-00.jpg"
						height="200px"
					></v-img> -->
					<v-card-subtitle class="pb-1 text--primary font-weight-bold">
						<v-icon color="black" class="mr-0" small left>
							{{ mdiFileOutline }}
						</v-icon>
						Dateiname
					</v-card-subtitle>
					<!-- <v-card-text class="text--primary">
						<div>Whitehaven Beach</div>
					</v-card-text> -->
					<div>
						<v-card-text class="white">
							<v-chip small outlined>
								<v-icon small left> {{ mdiFilePdfBox }} </v-icon>
								Name_einer_Datei.pdf
							</v-chip></v-card-text
						>
					</div>
				</v-card>
			</div>
			<div>
				<v-card
					class="mx-auto ma-6"
					color="grey lighten-3"
					max-width="312"
					elevation="0"
					outlined
				>
					<v-img
						src="https://www.robertfreund.de/blog/wp-content/uploads/2022/11/tldraw-00.jpg"
						height="200px"
					>
					</v-img>
					<v-card-subtitle class="pb-1 text--primary font-weight-bold">
						<v-icon color="black" class="mr-0" small left>
							{{ mdiPresentation }}
						</v-icon>
						Whiteboard
					</v-card-subtitle>
					<v-card-text class="text--primary">
						<div>Bearbeitet vor 1h</div>
					</v-card-text>
					<!-- <v-card-text class="white">
						<v-chip small outlined>
							<v-icon small left> {{ mdiFilePdfBox }} </v-icon>
							Name_einer_Datei.pdf
						</v-chip>
					</v-card-text> -->
				</v-card>
			</div>
		</template>
	</default-wireframe>
</template>

<script>
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { mdiFilePdfBox } from "@mdi/js";
import { mdiPresentation } from "@mdi/js";
import { mdiFileOutline } from "@mdi/js";

export default {
	components: {
		DefaultWireframe,
	},
	data() {
		return {
			mdiPresentation: mdiPresentation,
			mdiFilePdfBox: mdiFilePdfBox,
			mdiFileOutline: mdiFileOutline,
			dialog: false,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/styles.sass";

.image-hover-effect {
	transition: filter 0.3s;
	cursor: pointer;
}

.image-hover-effect:hover {
	filter: brightness(0.7);
}
</style>
