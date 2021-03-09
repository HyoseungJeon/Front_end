<template>
    <div>
        <div id="commonCodeHeader">
            <sui-button primary="primary" size="medium" content="코드 등록"/>
            <sui-button primary="primary" size="medium" content="코드 수정"/>
            <sui-button primary="primary" size="medium" content="코드 삭제"/>
        </div>

        <div class="grid-container-ccrbody" id="ccrbody-form">
            <div>
                <sui-table celled="celled" fixed="fixed">
                    <sui-table-header>
                        <sui-table-row>
                            <sui-table-header-cell>No</sui-table-header-cell>
                            <sui-table-header-cell>분류코드</sui-table-header-cell>
                            <sui-table-header-cell>코드</sui-table-header-cell>
                        </sui-table-row>
                    </sui-table-header>
                    <sui-table-body>
                        <sui-table-row v-for="(groupCode,index) in groupCodeList" v-bind:key="index"
                        @click="onClickGroupCodeRow(groupCode.code)"
                        >
                            <sui-table-cell>{{index + 1}}</sui-table-cell>
                            <sui-table-cell>{{groupCode.codeName}}</sui-table-cell>
                            <sui-table-cell>{{groupCode.code}}</sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </div>
            <div>
              <sui-table celled="celled" fixed="fixed">
                    <sui-table-header>
                        <sui-table-row>
                            <sui-table-header-cell>코드</sui-table-header-cell>
                            <sui-table-header-cell>코드명</sui-table-header-cell>
                        </sui-table-row>
                    </sui-table-header>
                    <sui-table-body>
                        <sui-table-row v-for="(commonCode,index) in commonCodeList" v-bind:key="index">
                            <sui-table-cell>{{commonCode.code}}</sui-table-cell>
                            <sui-table-cell>{{commonCode.codeName}}</sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name:'CommonCodeRetrieveView', 
    mounted:function(){
      this.commonCodeFind();
    },
    methods : {
      ...mapActions(['commonCodeFind',]),
      ...mapMutations(['setCommonCodeList']),
      onClickGroupCodeRow(groupCode){
        console.log("click group code row = " + groupCode[0])
        this.setCommonCodeList(groupCode[0])
      }
    },
    computed:{
      ...mapGetters({
        groupCodeList : 'getGroupCodeList',
        commonCodeList : 'getCommonCodeList'
      })
    }
}
</script>

<style>
  #commonCodeHeader{
    padding-top: 10px;
  }
  .grid-container-ccrbody{
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px 10px;
  }
  #ccrbody-form{
    padding-top: 10px;
  }
</style>