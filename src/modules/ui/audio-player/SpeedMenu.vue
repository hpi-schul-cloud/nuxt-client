<template>
	<v-menu max-height="120px" min-width="150px" location="bottom center">
		<template #activator="{ props }">
			<v-btn
				data-testid="speed-menu-play-speed"
				v-bind="props"
				color="transparent"
				density="comfortable"
				icon
				variant="flat"
				:aria-label="$t('components.audioPlayer.speed')"
			>
				<v-icon>{{ mdiPlaySpeed }}</v-icon>
			</v-btn>
		</template>

		<v-list>
			<v-list-item @click="onSelect(0.25)">
				<div class="ml-3">
					<v-list-item-title>0.25 </v-list-item-title>
				</div>
				<template v-if="0.25 === rate" #append>
					<v-icon>{{ mdiCheck }}</v-icon>
				</template>
			</v-list-item>
			<v-list-item @click="onSelect(0.5)">
				<div class="ml-3">
					<v-list-item-title>0.5 </v-list-item-title>
				</div>
				<template v-if="0.5 === rate" #append>
					<v-icon>{{ mdiCheck }}</v-icon>
				</template>
			</v-list-item>
			<v-list-item @click="onSelect(0.75)">
				<div class="ml-3">
					<v-list-item-title>0.75 </v-list-item-title>
				</div>
				<template v-if="0.75 === rate" #append>
					<v-icon>{{ mdiCheck }}</v-icon>
				</template>
			</v-list-item>
			<v-list-item @click="onSelect(1)">
				<div class="ml-3">
					<v-list-item-title>{{ $t("components.audioPlayer.speed.normal") }}</v-list-item-title>
				</div>
				<template v-if="1 === rate" #append>
					<v-icon>{{ mdiCheck }}</v-icon>
				</template>
			</v-list-item>
			<v-list-item @click="onSelect(1.25)">
				<div class="ml-3">
					<v-list-item-title>1.25</v-list-item-title>
				</div>
				<template v-if="1.25 === rate" #append>
					<v-icon>{{ mdiCheck }}</v-icon>
				</template>
			</v-list-item>
			<v-list-item @click="onSelect(1.5)">
				<div class="ml-3">
					<v-list-item-title>1.5</v-list-item-title>
				</div>
				<template v-if="1.5 === rate" #append>
					<v-icon>{{ mdiCheck }}</v-icon>
				</template>
			</v-list-item>
			<v-list-item @click="onSelect(1.75)">
				<div class="ml-3">
					<v-list-item-title>1.75</v-list-item-title>
				</div>
				<template v-if="1.75 === rate" #append>
					<v-icon>{{ mdiCheck }}</v-icon>
				</template>
			</v-list-item>
			<v-list-item @click="onSelect(2)">
				<div class="ml-3">
					<v-list-item-title>2</v-list-item-title>
				</div>
				<template v-if="2 === rate" #append>
					<v-icon>{{ mdiCheck }}</v-icon>
				</template>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { mdiCheck, mdiPlaySpeed } from "@icons/material";
import { defineComponent } from "vue";

export default defineComponent({
	name: "SpeedMenu",
	props: {
		rate: { type: Number, required: true },
	},
	emits: ["updateRate"],
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
