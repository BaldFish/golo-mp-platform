import Vue from 'vue'
import Router from 'vue-router'
import myReportQuery from '@/components/reportQuery/reportQuery'
import myVehicleCondition from '@/components/reportQuery/vehicleCondition/vehicleCondition'
import myKilometre from '@/components/reportQuery/kilometre/kilometre'
import myValuation from '@/components/reportQuery/valuation/valuation'
import myViolation from '@/components/reportQuery/violation/violation'
import myOrder from '@/components/order/order'
import myVehicleConditionOrder from '@/components/order/vehicleConditionOrder/vehicleConditionOrder'
import myKilometreOrder from '@/components/order/kilometreOrder/kilometreOrder'
import myValuationOrder from '@/components/order/valuationOrder/valuationOrder'
import myViolationOrder from '@/components/order/violationOrder/violationOrder'
import myPersonalCenter from '@/components/personalCenter/personalCenter'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/reportQuery"
    },
    {
      path: '/reportQuery',
      component: myReportQuery,
      children:[
        {
          path:'',
          redirect: '/reportQuery/vehicleCondition'
        },
        {
          path:'/reportQuery/vehicleCondition',
          name:'vehicleCondition',
          component: myVehicleCondition,
        },
        {
          path:'/reportQuery/kilometre',
          name:'kilometre',
          component: myKilometre,
        },
        {
          path:'/reportQuery/valuation',
          name:'valuation',
          component: myValuation,
        },
        {
          path:'/reportQuery/violation',
          name:'violation',
          component: myViolation,
        },
      ]
    },
    {
      path: '/order',
      component: myOrder,
      children:[
        {
          path:'',
          redirect: '/order/vehicleConditionOrder'
        },
        {
          path:'/order/vehicleConditionOrder',
          name:'vehicleConditionOrder',
          component: myVehicleConditionOrder,
        },
        {
          path:'/order/kilometreOrder',
          name:'kilometreOrder',
          component: myKilometreOrder,
        },
        {
          path:'/order/valuationOrder',
          name:'valuationOrder',
          component: myValuationOrder,
        },
        {
          path:'/order/violationOrder',
          name:'violationOrder',
          component: myViolationOrder,
        },
      ]
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: myPersonalCenter
    },
  ]
})
