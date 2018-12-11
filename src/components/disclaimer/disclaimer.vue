<template>
  <div class="disclaimer">
    <p>「轱辘车联」报告免责声明</p>
    <div class="content">
      <p><span>1.</span>本报告所包含内容及判断，仅基于截止到报告购买日期轱辘车联收集到的相关数据信息。关于此车辆其他信息（包括但不限于在非4S店或非制造商授权店的维修保养信息）有可能未被采集和收录，本报告仅是二手车交易的参考资料之一，请结合实车勘验结果和试乘试驾体验，做出更准确的交易决策。您应自行谨慎判断确定信息的真实性、合法性和有效性，并自行承担因此产生的责任与损失。
      </p>
      <p><span>2.</span>本报告仅呈现轱辘车联所能得到的数据信息，但并不提供任何形式的明示或者暗示的担保。在任何情况下，参与制作、生产或发布本报告的个人或实体，都没有责任和义务承担用户购买报告后签订的销售合同所造成的各类损失，以及利用报告所造成的任何侵权（包括自身疏忽）伤害。这些损失及伤害，包括但不限于直接的，间接的，附带的，特殊的，惩罚性的，间接的，或类似的损害赔偿。
      </p>
      <p><span>3.</span>本报告的制作、生产或发布者无义务处理您与第三方因交易产生的争议，任何争议由您与第三方自行协商解决。</p>
      <p><span>4.</span>本报告不对因下述任一情况而导致您的任何损害赔偿承担责任，包括但不限于利润、商誉、使用、数据等方面的损失或其它无形损失的损害赔偿：</p>
      <ul>
        <li><p>A.通过购买或获取任何数据、信息或进行交互等行为或替代行为产生的费用及损失。</p></li>
        <li><p>B.您对本报告的误解。</p></li>
        <li><p>C.任何非因本报告原因而引起的其它损失</p></li>
      </ul>
      <p><span>5.</span>轱辘车联对您承担的赔偿责任不超过您为购买本报告所支付的款项。本报告的制作、生产或发布者及上述单位的股东、董事、管理人员、员工和代理商对您在使用报告以外的行为中造成的损失不承担任何法律责任。</p>
      <p><span>6.</span>本免责声明为《轱辘车联注册使用协议》的重要组成部分，与《轱辘车联注册使用协议》正文具备同等法律效力。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "disclaimer",
    components: {},
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {},
  }
</script>

<style scoped lang="stylus">
  .disclaimer {
    padding-left 22px
    padding-right 22px
    p{
      color: #222222;
      font-size 30px;/*px*/
      line-height: 1.6;
      text-align center
    }
    .content {
      margin-bottom 50px
      p {
        text-align left
        color: #666666;
        font-size 24px;/*px*/
        line-height: 1.6;
        margin-bottom: 10px;
      }
      li{
        margin-left 48px
      }
    }
  }
</style>
