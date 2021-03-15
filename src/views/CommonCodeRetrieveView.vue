<template>
<div>
    <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onClickSaveBtn)">
            <div id="commonCodeHeader">
                <sui-button primary="primary" size="medium" content="코드 저장" 
                @click="handleSubmit()"/>
                <sui-button size="medium" content="되돌리기" 
                type="button"
                @click="onClickInitBtn()"
                v-show="codeChanged"/>
                <sui-button
                    type="button"
                    circular="circular"
                    icon="info icon"
                    floated="right"
                    size="tiny"
                    @click="onClickInfoBtn()"/>
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
                                :class="{'tableRowSelected' : onTableRowSelected('group',index)}">
                                <sui-table-cell>{{index + 1}}</sui-table-cell>
                                <sui-table-cell>
                                    <ValidationProvider rules="required|codeName" v-slot="{errors}">
                                        <sui-input
                                        style="font-weight: bold;"
                                            fluid="fluid"
                                            transparent="transparent"
                                            maxlength="10"
                                            v-model="groupCode.codeName"
                                            type="text"
                                            ></sui-input>
                                        <span class="span-error-message">{{errors[0]}}</span>
                                    </ValidationProvider>
                                </sui-table-cell>
                            </sui-table-row>
                        </sui-table-body>
                    </sui-table>
                </div>
                <div> 
                  <ValidationObserver ref="CommonCodeRetrieveValidate">
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
                                    <ValidationProvider rules="required|codeName" v-slot="{errors}">
                                        <sui-input
                                            fluid="fluid"
                                            transparent="transparent"
                                            maxlength="10"
                                            v-model="commonCode.codeName"
                                            type="text"></sui-input>
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
                    </ValidationObserver>
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
import '@/util/validationRules/CommonCodeRules.js'
import { DropdownUtil } from '~/util/'
import swal from 'sweetalert'
export default {
    name:'CommonCodeRetrieveView', 
    mounted:async function(){
      await this.commonCodeGet();
      this.initCommonCodeListValidate();
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
          background: '#e8e8e8',
          fontWeight : 'bold'
        },
        maxGroupLength : 26,
        maxCommonCodeLength : 100,
        commonCodeListValidate : [],
      }
    },
    methods : {
      ...mapMutations(['initList','increamentGroupTempCode']),
      ...mapActions(['commonCodeGet','commonCodeSave', 'dropdown']),
      onClickInfoBtn:function(){
        swal(
          {
            title: '안내 사항',
            text: '상위 코드 등록의 경우 새로 추가된 코드들이 저장 된 후 사용이 가능합니다.\n\n' +
            '코드를 변경 할 시 되돌리기 버튼이 활성화 됩니다. 새로 추가하신 코드들이 이전 상태로 모두 초기화 됨으로 주의하십시오.\n\n' +
            '최대 분류코드 개수는 26개 입니다.\n\n' +
            '최대 공통코드 개수는 100개 입니다.\n\n',
          }
        )
      },
      onClickSaveBtn:async function(){
        if(!this.codeChanged){
          swal('변경사항이 없습니다.')
          return;
        }
        await this.checkNowCodesVaildate()
          .then(validate => {
            this.commonCodeListValidate[this.groupIndex] = validate;
          })
          .catch(()=>{
            swal("유효성 검사에 실패하였습니다.")
          }
        )

        for(let index = 0 ; index < this.commonCodeListValidate.length ; index++){
          if(!this.commonCodeListValidate[index]){
            this.groupIndex = index;
            this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode
            swal("입력되지 않은 정보가 존재합니다.")
            return;
          }
        }
        this.commonCodeSave()
        this.dropdowns = DropdownUtil.toDropdowns(this.commonCodeList)
        this.dropdown();
      },
      checkNowCodesVaildate: function(){
        return new Promise((resolve, reject) => {
            this.$refs.CommonCodeRetrieveValidate.validate()
              .then(validate =>{
                  resolve(validate);
              })
              .catch(error =>{
                  reject(error);
              })
        })
      },
      initCommonCodeListValidate(){
        this.commonCodeListValidate = [];
        for(var group in this.commonCodeList.group){
          group;
          this.commonCodeListValidate.push(true);
        }
      },
      onClickGroupCodeRow:async function(index){
        //기존 선택되있던 groupindex valitadte를 반영
        await this.checkNowCodesVaildate()
          .then(validate => {
            this.commonCodeListValidate[this.groupIndex] = validate;
          })
          .catch(()=>{
            swal("유효성 검사에 실패하였습니다.")
          }
        )
        
        this.groupIndex = index;
        this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode
        this.commonCodeIndex = 0;
      },
      onClickCommonCodeRow(index){
        this.commonCodeIndex = index;
      },
      onTableRowSelected:function(type,index){
        if(type === 'group'){
          return this.groupIndex === index ? this.tableRowSelected : null
        }
        return this.commonCodeIndex === index ? this.tableRowSelected : null
      },
      onClickRowHandler(type, action){
        if(type === 'group'){
          if(action === 'add'){
            if(this.commonCodeList.group.length >= this.maxGroupLength){
              return;
            }
            let newGroupCode = 'temp' + this.groupTempCode;
            this.increamentGroupTempCode();
            this.$set(this.commonCodeList, newGroupCode, new Array(new CommonCode(null,newGroupCode,'',null),))
            this.$set(this.commonCodeList.group,this.commonCodeList.group.length,new CommonCode(newGroupCode, null,''))
            this.commonCodeListValidate.push(false)

            //추가 시 가장 밑 row로 이동
            this.groupIndex = this.commonCodeList.group.length - 1;
            this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode
            this.commonCodeIndex = 0;
          }
          else{
            delete this.commonCodeList[this.commonCodeList.group[this.groupIndex].groupCode]
            this.commonCodeList.group.splice( this.groupIndex, 1 )
            this.commonCodeListValidate.splice(this.groupIndex, 1 )

            //추가 시 가장 밑 row로 이동
            this.groupIndex = this.commonCodeList.group.length - 1
            this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode
          }
        }
        else{
          if(action === 'add'){
            if(this.commonCodeList[this.groupCode].length >= this.maxCommonCodeLength){
              return;
            }
            this.$set( this.commonCodeList[this.groupCode],this.commonCodeList[this.groupCode].length,new CommonCode(null,this.groupCode,'',null))
            this.commonCodeIndex = this.commonCodeList[this.groupCode].length - 1
          }
          else{
            this.commonCodeList[this.groupCode].splice( this.commonCodeIndex, 1 );
            this.commonCodeIndex = this.commonCodeList[this.groupCode].length - 1
          }
        }
      },
      onClickInitBtn(){
        swal("입력하신 데이터를 초기화 하시겠습니까?", {
          dangerMode: true,
          icon: "warning",
          buttons:{
            cancel: {
              text: "취소",
              value: null,
              visible: true,
              className: "",
              closeModal: true,
            },
            confirm :{
              text: " 예 ",
              value : true,
            }
          }
        }).then(value =>{
          if(value){
        this.initList();
        this.initCommonCodeListValidate();
        this.groupIndex = 0,
        this.groupCode = this.commonCodeList.group[this.groupIndex].groupCode,
        this.commonCodeIndex = 0
          }
        })
      },
    },
    computed:{
      ...mapGetters({
        commonCodeList : 'getCommonCodeList',
        dropdowns: 'getDropdowns',
        originCommonCodeList : 'getOriginCommonCodeList',
        codeChanged : 'getChanged',
        groupTempCode : 'getGroupTempCode',
      }),
      isGroupEmpty: function(){ return this.commonCodeList.group.length === 0 },
      isCommonCodeEmpty: function(){ return this.commonCodeList[this.groupCode] ? this.commonCodeList[this.groupCode].length === 0 : null},
      commonCodeListValidates:function() { return this.commonCodeListValidate}
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
  .tableRowSelected{
    background: #e8e8e8;
    font-weight: bold;
  }
</style>