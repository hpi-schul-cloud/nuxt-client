<template>
	<div :class="{ 'live-search': true, active: isActive }">
		<div class="search-container">
			<span class="icon">
				<i v-if="loading" class="fas fa-spinner fa-spin load-icon" />
				<i v-else class="fas fa-search search-icon" />
			</span>
			<input
				ref="searchStringInput"
				:value="value"
				:placeholder="placeholder"
				:autocomplete="autocomplete ? 'on' : 'off'"
				:aria-label="ariaLabel"
				type="text"
				class="search"
				@input="updateSearchString"
				@focus="isActive = true"
				@blur="isActive = false"
			/>
			<transition name="fade">
				<i v-show="isActive && value !== ''" class="fas fa-times clear-icon" />
			</transition>
		</div>
		<!--
    <div class="live-search-results">
      <slot data>
        <a :href="slotProps.data.href" :class="slotProps.data.class">
          <div>
            <b class="text-primary">{{slotProps.data.title}}</b><br/>
            <span class="text-muted">{{slotProps.data.description}}</span>
          </div>
        </a>
      </slot>
    </div>
    -->
	</div>
</template>

<script>
export default {
	name: "Searchbar",
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		autocomplete: {
			type: Boolean,
			default: false,
		},
		ariaLabel: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			isActive: false,
			loading: false, // toggle loading animation for livesearch
		};
	},
	methods: {
		updateSearchString(event) {
			this.$emit("input", this.$refs.searchStringInput.value);
		},
	},
};
</script>

<style lang="scss" scoped>
.live-search {
	position: relative;
	margin: 0 auto 2rem;
	width: 100%;
	max-width: 500px;

	.search-container {
		display: flex;

		align-items: center;
		border-radius: 50rem;
		background: #eee;
		padding: 0 16px;
		width: 100%;
		color: #333;
		box-sizing: border-box;

		.fa,
		input {
			padding: 16px 4px;
			font-size: 1.3rem;
		}

		input {
			flex: 1;
			outline: none;
			border: 0;
			background: transparent;
			padding: 12px;
		}

		.search-icon {
			transition: transform 0.3s ease-in-out;
		}

		.load-icon {
			display: none;
		}

		.clear-icon {
			position: absolute;
			top: 0;
			right: 8px;
			transition: opacity 0.3s ease-in-out;
			cursor: pointer;
			padding: 16px;
		}
	}
	/*
  .live-search-results {
    position: absolute;
    bottom: 0;
    transform: translateY(100%);
    visibility: hidden;
    z-index: 9999;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 8px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .258824), 0 2px 10px 0 rgba(0, 0, 0, .156863) !important;
    background: #fff;
    padding: 8px;
    width: 100%;
    max-height: 25rem;
    overflow-y: auto;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch; // sass-lint:disable-line no-vendor-prefixes

    a {
      text-decoration: none;

      &:not(:last-of-type) div {
        margin-bottom: .25em;
        border-bottom: 1px solid #999;
        padding-bottom: .25em;
      }

      &.disabled {
        filter: saturate(0);
      }
    }
  }
*/
	&.active {
		/*
    .live-search-results.active {
      visibility: visible;
    }
    */

		.search-icon {
			transform: rotate(90deg);
		}
	}
}
</style>
