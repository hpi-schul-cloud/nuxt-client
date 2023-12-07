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
					:aria-label="$t('media.player.action.speed')"
				>
					<v-icon>
						{{ mdiPlaySpeed }}
					</v-icon>
				</v-btn>
			</template>

			<v-list dense flat>
				<v-list-item-group>
					<v-list-item @click="onSelect(0.25)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>0.25 </v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="0.25 === selectedItem">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(0.5)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>0.5 </v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="0.5 === selectedItem">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(0.75)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>0.75 </v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="0.75 === selectedItem">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(1)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>{{
								$t("media.player.action.speed.normal")
							}}</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="1 === selectedItem">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(1.25)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>1.25</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="1.25 === selectedItem">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(1.5)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>1.5</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="1.5 === selectedItem">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(1.75)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>1.75</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="1.75 === selectedItem">
							<v-icon>{{ mdiCheck }}</v-icon>
						</v-list-item-icon>
					</v-list-item>
					<v-list-item @click="onSelect(2)">
						<v-list-item-content class="ml-3">
							<v-list-item-title>2</v-list-item-title>
						</v-list-item-content>
						<v-list-item-icon v-if="7 === selectedItem">
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
import { defineComponent, ref } from "vue";

export default defineComponent({
	name: "SpeedMenu",
	emits: ["rate"],
	setup(props, { emit }) {
		const selectedItem = ref(1);

		const onSelect = (rate: number) => {
			emit("rate", rate);
			selectedItem.value = rate;
		};

		return {
			mdiPlaySpeed,
			mdiCheck,
			onSelect,
			selectedItem,
		};
	},
});
</script>
