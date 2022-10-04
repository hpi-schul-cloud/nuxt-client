<template>
	<div class="col-md-6 col-lg-4 col-12">
		<div
			:class="color"
			class="v-card v-sheet v-sheet--outlined theme--light rounded-0"
		>
			<div class="v-card__text">
				<span class="text-h6">{{ color }}</span>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 base"
		>
			<div class="v-card__text white--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span
						><!---->
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 lighten-5"
		>
			<div class="v-card__text black--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>lighten-5</span>
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 lighten-4"
		>
			<div class="v-card__text black--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>lighten-4</span>
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 lighten-3"
		>
			<div class="v-card__text black--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>lighten-3</span>
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 lighten-2"
		>
			<div class="v-card__text black--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>lighten-2</span>
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 lighten-1"
		>
			<div class="v-card__text black--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>lighten-1</span>
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 darken-1"
		>
			<div class="v-card__text white--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>darken-1</span>
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 darken-2"
		>
			<div class="v-card__text white--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>darken-2</span>
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 darken-3"
		>
			<div class="v-card__text white--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>darken-3</span>
					</div>
				</div>
			</div>
		</div>
		<div
			:class="color"
			class="v-card v-card--flat v-sheet theme--light rounded-0 darken-4"
		>
			<div class="v-card__text white--text">
				<div class="row">
					<div class="text-caption col col-8">
						<span>{{ color }}&nbsp;</span><span>darken-4</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		color: {
			type: String,
			default: "",
		},
	},
};
</script>
