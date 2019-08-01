<template>
  <svg :viewBox="viewBox" aria-hidden="true">
    <use :xlink:href="'#icon-' + icon" />
  </svg>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 32,
    },
    height: {
      type: Number,
      default: 32,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`;
    },
  },
};
</script>
