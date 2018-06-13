<template>
  <div class="xc4" :style="{width}">
    <div class="xc4--header" :style="{background:titleColor}">
      <div class="xc4--header-left">
        <span>{{title}}</span>
      </div>
      <div class="xc4--button-box">
        <slot name="button"></slot>
      </div>
    </div>
    <div class="xc4--body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    titleColor: {
      type: String,
      default: "rgb(39, 78, 151)",
    },
    width: {
      type: String,
      default: "auto",
    },
  }
}
</script>

