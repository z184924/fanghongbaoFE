<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="projectCarouselPicture/getListJson" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag title="修改" width="600px">
      <table class="xc-table">
        <tr>
          <td style="width:6em">轮播图类型</td>
          <td>
            <c-select dict="lbt" v-model="lbtType"></c-select>
          </td>
          <td style="width:3em">排序</td>
          <td>
            <el-input v-model="lbtSort"></el-input>
          </td>
        </tr>
        <tr>
          <td>图片文件</td>
          <td colspan="3">
            <file-box v-model="lbtListFile" :multiple="false"></file-box>
          </td>
        </tr>
        <tr>

        </tr>
      </table>
      <el-button type="primary" @click="save">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowEdit: false,
      fields: {},
      selectedRow: {},

      lbtListFile: [],
      lbtType: null,
      lbtSort: 0,
      carouselPictureId: "",
    }
  },
  methods: {
    add() {
      this.lbtListFile = [];
      this.lbtType = null;
      this.lbtSort = 0;
      this.carouselPictureId = "";
      this.isShowEdit = true;
    },
    save() {
      this.xpost("projectCarouselPicture/saveOrUpdate", {
        carouselPictureId: this.carouselPictureId,
        picURL: this.lbtListFile.join(),
        picType: this.lbtType,
        picSort: this.lbtSort
      }).then(res => {
        this.mxMessage(res).then(() => {
          this.$refs.table.getData();
        })
      })
    },
    edit() { },
    del() { },
  },

  created() {

  }
}
</script>

