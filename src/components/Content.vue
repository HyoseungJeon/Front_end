<template>
<div id="content_form">
    <content-menu/>
    <router-view id="ContentRouter"/>
</div>
</template>

<script>
import ContentMenu from './ContentMenu.vue'

export default {
  name: 'Content',
  components: {
    ContentMenu
  }
}
</script>

<style>
  #content_form{
    padding-top: 20px;
    padding-left: 15px;
    padding-right: 20px;
  }
  
    .eirview-table-header {
        font-weight: bold;
        background: #F9FAFB;
        width: 120px;
        height: 60px;
    }
    .grid-container-employee-info-register-table-header {
        display: grid;
        grid-template-columns: 50% 50%;
        align-items: center;
        padding-bottom: 5px;
    }
    #eirview-image-form {
        text-align: center;
    }
    .eirview-body {
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .grid-container-employee-info-register-body-up {
        display: grid;
        grid-template-columns: 180px auto;
        grid-gap: 10px 10px;
    }
    .grid-container-employee-info-register-body-down {
        padding-top: 0;
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px 20px;
    }
    .item-career-body {
        grid-column-start: 1;
        grid-column-end: 3;
    }
    .icon-required {
        content: '*';
        color: #DB2828;
    }
    .icon-table-required {
        content: '*';
        color: black;
    }
    #table-cell-dropdown {
        overflow: visible;
    }
    .span-error-message {
        font-size: 0.9em;
        color: #DB2828;
    }
</style>
