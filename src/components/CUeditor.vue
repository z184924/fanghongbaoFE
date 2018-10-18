<template>
  <iframe
    :id="uuid"
    :src="`http://123.57.32.164:7002/?id=${uuid}`"
    frameborder="0"
    style="width:100%;height:400px"
  ></iframe>
</template>
<script>
import uuid from "uuid";
export default {
  props: {
    value: {}
  },
  // watch: {
  //   value: {
  //     handler(a ,b) {
  //       this.setContent();
  //     },
  //     deep: true,
  //   }
  // },
  data() {
    return {
      uuid: ""
    };
  },
  methods: {
    setContent() {
      if (!this.value) {
        this.$emit("input", "");
      }
      this.$nextTick(() => {
        setTimeout(() => {
          let ifr = document.getElementById(this.uuid);
          ifr.contentWindow.postMessage(
            {
              type: "get",
              id: this.uuid,
              text: this.value
            },
            "*"
          );
        }, 100);
      });
    }
  },
  created() {
    this.uuid = uuid.v4();
    window.ueContentCallback(res => {
      if (res.data.id === this.uuid && res.data.type === "put") {
        this.$emit("input", res.data.text);
      }
      if (res.data.type === "ready" && res.data.id === this.uuid) {
        this.setContent();
      }
    });
  }
};
</script>

