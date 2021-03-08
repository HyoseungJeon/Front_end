<template>
    <div id="employee_menu_form">
        <sui-grid >
            <sui-grid-row>
                <sui-grid-column :width="10">
                    <v-date-picker
                        v-model="startDate"
                        :max-date="endDate"
                        :model-config="modelConfig">
                        <template v-slot="{ inputValue, inputEvents }">
                            <sui-input
                                size="small"
                                :value="inputValue"
                                v-on="inputEvents"
                                icon="calendar alternate outline icon"
                                placeholder="시작일"
                            />
                        </template>
                    </v-date-picker>
                
                    <sui-icon class="large" name="caret right" />
                    
                    <v-date-picker
                        v-model="endDate"
                        :min-date="startDate"
                        :model-config="modelConfig">
                        <template v-slot="{ inputValue, inputEvents }">
                            <sui-input
                                size="small"
                                :value="inputValue"
                                v-on="inputEvents"
                                icon="calendar alternate outline icon"
                                placeholder="종료일"/>
                        </template>
                    </v-date-picker>
                    <sui-button icon="search" type="button" @click="ListByDate"/>
                </sui-grid-column>

                <sui-grid-column :width="3">
                    <div class="ui action input">
                        <sui-input type="text" placeholder="이름" v-model="name"/>
                        <div class="ui blue button" @click="ListByName">검색</div>
                    </div>
                </sui-grid-column>
                <sui-grid-column :width="3">
                    <sui-button floated="right" content="조건별검색"/>  
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
        <sui-divider />
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'EmployeeMenuView',
        data: function () {
            return {
                startDate: null,
                endDate: null,
                name: null,
                modelConfig: {
                    type: 'string',
                    mask: 'YYYY-MM-DD'
                }
            }
        },
        methods: {
            ...mapActions(['list']),
            ListByDate: function () {
                this.list({startDate: this.startDate, endDate: this.endDate});
            },
            ListByName: function () {
                this.list({name: this.name});
            }
        }
    }
</script>

<style>
    #employee_menu_form {
        padding-top: 10px;
    }
</style>