<template>
  <iframe :id="uuid" :src="`http://192.168.0.201:8082/?id=${uuid}`" frameborder="0" style="width:100%;height:400px"></iframe>
</template>
<script>
import uuid from "uuid"
export default {
  props: {
    value: {}
  },
  watch: {
    value: {
      handler() {
        this.setContent();
      },
      deep: true,
    }
  },
  data() {
    return {
      uuid: "",
    }
  },
  methods: {
    setContent() {
      if (!this.value) {
        this.$emit("input", "");
      }
      setTimeout(() => {
        let ifr = document.getElementById(this.uuid);
        ifr.contentWindow.postMessage({
          type: "get",
          id: this.uuid,
          text: this.value
        }, "*");
      }, 100)

    }
  },
  created() {
    this.uuid = uuid.v4();
    window.ueContentCallback(res => {
      if (res.data.id === this.uuid && res.data.type === "put") {
        this.$emit("input", res.data.text);
      }
      if (res.data.type === "ready") {
        this.setContent();
      }
    })


  }
}
</script>

