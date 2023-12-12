<template>
	<div class="text-center">
		<v-menu offset-y max-height="120px" min-width="150px" nudge-left="75px">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					data-testid="speed-menu-play-speed"
					v-bind="attrs"
					v-on="on"
					icon
					small
					color="white"
					:aria-label="
						$t('component.cardElement.fileElement.audioPlayer.speed')
					"
				>
					<v-icon>
						{{ mdiPlaySpeed }}
					</v-icon>
				</v-btn>
			</template>

			<v-list dense>
				<v-list-item-group>
					<v-list-item @click="onSelect(0.25)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>0.25 </v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="0.25 === rate">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(0.5)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>0.5 </v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="0.5 === rate">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(0.75)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>0.75 </v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="0.75 === rate">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(1)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>{{
								$t("component.cardElement.fileElement.audioPlayer.speed.normal")
							}}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="1 === rate">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(1.25)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>1.25</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="1.25 === rate">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(1.5)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>1.5</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="1.5 === rate">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(1.75)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>1.75</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="1.75 === rate">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(2)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>2</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="2 === rate">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { mdiCheck, mdiPlaySpeed } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
	name: "SpeedMenu",
	emits: ["updateRate"],
	props: {
		rate: { type: Number, required: true },
	},
	setup(props, { emit }) {
		const onSelect = (rate: number) => {
			emit("updateRate", rate);
		};

		return {
			mdiPlaySpeed,
			mdiCheck,
			onSelect,
		};
	},
});
</script>
