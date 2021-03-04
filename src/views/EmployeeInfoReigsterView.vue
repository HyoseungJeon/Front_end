<template>
  <div class="eirview-body">
    <div class="grid-container-employee-info-register-body-up">
      <div id="eirview-image-form">
        <img src='@/assets/images/defalut_image.png' width="150" height="200"/>
        <sui-button fluid="fluid">사진 등록</sui-button>
      </div>
      
      <div>
            <sui-table celled="celled">
                <sui-table-body>
                    <sui-table-row>
                        <sui-table-cell rowspan="3">성명</sui-table-cell>
                        <sui-table-cell>한글</sui-table-cell>
                        <sui-table-cell><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                        <sui-table-cell>입사일</sui-table-cell>
                        <sui-table-cell><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                        <sui-table-cell>퇴사일</sui-table-cell>
                        <sui-table-cell><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                    </sui-table-row>
 
                    <sui-table-row>
                        <sui-table-cell>한자</sui-table-cell>
                        <sui-table-cell><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                        <sui-table-cell>채용구분</sui-table-cell>
                        <sui-table-cell><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                        <sui-table-cell>결혼유무</sui-table-cell>
                        <sui-table-cell><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                    </sui-table-row>
 
                    <sui-table-row>
                        <sui-table-cell>영문</sui-table-cell>
                        <sui-table-cell><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                        <sui-table-cell>본적</sui-table-cell>
                        <sui-table-cell colspan="3"><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                    </sui-table-row>
 
                    <sui-table-row>
                        <sui-table-cell>주민등록번호</sui-table-cell>
                        <sui-table-cell colspan="2"><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                        <sui-table-cell>현주소</sui-table-cell>
                        <sui-table-cell colspan="3"><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                    </sui-table-row>
                    <sui-table-row>
                        <sui-table-cell>소속</sui-table-cell>
                        <sui-table-cell colspan="2"><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                        <sui-table-cell>연락처</sui-table-cell>
                        <sui-table-cell colspan="3"><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                    </sui-table-row>
                    <sui-table-row>
                        <sui-table-cell>직급</sui-table-cell>
                        <sui-table-cell colspan="2"><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                        <sui-table-cell>E-mail</sui-table-cell>
                        <sui-table-cell colspan="3"><sui-input fluid="fluid" transparent="transparent"></sui-input></sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
        </div>
    </div>
    <div class="grid-container-employee-info-register-body-down">
      <div id="education">
        <sui-table celled="celled">
          <caption>
            <div class="grid-container-employee-info-register-table-header">
              <div align="left">
                <h4>학력</h4>
              </div>
              <div>
                <sui-button circular icon="plus icon" floated="right"/>
              </div>
            </div>
          </caption>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>입학일자</sui-table-header-cell>
                        <sui-table-header-cell>학교명</sui-table-header-cell>
                        <sui-table-header-cell>전공</sui-table-header-cell>
                        <sui-table-header-cell>졸업여부</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
 
                <sui-table-body>
                    <sui-table-row>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
      </div>
      <div id="license">
        <sui-table celled="celled">
          <caption>
            <div class="grid-container-employee-info-register-table-header">
              <div align="left">
                <h4>자격사항</h4>
              </div>
              <div>
                <sui-button circular icon="plus icon" floated="right"/>
              </div>
            </div>
          </caption>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>종류</sui-table-header-cell>
                        <sui-table-header-cell>점수</sui-table-header-cell>
                        <sui-table-header-cell>구분</sui-table-header-cell>
                        <sui-table-header-cell>취득일자</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
 
                <sui-table-body>
                    <sui-table-row>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
      </div>
      <div id="career" class="item-career-body">
        <sui-table celled="celled">
          <caption>
            <div class="grid-container-employee-info-register-table-header">
              <div align="left">
                <h4>경력</h4>
              </div>
              <div>
                <sui-button circular icon="plus icon" floated="right"/>
              </div>
            </div>
          </caption>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>기간</sui-table-header-cell>
                        <sui-table-header-cell>직장명</sui-table-header-cell>
                        <sui-table-header-cell>직급</sui-table-header-cell>
                        <sui-table-header-cell>담당업무</sui-table-header-cell>
                        <sui-table-header-cell>비고</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
 
                <sui-table-body>
                    <sui-table-row>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
      </div>
      <div id="family">
        <sui-table celled="celled">
          <caption>
            <div class="grid-container-employee-info-register-table-header">
              <div align="left">
                <h4>가족관계</h4>
              </div>
              <div>
                <sui-button circular icon="plus icon" floated="right"/>
              </div>
            </div>
          </caption>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>관계</sui-table-header-cell>
                        <sui-table-header-cell>성명</sui-table-header-cell>
                        <sui-table-header-cell>생년월일</sui-table-header-cell>
                        <sui-table-header-cell>비고</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
 
                <sui-table-body>
                    <sui-table-row>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
      </div>
      <div id="mil">
        <sui-table celled="celled">
          <caption>
            <div class="grid-container-employee-info-register-table-header">
              <div align="left">
                <h4>병역</h4>
              </div>
              <div style="visibility:hidden">
                <sui-button circular icon="plus icon" floated="right" />
              </div>
            </div>
          </caption>
                <sui-table-header>
                    <sui-table-row>
                        <sui-table-header-cell>입대일</sui-table-header-cell>
                        <sui-table-header-cell>제대일</sui-table-header-cell>
                        <sui-table-header-cell>계급</sui-table-header-cell>
                        <sui-table-header-cell>면제사유</sui-table-header-cell>
                    </sui-table-row>
                </sui-table-header>
 
                <sui-table-body>
                    <sui-table-row>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                        <sui-table-cell>
                            <sui-input fluid="fluid" transparent="transparent"></sui-input>
                        </sui-table-cell>
                    </sui-table-row>
                </sui-table-body>
            </sui-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name:'EmployeeInfoReigsterView', 
    computed:{
      ...mapGetters({
        employee : 'getRegisterEmployee',
      })
    }
}
</script>

<style>
  .grid-container-employee-info-register-table-header{
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    padding-bottom: 5px;
  }
  #eirview-image-form{
    text-align: center;
    align-content: center;
  }
  .eirview-body{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .grid-container-employee-info-register-body-up {
    display: grid;
    grid-template-columns: 180px auto;
    grid-gap: 10px 20px;
  }
  .grid-container-employee-info-register-body-down {
    padding-top: 20px;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px 20px;
  }
  .item-career-body{
    grid-column-start: 1;
    grid-column-end: 3;
  }
</style>
