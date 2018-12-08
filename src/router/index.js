import Vue from 'vue'
import Router from 'vue-router'
import myReportQuery from '@/components/reportQuery/reportQuery'
import myVehicleCondition from '@/components/reportQuery/vehicleCondition/vehicleCondition'
import myKilometre from '@/components/reportQuery/kilometre/kilometre'
import myValuation from '@/components/reportQuery/valuation/valuation'
import myViolation from '@/components/reportQuery/violation/violation'
import mySubmitVehicleCondition from '@/components/submitVehicleCondition/submitVehicleCondition'
import mySubmitKilometre from '@/components/submitKilometre/submitKilometre'
import mySubmitValuation from '@/components/submitValuation/submitValuation'
import mySubmitViolation from '@/components/submitViolation/submitViolation'
import myOrder from '@/components/order/order'
import myVehicleConditionOrder from '@/components/order/vehicleConditionOrder/vehicleConditionOrder'
import myKilometreOrder from '@/components/order/kilometreOrder/kilometreOrder'
import myValuationOrder from '@/components/order/valuationOrder/valuationOrder'
import myViolationOrder from '@/components/order/violationOrder/violationOrder'
import myVehicleConditionOrderDetails from '@/components/vehicleConditionOrderDetails/vehicleConditionOrderDetails'
import myVehicleConditionReport from '@/components/vehicleConditionReport/vehicleConditionReport'
import myKilometreOrderDetails from '@/components/kilometreOrderDetails/kilometreOrderDetails'
import myKilometreReport from '@/components/kilometreReport/kilometreReport'
import myValuationOrderDetails from '@/components/valuationOrderDetails/valuationOrderDetails'
import myValuationReport from '@/components/valuationReport/valuationReport'
import myViolationOrderDetails from '@/components/violationOrderDetails/violationOrderDetails'
import myViolationReport from '@/components/violationReport/violationReport'
import myLogin from '@/components/login/login'
import myPersonalCenter from '@/components/personalCenter/personalCenter'
import myAddCar from '@/components/addCar/addCar'
import myStandardReport from '@/components/standardReport/standardReport'
import myFullReport from '@/components/fullReport/fullReport'
import myVINExample from '@/components/VINExample/VINExample'
import myDiscountCoupon from '@/components/discountCoupon/discountCoupon'
import myDisclaimer from '@/components/disclaimer/disclaimer'
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
      path:'/submitVehicleCondition',
      name:'submitVehicleCondition',
      component:mySubmitVehicleCondition
    },
    {
      path:'/submitKilometre',
      name:'submitKilometre',
      component:mySubmitKilometre
    },
    {
      path:'/submitValuation',
      name:'submitValuation',
      component:mySubmitValuation
    },
    {
      path:'/submitViolation',
      name:'submitViolation',
      component:mySubmitViolation
    },
    {
      path:'/discountCoupon',
      name:'discountCoupon',
      component:myDiscountCoupon
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
      path: '/vehicleConditionOrderDetails',
      name:'vehicleConditionOrderDetails',
      component: myVehicleConditionOrderDetails
    },
    {
      path: '/vehicleConditionReport',
      name:'vehicleConditionReport',
      component: myVehicleConditionReport
    },
    {
      path: '/kilometreOrderDetails',
      name:'kilometreOrderDetails',
      component: myKilometreOrderDetails
    },
    {
      path: '/kilometreReport',
      name:'kilometreReport',
      component: myKilometreReport
    },
    {
      path: '/valuationOrderDetails',
      name:'valuationOrderDetails',
      component: myValuationOrderDetails
    },
    {
      path: '/valuationReport',
      name:'valuationReport',
      component: myValuationReport
    },
    {
      path: '/violationOrderDetails',
      name:'violationOrderDetails',
      component: myViolationOrderDetails
    },
    {
      path: '/violationReport',
      name:'violationReport',
      component: myViolationReport
    },
    {
      path: '/login',
      name: 'login',
      component: myLogin
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: myPersonalCenter
    },
    {
      path: '/addCar',
      name: 'addCar',
      component: myAddCar
    },
    {
      path: '/standardReport',
      name: 'standardReport',
      component: myStandardReport
    },
    {
      path: '/fullReport',
      name: 'fullReport',
      component: myFullReport
    },
    {
      path: '/VINExample',
      name: 'VINExample',
      component: myVINExample
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: myDisclaimer
    },
    
  ]
})
