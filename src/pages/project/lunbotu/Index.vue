<template>
  <div class="xc6 xc-shadow x-center" style="width:800px">
    <fixed-table ref="table" get-data-url="projectCarouselPicture/getListJson" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
      <el-table-column slot="col" width="150" label="图片" align="center">
        <template slot-scope="scope">
          <img class="xc16 xc-shadow" :src="$store.state.smallPicBasePath + scope.row.picURL" alt="">
        </template>
      </el-table-column>
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag title="修改" width="600px">
      <table class="xc-table x-border">
        <tr>
          <td style="width:6em;text-align:center">轮播图类型</td>
          <td>
            <c-select dict="lbt" v-model="lbtType"></c-select>
          </td>
          <td style="width:3em;text-align:center">排序</td>
          <td>
            <el-input v-model="lbtSort"></el-input>
          </td>
        </tr>
        <tr>
          <td style="text-align:center">图片文件</td>
          <td colspan="3">
            <file-box v-model="lbtListFile" :multiple="false"></file-box>
          </td>
        </tr>
      </table>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let vue = this;
    return {
      isShowEdit: false,
      fields: {
        picType: {
          label: "轮播图类型",
          formatter(r, c, v) {
            return vue.mxDictToString("lbt", v)
          }
        },
        picSort: {
          label: "排序号"
        }
      },
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
    edit() {
      let a = this.selectedRow;
      if (a.carouselPictureId) {
        this.lbtListFile = [a.picURL];
        this.lbtType = a.picType;
        this.lbtSort = a.picSort;
        this.carouselPictureId = a.carouselPictureId;
        this.isShowEdit = true;
      }
    },
    save() {
      this.xpost("projectCarouselPicture/saveOrUpdate", {
        carouselPictureId: this.carouselPictureId,
        picURL: this.lbtListFile.join(),
        picType: this.lbtType,
        picSort: this.lbtSort
      }).then(res => {
        this.$refs.table.getData();
        this.mxMessage(res).then(() => {
          this.isShowEdit = false;
        })
      })
    },
    del() {
      // projectCarouselPicture/delete
      let a = this.selectedRow;
      if (a.carouselPictureId) {
        this.xpost("projectCarouselPicture/delete", {

        })
      }
    },
  },

  created() {

  }
}
</script>

