<template>
  <div>
    <div id="preview" class="row j-mb-xs" v-if="images.length !== 0">
      <div class="j-pt-sm j-pl-sm j-pb-xs" v-if="type === 'edit'">
        <b>Attached Files</b>
      </div>
      <div
        v-for="(image, id) in images"
        :key="id"
        @mouseover="image.hover = true"
        @mouseleave="image.hover = false"
        class="relative col j-pb-md"
      >
        <img :src="image.url" class="responsive-img img-100 image">
        <div class="hover-image img-100" v-if="image.hover && type === 'edit'">
          <div class="btn-floating grey lighten-2" @click="$emit('removeImage', image.url)">
            <i class="material-icons">delete</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const props = {
  images: {
    type: Array
  },
  type: {
    type: String
  }
};

export default {
  props,
  name: "load-images"
};
</script>

<style scope>
</style>
