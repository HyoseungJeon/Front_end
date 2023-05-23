<template>
    <div class="footer-main">
        <div class="footer-body">
          <img id="logo_form" src='@/assets/images/plateer_logo_inverted.png' width="175" height="45"/>
          <span>
            <span class="footer-span"> 
            PLATEER 주소 : 서울시 송파구 법원로9길 26 H Business Park D동 6층 Tel. 02-554-4668 Fax. 02-554-4583
            Copyright ⓒ 2020 PLATEER. All rights reserved.
            </span>
          </span>
        </div>
    </div>
</template>

<script>
export default {
    name:'FooterView', 
}
</script>

<style>
  .footer-main{
    background: #01191f;
    margin-top: 20px;
  }
  .footer-body{
    padding: 20px;
    padding-left: 60px;
    color: white;
    width: 100%;
    height: 150px;
    display: table-cell;
    vertical-align: middle;
  }
  .footer-span{
    font-size: 14px;
    line-height: 180%;
    font-weight: 500;
    margin: 10px;
  }
</style>