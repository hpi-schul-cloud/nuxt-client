<template>
  <Card @click="open()">
    <div 
      slot="header" 
      class="card-image">
      <card-header-image>
        <img
          :src="data.thumbnail"
          :alt="'Thumbnail for ~' + data.title + '~'">
      </card-header-image>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ data.title }}</p>
          <p class="subtitle is-6">
            <span
              v-for="(tag, index) of data.tags"
              :key="index"
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
      </div>
    </div>
    <card-footer 
      slot="footer" 
      class="content-card-footer">
      <div class="footer-info">
        <p>
          Anbieter: {{ data.providerName }}
        </p>
        <p>
          Lizenz: <span 
            v-for="(license, index) in data.licenses"
            :key = "index"
            v-html="license" />
        </p>
      </div>
      <card-footer-actions class="footer-actions">
        <button class="button">Melden</button>
        <button class="button is-primary">Ansehen</button>
      </card-footer-actions>
    </card-footer>
  </Card>
</template>

<script>
import CardHeaderImage from '~/components/card/card-header-image.vue'
import CardFooter from '~/components/card/card-footer.vue'
import CardFooterActions from '~/components/card/card-footer-actions.vue'
import Card from '~/components/card/card.vue'

export default {
  name: 'ContentCard',
  components: {
    Card,
    CardHeaderImage,
    CardFooter,
    CardFooterActions
  },
  props: {
    data: {
      type: Object,
      default: function() {}
    }
  },
  methods: {
    open() {
      const win = window.open(this.data.url, '_blank')
      win.focus()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tag {
  margin-right: 4px;
}
.footer-info {
  flex: 1;
  p {
    margin: 0;
  }
}
.footer-actions .button {
  margin: 0 4px;
  &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  }
}
</style>
