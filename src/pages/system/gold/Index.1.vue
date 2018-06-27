<template>
  <div>
    <div class="xc12">
      <div class="xc12--item xc-shadow" v-for="(o,i) in list" :key="i" @click="edit(o)">
        <div class="xc12--title">{{o.action}}</div>
        <div class="xc12--gold">
          <i class="ii i-money2 xc12--goldicon"></i>
          <span>{{o.value ? o.value : 0}}</span>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="isShowEdit" :title="dialogTitle" v-drag width="300px">
      <el-input v-model="editGold" placeholder="金币数量"></el-input>
      <el-button slot="footer" type="primary" @click="save">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      isShowEdit: false,
      editGold: 0,
      dialogTitle: "修改",
    }
  },
  methods: {
    edit(o) {
      this.editGold = o.value;
      this.dialogTitle = `修改金币【${o.action}】`
      this.isShowEdit = true;
    },
    save() {

    },
  },
  created() {
    this.xpost("goldRule/getGridListJson", {
      page: 1,
      rows: 100
    }).then(res => {
      this.list = res.rows;
      this.list = this.list.map(o => {
        o.isEdit = false;
        return o;
      })
    })
  }
}
</script>

