<template>
  <div
    class="card"
    @click="open()"
  >
    <div class="card-image">
      <figure class="image is-4by3">
        <img
          :src="data.thumbnail"
          :alt="'Thumbnail for ~' + data.title + '~'">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ data.title }}</p>
          <p class="subtitle is-6">
            <span
              v-for="tag of data.tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </p>
        </div>
      </div>

      <div class="content">
        <p>
          {{ data.description }}
        </p>
        <p>
          Anbieter: {{data.providerName}} <br/>
          Lizenz: <br/>
          <ul>
            <li
              v-for="(license, index) in data.licenses"
              :key = index
              v-html="license"
            ></li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ContentCard',
  props: {
    data: {
      type: Object,
      default: function() {}
    }
  },
  methods: {
    open () {
      const win = window.open(this.data.url, '_blank');
      win.focus();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .tag{
    margin-right: 4px;
  }
</style>
