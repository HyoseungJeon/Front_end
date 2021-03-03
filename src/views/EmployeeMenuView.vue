<template>
    <div>
        <sui-form>
            <sui-form-fields>
                <sui-form-field width="three">
                    <v-date-picker v-model="startDate" :model-config="modelConfig">
                        <template v-slot="{ inputValue, inputEvents }">
                            <sui-input
                                size="small"
                                :value="inputValue"
                                v-on="inputEvents"
                                icon="calendar alternate outline icon"
                                placeholder="입사일"/>
                        </template>
                    </v-date-picker>
                </sui-form-field>

                <sui-form-field width="three">
                        <v-date-picker v-model="endDate" :model-config="modelConfig">
                        <template v-slot="{ inputValue, inputEvents }">
                            <sui-input
                                size="small"
                                :value="inputValue"
                                v-on="inputEvents"
                                icon="calendar alternate outline icon"
                                placeholder="퇴사일"/>
                        </template>
                    </v-date-picker>
                </sui-form-field>

                <sui-form-field width="one">
                    <sui-button floated="left" icon="search" type="button" @click="ListByDate"/>
                </sui-form-field>

                <sui-form-field width="six">
                    <div class="ui left icon action input">
                        <i class="search icon"></i>
                        <sui-input type="text" placeholder="이름" v-model="name"/>
                        <div class="ui blue button" @click="ListByName">검색</div>
                    </div>
                </sui-form-field>

                <sui-form-field width="four">
                    <sui-button floated="right" content="조건별검색"/>
                </sui-form-field>
            </sui-form-fields>
        </sui-form>
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

            ListByDate : function () {
               this.list({startDate: this.startDate, endDate: this.endDate});
            },

            ListByName : function () {
                this.list({name: this.name});
            }
        }
    }
</script>

<style>
</style>