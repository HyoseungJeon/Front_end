<template>
  <div class="eirview-body">
      <ValidationObserver ref="EmployeeInfoObserver">
        <div class="grid-container-employee-info-register-body-up">
            <div id="eirview-image-form">
                <img width="180" height="230" :src="imageUrl"/>
                <div style="padding-top:10px">
                    <sui-button type="button" fluid="fluid" @click="onClickEmployeeInputBtn">사진 등록</sui-button>
                    <input
                        type="file"
                        ref="employeeInputImage"
                        hidden="hidden"
                        @change="onChangeImage"/>
                </div>
                <ValidationProvider rules="required" v-slot="{errors}">
                    <input v-model="employeeImage" hidden/>
                    <span class="span-error-message">{{errors[0]}}</span>
                </ValidationProvider>
            </div>
            <div>
                <sui-table class="ui celled structured" fixed="fixed">
                    <sui-table-body>
                        <sui-table-row>
                            <sui-table-cell class="eirview-table-header" rowspan="3" text-align="center">성명
                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">한글
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell :error="true">
                                <ValidationProvider rules="required|koreanName" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="10"
                                        placeholder="홍길동"
                                        v-model="employee.name"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">입사일
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.hireDate"
                                    :max-date="employee.retirementDate"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <ValidationProvider rules="required" v-slot="{errors}">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                            <span class="span-error-message">{{errors[0]}}</span>
                                        </ValidationProvider>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">퇴사일</sui-table-cell>
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.retirementDate"
                                    :max-date="employee.retirementDate"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <sui-input
                                            size="small"
                                            :value="inputValue"
                                            v-on="inputEvents"
                                            icon="calendar alternate outline icon"
                                            placeholder="1970-01-01"
                                            fluid="fluid"
                                            maxlength="10"/>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                        </sui-table-row>

                        <sui-table-row>
                            <sui-table-cell class="eirview-table-header" text-align="center">영문
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider rules="required|englishName" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        placeholder="HongGildong"
                                        maxlength="20"
                                        v-model="employee.englishName"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">채용구분
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell id="table-cell-dropdown">
                                <ValidationProvider rules="required" v-slot="{errors}">
                                    <sui-dropdown
                                        class="dropdownoption"
                                        fluid="fluid"
                                        placeholder="채용유형"
                                        selection="selection"
                                        :options="dropdowns.D"
                                        v-model="employee.hireType"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">결혼유무
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell>
                                <div class="ui two column centered grid">
                                    <div class="column">
                                        <sui-checkbox
                                            label="미혼"
                                            radio="radio"
                                            value="E02"
                                            v-model="employee.isMarried"
                                            checked="checked"/>
                                    </div>
                                    <div class="column">
                                        <sui-checkbox
                                            label="기혼"
                                            radio="radio"
                                            value="E01"
                                            v-model="employee.isMarried"/>
                                    </div>
                                </div>
                            </sui-table-cell>
                        </sui-table-row>

                        <sui-table-row>
                            <sui-table-cell
                                class="eirview-table-header"
                                text-align="center"
                                type="text"
                                maxlength="20">한자</sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider rules="chineseName" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="5"
                                        placeholder="洪吉洞"
                                        v-model="employee.chinesesName"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell
                                class="eirview-table-header"
                                text-align="center"
                                type="text"
                                maxlength="50">본적
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell colspan="3">
                                <ValidationProvider rules="required|max:50" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="50"
                                        placeholder="서울특별시 송파구 법원로9길 26 에이치비지니스파크 D동 6층"
                                        v-model="employee.familyOrigin"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                        </sui-table-row>

                        <sui-table-row>
                            <sui-table-cell class="eirview-table-header" text-align="center">주민등록번호
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell colspan="2">
                                <ValidationProvider rules="required|rrn" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="14"
                                        placeholder="000000-0000000"
                                        v-model="employee.rrn"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>

                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">현주소
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell colspan="3">
                                <ValidationProvider rules="required|max:50" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="50"
                                        placeholder="서울특별시 송파구 법원로9길 26 에이치비지니스파크 D동 6층"
                                        v-model="employee.address"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                        </sui-table-row>
                        <sui-table-row>
                            <sui-table-cell class="eirview-table-header" text-align="center">소속
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell colspan="2" id="table-cell-dropdown">
                                <ValidationProvider rules="required" v-slot="{errors}">
                                    <sui-dropdown
                                        :options="dropdowns.A"
                                        placeholder="소속"
                                        search="search"
                                        selection="selection"
                                        fluid="fluid"
                                        v-model="employee.department"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">집번호</sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider rules="tel" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="13"
                                        placeholder="000-0000-0000"
                                        v-model="employee.tel"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">연락처
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider rules="required|hp" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="13"
                                        placeholder="000-0000-0000"
                                        v-model="employee.hp"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                        </sui-table-row>
                        <sui-table-row>
                            <sui-table-cell class="eirview-table-header" text-align="center">직급
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell colspan="2" id="table-cell-dropdown">
                                <ValidationProvider rules="required" v-slot="{errors}">
                                    <sui-dropdown
                                        :options="dropdowns.B"
                                        placeholder="직급"
                                        search="search"
                                        fluid="fluid"
                                        selection="selection"
                                        v-model="employee.position"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell class="eirview-table-header" text-align="center">E-mail
                                <span class="icon-required">*</span>
                            </sui-table-cell>
                            <sui-table-cell colspan="3">
                                <ValidationProvider rules="required|email" v-slot="{errors}">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="email"
                                        maxlength="320"
                                        placeholder="plateer123@plateer.com"
                                        v-model="employee.email"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </div>
        </div>
        <h4 style="padding-left : 10px">선택입력 정보</h4>
        <div class="grid-container-employee-info-register-body-down">
            <div id="education">
                <sui-table celled="celled" fixed="fixed">
                    <caption>
                        <div class="grid-container-employee-info-register-table-header">
                            <div align="left">
                                <h4>학력</h4>
                            </div>
                            <div>
                                <sui-button
                                    type="button"
                                    icon="plus icon"
                                    circular="circular"
                                    floated="right"
                                    @click="plus('education')"
                                    primary="primary"/>
                                <sui-button
                                    type="button"
                                    icon="minus icon"
                                    circular="circular"
                                    floated="right"
                                    @click="minus('education')"
                                    v-if="isCanMinus('education')"/>
                            </div>
                        </div>
                    </caption>
                    <sui-table-header>
                        <sui-table-row text-align="center">
                            <sui-table-header-cell>학교명
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>전공/계열
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>졸업일자</sui-table-header-cell>
                            <sui-table-header-cell>졸업여부
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                        </sui-table-row>
                    </sui-table-header>

                    <sui-table-body>
                        <sui-table-row
                            v-for="(education,index) in employee.educationList"
                            v-bind:key="index">
                            <sui-table-cell>
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isEducationEmpty(index) ? '' : 'required|min:4|max:20'}`">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="20"
                                        v-model="employee.educationList[index].school"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isEducationEmpty(index) ? '' : 'required|min:1|max:20'}`">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="20"
                                        v-model="employee.educationList[index].major"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.educationList[index].graduationDate"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <sui-input
                                            size="small"
                                            :value="inputValue"
                                            v-on="inputEvents"
                                            icon="calendar alternate outline icon"
                                            placeholder="1970-01-01"
                                            fluid="fluid"
                                            maxlength="10"/>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                            <sui-table-cell id="table-cell-dropdown">
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isEducationEmpty(index) ? '' : 'required'}`">
                                    <sui-dropdown
                                        fluid="fluid"
                                        placeholder="졸업유형"
                                        selection="selection"
                                        :options="dropdowns.H"
                                        v-model="employee.educationList[index].graduation"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </div>
            <div id="license">
                <sui-table celled="celled" fixed="fixed">
                    <caption>
                        <div class="grid-container-employee-info-register-table-header">
                            <div align="left">
                                <h4>자격사항</h4>
                            </div>
                            <div>
                                <sui-button
                                    type="button"
                                    icon="plus icon"
                                    circular="circular"
                                    floated="right"
                                    @click="plus('license')"
                                    primary="primary"/>
                                <sui-button
                                    type="button"
                                    icon="minus icon"
                                    circular="circular"
                                    floated="right"
                                    @click="minus('license')"
                                    v-if="isCanMinus('license')"/>
                            </div>
                        </div>
                    </caption>
                    <sui-table-header>
                        <sui-table-row text-align="center">
                            <sui-table-header-cell>구분
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>점수
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>종류
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>취득일자
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                        </sui-table-row>
                    </sui-table-header>

                    <sui-table-body>
                        <sui-table-row
                            v-for="(license,index) in employee.licenseList"
                            v-bind:key="index">
                            <sui-table-cell id="table-cell-dropdown">
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isLicenseEmpty(index) ? '' : 'required'}`">
                                    <sui-dropdown
                                        fluid="fluid"
                                        placeholder="구분"
                                        selection="selection"
                                        :options="dropdowns.I"
                                        v-model="employee.licenseList[index].division"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isLicenseEmpty(index) ? '' : 'required|max:4'}`">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="number"
                                        v-model="employee.licenseList[index].score"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isLicenseEmpty(index) ? '' : 'required|max:10'}`">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        type="text"
                                        maxlength="10"
                                        v-model="employee.licenseList[index].kind"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.licenseList[index].getDate"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <ValidationProvider
                                            v-slot="{errors}"
                                            :rules="`${isLicenseEmpty(index) ? '' : 'required'}`">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                            <span class="span-error-message">{{errors[0]}}</span>
                                        </ValidationProvider>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </div>
            <div id="career" class="item-career-body">
                <sui-table celled="celled" fixed="fixed">
                    <caption>
                        <div class="grid-container-employee-info-register-table-header">
                            <div align="left">
                                <h4>경력</h4>
                            </div>
                            <div>
                                <sui-button
                                    type="button"
                                    icon="plus icon"
                                    circular="circular"
                                    floated="right"
                                    @click="plus('career')"
                                    primary="primary"/>
                                <sui-button
                                    type="button"
                                    icon="minus icon"
                                    circular="circular"
                                    floated="right"
                                    @click="minus('career')"
                                    v-if="isCanMinus('career')"/>
                            </div>
                        </div>
                    </caption>
                    <sui-table-header>
                        <sui-table-row text-align="center">
                            <sui-table-header-cell>입사일
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>퇴사일
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>직장명
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>직급
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>담당업무
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>비고</sui-table-header-cell>
                        </sui-table-row>
                    </sui-table-header>

                    <sui-table-body>
                        <sui-table-row v-for="(career,index) in employee.careerList" v-bind:key="index">
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.careerList[index].startDate"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <ValidationProvider
                                            v-slot="{errors}"
                                            :rules="`${isCareerEmpty(index) ? '' : 'required'}`">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                            <span class="span-error-message">{{errors[0]}}</span>
                                        </ValidationProvider>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.careerList[index].endDate"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <ValidationProvider
                                            v-slot="{errors}"
                                            :rules="`${isCareerEmpty(index) ? '' : 'required'}`">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                            <span class="span-error-message">{{errors[0]}}</span>
                                        </ValidationProvider>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isCareerEmpty(index) ? '' : 'required|max:10'}`">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        maxlength="10"
                                        v-model="employee.careerList[index].company"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell id="table-cell-dropdown">
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isCareerEmpty(index) ? '' : 'required'}`">
                                    <sui-dropdown
                                        :options="dropdowns.B"
                                        placeholder="직급"
                                        search="search"
                                        fluid="fluid"
                                        selection="selection"
                                        v-model="employee.careerList[index].position"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isCareerEmpty(index) ? '' : 'required|max:50'}`">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        maxlength="50"
                                        v-model="employee.careerList[index].work"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <sui-input
                                    fluid="fluid"
                                    transparent="transparent"
                                    v-model="employee.careerList[index].subContent"></sui-input>
                            </sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </div>
            <div id="family">
                <sui-table celled="celled" fixed="fixed">
                    <caption>
                        <div class="grid-container-employee-info-register-table-header">
                            <div align="left">
                                <h4>가족관계</h4>
                            </div>
                            <div>
                                <sui-button
                                    type="button"
                                    icon="plus icon"
                                    circular="circular"
                                    floated="right"
                                    @click="plus('family')"
                                    primary="primary"/>
                                <sui-button
                                    type="button"
                                    icon="minus icon"
                                    circular="circular"
                                    floated="right"
                                    @click="minus('family')"
                                    v-if="isCanMinus('family')"/>
                            </div>
                        </div>
                    </caption>
                    <sui-table-header>
                        <sui-table-row text-align="center">
                            <sui-table-header-cell>관계
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>성명
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>생년월일
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>비고</sui-table-header-cell>
                        </sui-table-row>
                    </sui-table-header>

                    <sui-table-body>
                        <sui-table-row v-for="(family,index) in employee.familyList" v-bind:key="index">
                            <sui-table-cell id="table-cell-dropdown">
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isFamilyEmpty(index) ? '' : 'required'}`">
                                    <sui-dropdown
                                        fluid="fluid"
                                        placeholder="관계"
                                        selection="selection"
                                        :options="dropdowns.O"
                                        v-model="employee.familyList[index].relation"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isFamilyEmpty(index) ? '' : 'required|koreanName'}`">
                                    <sui-input
                                        fluid="fluid"
                                        transparent="transparent"
                                        v-model="employee.familyList[index].name"></sui-input>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.familyList[index].birthday"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <ValidationProvider
                                            v-slot="{errors}"
                                            :rules="`${isFamilyEmpty(index) ? '' : 'required'}`">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                            <span class="span-error-message">{{errors[0]}}</span>
                                        </ValidationProvider>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                            <sui-table-cell>
                                <sui-input
                                    fluid="fluid"
                                    transparent="transparent"
                                    v-model="employee.familyList[index].subContent"></sui-input>
                            </sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </div>
            <div id="mil">
                <sui-table celled="celled" fixed="fixed">
                    <caption>
                        <div class="grid-container-employee-info-register-table-header">
                            <div align="left">
                                <h4>병역</h4>
                            </div>
                            <div style="visibility:hidden">
                                <sui-button
                                    type="button"
                                    primary="primary"
                                    circular="circular"
                                    icon="plus icon"
                                    floated="right"/>
                            </div>
                        </div>
                    </caption>
                    <sui-table-header>
                        <sui-table-row text-align="center">
                            <sui-table-header-cell>입대일
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>제대일
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>계급
                                <span class="icon-required">*</span>
                            </sui-table-header-cell>
                            <sui-table-header-cell>면제사유</sui-table-header-cell>
                        </sui-table-row>
                    </sui-table-header>

                    <sui-table-body>
                        <sui-table-row>
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.militaryStartDate"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <ValidationProvider
                                            v-slot="{errors}"
                                            :rules="`${isMilitaryEmpty() ? '' : 'required'}`">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                            <span class="span-error-message">{{errors[0]}}</span>
                                        </ValidationProvider>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                            <sui-table-cell>
                                <v-date-picker
                                    v-model="employee.militaryEndDate"
                                    :model-config="DateUtil.dateModelConfig"
                                    :masks="DateUtil.masks">
                                    <template v-slot="{ inputValue, inputEvents }">
                                        <ValidationProvider
                                            v-slot="{errors}"
                                            :rules="`${isMilitaryEmpty() ? '' : 'required'}`">
                                            <sui-input
                                                size="small"
                                                :value="inputValue"
                                                v-on="inputEvents"
                                                icon="calendar alternate outline icon"
                                                placeholder="1970-01-01"
                                                fluid="fluid"
                                                maxlength="10"/>
                                            <span class="span-error-message">{{errors[0]}}</span>
                                        </ValidationProvider>
                                    </template>
                                </v-date-picker>
                            </sui-table-cell>
                            <sui-table-cell id="table-cell-dropdown">
                                <ValidationProvider
                                    v-slot="{errors}"
                                    :rules="`${isMilitaryEmpty() ? '' : 'required'}`">
                                    <sui-dropdown
                                        fluid="fluid"
                                        placeholder="계급"
                                        selection="selection"
                                        :options="dropdowns.F"
                                        v-model="employee.militaryRank"/>
                                    <span class="span-error-message">{{errors[0]}}</span>
                                </ValidationProvider>
                            </sui-table-cell>
                            <sui-table-cell>
                                <sui-input
                                    fluid="fluid"
                                    transparent="transparent"
                                    v-model="employee.reasonExemption"></sui-input>
                            </sui-table-cell>
                        </sui-table-row>
                    </sui-table-body>
                </sui-table>
            </div>
        </div>
      </ValidationObserver>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {DateUtil} from '@/util'
import {Education, License, Career, Family} from '~/model/'
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import '~/util/validationRules/EmployeeRules'
export default {
    name:'EmployeeInfoRetrieveView', 
    data: function () {
        return {
            DateUtil: DateUtil,
            tempImageUrl : ''
        }
    },
    components: {
        ValidationProvider,
        ValidationObserver
    },
    methods: {
        ...mapMutations(['setEmployeeInfoFormsCheck','setEmployeeImage']),
        updateEmployeeValid : async function (){
            let currentValid = await this.$refs.EmployeeInfoObserver.validate();
            this.setEmployeeInfoFormsCheck(currentValid);
        },
        plus: function (category) {
            switch (category) {
                case 'education':
                    {
                        if (this.employee.educationList.length < 5) {
                            this
                                .employee
                                .educationList
                                .push(new Education());
                        } else {
                            alert("최대 횟수를 초과하였습니다.")
                        }
                        break;
                    }
                case 'license':
                    {
                        if (this.employee.licenseList.length < 10) {
                            this
                                .employee
                                .licenseList
                                .push(new License());
                        } else {
                            alert("최대 횟수를 초과하였습니다.")
                        }
                        break;
                    }
                case 'career':
                    {
                        if (this.employee.careerList.length < 20) {
                            this
                                .employee
                                .careerList
                                .push(new Career());
                        } else {
                            alert("최대 횟수를 초과하였습니다.")
                        }
                        break;
                    }
                case 'family':
                    {
                        if (this.employee.familyList.length < 10) {
                            this.employee.familyList.push(new Family());
                        } else {
                            alert("최대 횟수를 초과하였습니다.")
                        }
                        break;
                    }
            }
        },
        minus: function (category) {
            if (confirm('입력하신 데이터가 손실될 수 있습니다.')) {
                switch (category) {
                    case 'education':
                        {
                            this.employee.educationList.pop();
                            break;
                        }
                    case 'license':
                        {
                            this.employee.licenseList.pop();
                            break;
                        }
                    case 'career':
                        {
                            this.employee.careerList.pop();
                            break;
                        }
                    case 'family':
                        {
                            this.employee.familyList.pop();
                            break;
                        }
                }
            }
        },
        isCanMinus: function (category) {
            switch (category) {
                case 'education':
                    {
                        return this.employee.educationList.length > 1
                    }
                case 'license':
                    {
                        return this.employee.licenseList.length > 1
                    }
                case 'career':
                    {
                        return this.employee.careerList.length > 1
                    }
                case 'family':
                    {
                        return this.employee.familyList.length > 1
                    }
            }
            return false
        },
        isEducationEmpty: function (index) {
            return !this.employee.educationList[index].school && 
                !this.employee.educationList[index].major && 
                !this.employee.educationList[index].graduation;
        },
        isLicenseEmpty: function (index) {
            return !this.employee.licenseList[index].kind && 
                !this.employee.licenseList[index].score && 
                !this.employee.licenseList[index].division && 
                !this.employee.licenseList[index].getDate;
        },
        isCareerEmpty: function (index) {
            return !this.employee.careerList[index].startDate && 
                !this.employee.careerList[index].endDate && 
                !this.employee.careerList[index].company && 
                !this.employee.careerList[index].position && 
                !this.employee.careerList[index].work;
        },
        isFamilyEmpty: function (index) {
            return !this.employee.familyList[index].relation && 
                !this.employee.familyList[index].name && 
                !this.employee.familyList[index].birthday;
        },
        isMilitaryEmpty: function () {
            return !this.employee.militaryStartDate && !this.employee.militaryEndDate && !this.employee.militaryRank;
        },
        onClickEmployeeInputBtn() {
            this.$refs.employeeInputImage.click();
        },
        onChangeImage(e) {
            const file = e.target.files[0];
            this.setEmployeeImage(file);
            this.imageUrl = URL.createObjectURL(file);
        },
    },
    computed: {
        ...mapGetters({
            employee: 'getTempEmployee',
            dropdowns: 'getDropdowns',
            employeeImage : 'getEmployeeImage',
        },),
        imageUrl :{
            get: function(){
                return this.employee.imageUrl ? this.employee.imageUrl : require('@/assets/images/defalut_image.png')
            },
            set: function(imageUrl){
                this.employee.imageUrl = imageUrl
            }
        },
    }
}
</script>

<style>

</style>