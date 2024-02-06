
<!-- <template>
  <div>
    <el-tree :data="menus" :props="defaultProps" node-key="id" :expand-on-click-node="false"
      :default-expanded-keys="treeData" :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMenuInfo } from '@/store/modules/menus'
const menuInfo = useMenuInfo()
const menus = ref([])
const getMenus = async () => {
  try {
    const result = await menuInfo.getMenu()
    menus.value = result.data.info_list
  } catch (error) {
    console.error('加载菜单失败', error)
  }
}
 /** 查询部门下拉树结构 */
 const getTreeselect() {
      treeselect().then((response) => {
        response.data.forEach(element => {
          this.treeData.push(element.id)
        });
        this.deptOptions = response.data;
      });
    },
</script>
<style lang="scss" scoped></style> -->





















<!-- <template>
  <el-table v-loading="loading" :data="menus" row-key="selfid" lazy :load="treeLoad"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"> -->
  <!-- 表格列定义 -->
  <!-- <el-table-column type="selection" align="center"></el-table-column>
    <el-table-column prop="pid" label="根菜单" />
    <el-table-column prop="name" label="菜单名称" />
    <el-table-column prop="url" label="菜单路径" /> -->
  <!-- </el-table> -->
  <!-- <el-row>
    <el-col :span="24">
      <el-table :data="dataList" border width="100%" :header-cell-style="{ 'text-align': 'center' }"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :row-key="(record) => record.id">
        <el-table-column label="菜单ID" prop="pid" align="center"></el-table-column>
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="url" label="菜单路径" />
        <el-table-column label="上级菜单ID" align="center">
          <template slot-scope="scope">
            {{ scope.row.selfid == null ? "-" : scope.row.selfid }}
          </template>
        </el-table-column>
        <el-table-column label="菜单名称" prop="name" align="center"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template> -->

<!-- <script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMenuInfo } from '@/store/modules/menus'
const menuInfo = useMenuInfo()
const menus = ref([])

const getMenus = async () => {
  try {
    const result = await menuInfo.getMenu()
    menus.value = result.data.info_list
  } catch (error) {
    console.error('Failed to load menus.', error)
  }
}



onMounted(getMenus)
//初始化数据
const getData = () => {
  var data = menus.value
  let dataList = getTrees(data);
  console.log(dataList);
}

// 获取树形结构
//获取结构树
const getTrees = (list, selfid = 0) => {
  let parentObj = {};
  list.forEach((o) => {
    parentObj[o.id] = o;
  });
  if (!selfid) {
    return list
      .filter((o: any) => !parentObj[o.selfid])
      .map((o: any) => ((o.children = getTrees(list, o.id)), o));
  } else {
    return list
      .filter((o: any) => o.selfid == selfid)
      .map((o: any) => ((o.children = getTrees(list, o.id)), o));
  }
}

</script>

<style lang="scss" scoped></style> 
