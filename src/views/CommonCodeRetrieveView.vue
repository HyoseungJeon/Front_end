<template>
<div>
    <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(commonCodeSave)">
            <div id="commonCodeHeader">
                <sui-button primary="primary" size="medium" content="코드 저장" 
                @click="handleSubmit()"/>
                <sui-button size="medium" content="되돌리기" 
                type="button"
                @click="onClickInitBtn()"
                v-show="codeChanged"/>
            </div>
            <div class="grid-container-ccrbody" id="ccrbody-form">
                <div>
                    <sui-table celled="celled" fixed="fixed">
                        <caption style="padding-bottom : 5px">
                            <sui-button
                                type="button"
                                primary="primary"
                                circular="circular"
                                icon="plus icon"
                                floated="right"
                                @click="onClickRowHandler('group', 'add')"/>
                            <sui-button
                                v-show="!isGroupEmpty"
                                color="red"
                                type="button"
                                icon="minus icon"
                                circular="circular"
                                floated="right"
                                @click="onClickRowHandler('group', 'del')"/>
                        </caption>
                        <sui-table-header>
                            <sui-table-row >
                                <sui-table-header-cell>No</sui-table-header-cell>
                                <sui-table-header-cell>분류코드명
                                    <span class="icon-required">*</span>
                                </sui-table-header-cell>
                            </sui-table-row>
                        </sui-table-header>
                        <sui-table-body>
                            <sui-table-row
                                id="ccr-table-row"
                                v-for="(groupCode,index) in commonCodeList.group"
                                v-bind:key="index"
                                @click="onClickGroupCodeRow(index)"
                                :style="onTableRowSelected('group',index)">
                                <sui-table-cell>{{index + 1}}</sui-table-cell>
                                <sui-table-cell>
                                    <ValidationProvider rules="required" v-slot="{errors}">
                                        <sui-input
                                            fluid="fluid"
                                            transparent="transparent"
                                            maxlength="10"
                                            v-model="groupCode.codeName"></sui-input>
                                        <span class="span-error-message">{{errors[0]}}</span>
                                    </ValidationProvider>
                                </sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>
                </div>
                <div>
                    <sui-table celled="celled" fixed="fixed">
                        <caption style="padding-bottom : 5px" v-show="groupCode">
                            <sui-button
                                type="button"
                                primary="primary"
                                circular="circular"
                                icon="plus icon"
                                floated="right"
                                @click="onClickRowHandler('common', 'add')"/>
                            <sui-button
                                v-show="!isCommonCodeEmpty"
                                color="red"
                                type="button"
                                icon="minus icon"
                                circular="circular"
                                floated="right"
                                @click="onClickRowHandler('common', 'del')"/>
                        </caption>
                        <sui-table-header>
                            <sui-table-row>
                                <sui-table-header-cell>코드명
                                    <span class="icon-required">*</span>
                                </sui-table-header-cell>
                                <sui-table-header-cell>상위코드명</sui-table-header-cell>
                            </sui-table-row>
                        </sui-table-header>
                        <sui-table-body>
                            <sui-table-row
                                id="ccr-table-row"
                                v-for="(commonCode,index) in commonCodeList[groupCode]"
                                :key="index"
                                @click="onClickCommonCodeRow(index)"
                                :style="onTableRowSelected('commonCode',index)">
                                <sui-table-cell>
                                    <ValidationProvider rules="required" v-slot="{errors}">
                                        <sui-input
                                            fluid="fluid"
                                            transparent="transparent"
                                            maxlength="10"
                                            v-model="commonCode.codeName"></sui-input>
                                        <span class="span-error-message">{{errors[0]}}</span>
                                    </ValidationProvider>
                                </sui-table-cell>
                                <sui-table-cell id="table-cell-dropdown">
                                    <sui-dropdown
                                        class="dropdownoption"
                                        fluid="fluid"
                                        placeholder="상위코드"
                                        :options="dropdowns[commonCode.groupCode]"
                                        v-model="commonCode.parentCode"
                                        selection="selection"/>
                                </sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>
                </div>
            </div>
        </form>
    </ValidationObserver>
</div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import { CommonCode } from '~/model/'
export default {
    name:'CommonCodeRetrieveView', 
    mounted:function(){
      this.commonCodeGet();
    },
    components:{
      ValidationObserver,
      ValidationProvider,
    },
    data:function(){
      return{
        groupIndex : 0,
        groupCode: 'A',
        commonCodeIndex : 0,
        tableRowSelected :{
          background: '#e8e8e8'
        },
        groupTempCode : 0,
        maxGroupLength : 26,
        maxCommonCodeLength : 100,
      }
    },
    methods : {
      ...mapMutations(['initList',]),
      ...mapActions(['commonCodeGet','commonCodeSave']),
      onClickGroupCodeRow(index){
        this.groupIndex = index;
        this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode
        this.commonCodeIndex = 0;
      },
      onClickCommonCodeRow(index){
        this.commonCodeIndex = index;
      },
      onTableRowSelected:function(type,index){
        if(type === 'group'){
          return this.groupIndex === index ? this.tableRowSelected : ''
        }
        return this.commonCodeIndex === index ? this.tableRowSelected : ''
      },
      onClickRowHandler(type, action){
        if(type === 'group'){
          if(action === 'add'){
            if(this.commonCodeList.group.length >= this.maxGroupLength){
              alert("최대 그룹 코드 수는 "+this.maxGroupLength+"개 입니다.")
              return;
            }
            let newGroupCode = this.incrementTempId();
            this.$set(this.commonCodeList, newGroupCode, new Array(new CommonCode(newGroupCode,null,'',null),))
            this.$set(this.commonCodeList.group,this.commonCodeList.group.length,new CommonCode(newGroupCode, newGroupCode,''))
            
            this.groupIndex = this.commonCodeList.group.length - 1;
            this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode
            this.commonCodeIndex = 0;
          }
          else{
            delete this.commonCodeList[this.commonCodeList.group[this.groupIndex].groupCode]
            this.commonCodeList.group.splice( this.groupIndex, 1 )
            this.groupIndex = this.commonCodeList.group.length - 1
            this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode
          }
        }
        else{
          if(action === 'add'){
            if(this.commonCodeList[this.groupCode].length >= this.maxCommonCodeLength){
              alert("최대 그룹 코드 수는 "+this.maxCommonCodeLength+"개 입니다.")
              return;
            }
            this.$set( this.commonCodeList[this.groupCode],this.commonCodeList[this.groupCode].length,new CommonCode(this.groupCode,null,'',null))
            this.commonCodeIndex = this.commonCodeList[this.groupCode].length - 1
          }
          else{
            this.commonCodeList[this.groupCode].splice( this.commonCodeIndex, 1 );
            this.commonCodeIndex = this.commonCodeList[this.groupCode].length - 1
          }
        }
      },
      onClickInitBtn(){
        if(!confirm('변경하신 데이터가 처음으로 초기화 됩니다.'))
          return;
        this.initList();
        this.groupIndex = 0,
        this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode,
        this.commonCodeIndex = 0
      },
      incrementTempId(){
        if(this.groupTempCode === 0){
          this.groupTempCode = 1
        }
        else{
          this.groupTempCode++
        }
        return 'temp' + this.groupTempCode
      }
    },
    computed:{
      ...mapGetters({
        commonCodeList : 'getCommonCodeList',
        dropdowns: 'getDropdowns',
        originCommonCodeList : 'getOriginCommonCodeList',
        codeChanged : 'getChanged'
      }),
      isGroupEmpty: function(){ return this.commonCodeList.group.length === 0 },
      isCommonCodeEmpty: function(){ return this.commonCodeList[this.groupCode].length === 0 }
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
  #ccr-table-row{
    height: 60px;
  }
  #table-cell-dropdown {
        overflow: visible;
  }
</style>