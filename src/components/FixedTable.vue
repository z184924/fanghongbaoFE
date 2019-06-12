<template>
  <div class="fixed-table" v-loading="loading">
    <!-- 头部按钮组 -->
    <div class="control-box" ref="controlBox">
      <div class="control" ref="control" v-if="showControl">
        <slot name="left-control"></slot>
        <el-input style="flex:200px 0 0" v-model="searchText" v-if="showSearch"></el-input>
        <!-- <div style="flex:0 0 60px"></div> -->
        <el-button type="success" @click="getData" v-if="showSearch" icon="el-icon-search">搜索</el-button>
        <div class="gap-full" v-if="hasRightControl"></div>
        <el-button type="primary" @click="insert" icon="el-icon-plus" v-if="showInsert">新增</el-button>
        <el-button type="warning" @click="update" icon="el-icon-edit-outline" v-if="showUpdate">修改</el-button>
        <el-button type="danger" @click="del" icon="el-icon-delete" v-if="showDelete">删除</el-button>
        <slot name="right-control"></slot>

        <!-- {{rowData}} -->
      </div>
      <div class="control-refresh">
        <el-button
          type="default"
          @click="getData"
          icon="el-icon-refresh"
          v-if="showRefresh"
          circle
          title="刷新数据"
        ></el-button>
      </div>
    </div>
    <div style="height:8px;" v-if="showControl"></div>
    <el-table
      ref="ft"
      :data="translateShowData"
      :row-style="rowStyle"
      :height="tableHeight"
      style="width: 100%"
      highlight-current-row
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      border
      :header-cell-style="headerStyle"
    >
      <slot name="col-first"></slot>
      <el-table-column type="selection" width="50" align="center" v-if="multiple"></el-table-column>
      <el-table-column
        v-for="(value, key, index) in valueFields"
        :prop="key"
        :label="value.label"
        :key="index"
        :formatter="value.formatter"
        :width="value.width"
        :align="value.align"
        :class-name="value.class"
        :title="value.title"
      ></el-table-column>
      <el-table-column v-if="fileInfo.hasFile" label="附件" width>
        <template>
          <a :href="fileInfo.serverUrl" target="_blank"></a>
          <!-- <file-view :serverUrl="fileInfo.serverUrl"></file-view> -->
        </template>
      </el-table-column>
      <slot name="col"></slot>
    </el-table>
    <div style="height:8px;"></div>
    <div style="text-align:right" v-if="showPage">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="page.current"
        :page-sizes="[10, 15, 20, 30, 50]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <!-- <fixed-table-form :fields="fields" :form-open-flag.sync="formOpenFlag" @updatedSuccess="getData" :saveOrUpdateDataUrl="saveOrUpdateDataUrl" :rowData="rowData" :getFormDataUrl="getFormDataUrl" :file-info="fileInfo"></fixed-table-form> -->
  </div>
</template>
<script>
/*
事件:
selected:多选时，选择改变触发，参数为选中的行
list中的每行对象:__bg:背景色，__color:字体颜色
*/
// import FixedTableForm from "./FixedTableForm";
// import FileView from "./FileView";
export default {
  components: {
    // FixedTableForm,
    // FileView
  },
  props: {
    // 是否显示控制按钮
    showControl: {
      type: Boolean,
      default: true
    },
    showRefresh: {
      type: Boolean,
      default: true
    },
    // 是否显示新增按钮
    showInsert: {
      type: Boolean,
      default: false
    },

    // 是否显示修改按钮
    showUpdate: {
      type: Boolean,
      default: false
    },

    // 是否显示删除按钮
    showDelete: {
      type: Boolean,
      default: false
    },

    // 是否显示查询按钮与输入框
    showSearch: {
      type: Boolean,
      default: false
    },

    // 是否显示分页
    showPage: {
      default: true
    },

    // 每页默认条数
    pageSize: {
      default: 15
    },

    // 搜索对应字段
    searchField: {
      default: "searchText"
    },

    // 表格高度
    tableHeight: {
      default: null
    },

    // 获取数据接口
    getDataUrl: {
      type: String,
      default: ""
    },

    // 单条数据接口
    getFormDataUrl: {
      type: String,
      default: ""
    },

    // 新增或修改接口
    saveOrUpdateDataUrl: {
      type: String,
      default: ""
    },

    // 删除接口
    deleteDataUrl: {
      type: String,
      default: ""
    },

    // 查询条件
    dataParam: {
      default() {
        return {};
      }
    },

    // 格式化
    formatter: {
      default: null
    },

    // 文件信息
    /*
      hasFile:是否含文件
      serverURL:文件服务器
    */
    fileInfo: {
      default() {
        return {
          hasFile: false
        };
      }
    },
    // 是否多选
    multiple: {
      default: false
    },
    selectedRows: {
      default() {
        return [];
      }
    },

    // 字段
    /*
      [key]:数据库对应字段
      primaryKey:是否主键
      label:首行标题名
      width:宽度（可带单位px、%等）
      type:类型（string，number，select）(小写)
      options:选项（[{value:"xxx",text:"xxx"}]）
      align:对齐方式
      disabledEditFlag:编辑或新增时此字段不可编辑
      disabledShowFlag:不显示字段
      formatter:<Function>格式化
      rule:验证规则（{ required: true, message: "排序号不能为空", trigger: "change" }）
      customRule:自定义验证规则（function(rule, value, callback){callback(new Error('不能大于100'));//--失败--callback();//--成功--}）
      customRuleTrigger:自定义校验规则对应的验证方式（change,blur等）
    */
    fields: {
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      loading: false,
      loadingTimer: null,
      headerStyle: {
        backgroundColor: "#e9a695",
        color: "#000"
        // textAlign: "center"
      },
      page: {
        current: 1,
        total: 0,
        size: this.pageSize
      },
      searchText: "",
      dataList: [],
      formOpenFlag: false,
      rowData: {},
      oldRowData: null,
      primaryKey: null,
      searchTimer: null
    };
  },
  computed: {
    valueFields() {
      let valueField = {};
      for (let item in this.fields) {
        if (!this.fields[item].disabledShowFlag) {
          valueField[item] = this.fields[item];
        }
      }
      return valueField;
    },
    translateShowData() {
      let list = this.clone(this.dataList);
      for (let field in this.fields) {
        if (
          this.fields[field].type == "select" ||
          this.fields[field].type == "boolean"
        ) {
          list.forEach(data => {
            this.fields[field].options.forEach(option => {
              if (option.value == data[field]) {
                data[field] = option.text;
              }
            });
          });
        }
      }
      return list;
    },
    hasRightControl() {
      if (this.$slots["right-control"]) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    dataParam: {
      handler() {
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(() => {
          this.getData();
        }, 300);
      },
      deep: true
    },
    selectedRows: {
      handler() {
        setTimeout(e => {
          if (this.selectedRows) {
            if (this.selectedRows.length > 0) {
              this.translateShowData.forEach((o, i) => {
                this.selectedRows.forEach(row => {
                  if (row.itemId == o.itemId) {
                    this.$refs.ft.toggleRowSelection(
                      this.translateShowData[i],
                      true
                    );
                  }
                });
              });
            }
          }
        }, 1);
      },
      deep: true
    },
    fields: {
      handler() {
        // 设置每个fields中每项的align值（默认居中）
        let f = this.fields;
        for (const key in f) {
          let ff = f[key];
          let align = null;
          for (const fk in ff) {
            if (fk == "align") {
              align = ff[fk];
            }
            f[key] = ff;
          }
          if (!align) {
            f[key].align = "center";
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    rowStyle(row) {
      let style = {};
      if (row.__bg != undefined) {
        style.backgroundColor = __bg;
      }
      if (row.__color != undefined) {
        style.color = __color;
      }
      return style;
    },
    insert() {
      this.oldRowData = this.clone(this.rowData);
      this.rowData = null;
      this.formOpenFlag = true;
      this.$forceUpdate();
    },
    clone(obj) {
      let newObj = {};
      let str = JSON.stringify(obj);
      newObj = JSON.parse(str);
      return newObj;
    },
    c(a) {
      // console.log(a);
    },
    update() {
      // console.log(this.primaryKey)
      if (this.oldRowData && !this.rowData) {
        this.rowData = this.clone(this.oldRowData);
      }
      if (this.rowData) {
        if (!this.rowData[this.primaryKey]) {
          this.$message({
            type: "warning",
            message: "请先选择数据"
          });
        } else {
          this.formOpenFlag = true;
        }
      } else {
        this.$message({
          type: "warning",
          message: "请先选择数据"
        });
      }
      this.$forceUpdate();
    },
    del() {
      if (!this.rowData[this.primaryKey]) {
        this.$message({
          type: "error",
          message: "请先选择数据"
        });
      } else {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning"
        })
          .then(() => {
            this.deleteData();
          })
          .catch(() => {});
      }
    },
    currentChange(e) {
      this.getData();
    },
    sizeChange(e) {
      this.page.size = e;
      this.getData();
    },
    handleCurrentChange(row) {
      if (!this.multiple) {
        this.rowData = row;
        let r = this.clone(row);
        if (row == null) {
          r = {};
        }
        this.$emit("input", r);
      }
    },
    handleSelectionChange(rows) {
      if (this.multiple) {
        this.$emit("input", rows);
      }
    },
    getData() {
      // console.log(11111);
      if (!this.loading) {
        this.loading = true;
        clearTimeout(this.loadingTimer);
        this.loadingTimer = setTimeout(() => {
          this.loading = false;
        }, 8000);
        let param = this.clone(this.dataParam);
        if (this.showPage) {
          param.page = this.page.current;
          param.rows = this.page.size;
        }
        if (this.searchText != "") {
          param[this.searchField] = this.searchText;
        } else {
          delete param[this.searchField];
        }
        // console.log(param)
        this.xpost(this.getDataUrl, param)
          .then(res => {
            this.page.total = res.records;
            if (this.map) {
              this.dataList = res.rows.map(o => {
                return this.map(o);
              });
            } else {
              this.dataList = res.rows;
            }
            // console.log(res)
            this.loading = false;
            clearTimeout(this.loadingTimer);
            this.$emit("done", this.dataList);
          })
          .catch(e => {
            this.loading = false;
            clearTimeout(this.loadingTimer);
          });
      }
    },
    deleteData() {
      this.xpost(this.deleteDataUrl, this.rowData).then(res => {
        this.$message({
          message: res.message,
          type: res.state
        });
        if (res.state == "success") {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getData();
        }
      });
    },
    formatterHandle(r, c, v) {
      // console.log(r)
      if (this.formatter) {
        return this.formatter(r, c, v);
      } else {
        return v;
      }
    }
  },
  created() {
    console.log(this.$slots);
    this.getData();
    for (let field in this.fields) {
      if (this.fields[field].primaryKey) {
        this.primaryKey = field;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.fixed-table {
  width: 100%;
  background-color: #fff;
  padding: 10px;
}
.gap-full {
  flex: 100% 1 1;
}
.control-box {
  // min-width:1200px;
  display: flex;
  padding: 0 0.5em;
}
.control {
  display: flex;
  flex: 1 0 0%;
  width: 100%;
  flex-wrap: nowrap;
  // flex-wrap: wrap;
  align-items: center;
  overflow-x: auto;

  // padding-bottom: 0.6em;
  // justify-content: center;
  & > * {
    white-space: nowrap;
  }
}
.control-refresh {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1em;
}
</style>
<style>
.fixed-table tr {
  cursor: pointer;
}
</style>


