<template>
  <div class="xc4" :style="{width}">
    <div class="xc4__header" :style="{background:titleColor}">
      <div class="xc4__header-left">
        <span>{{title}}</span>
      </div>
      <div class="xc4__button-box">
        <slot name="button"></slot>
      </div>
    </div>
    <div class="xc4__body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    titleColor: {
      type: String,
      default: "rgb(199, 73, 54)"
    },
    width: {
      type: String,
      default: "auto"
    }
  }
};
</script>

