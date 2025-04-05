import initialState from "./initial.value";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Product_list":
      return { ...state, product_list: action.payload };
    case "Dashbaord_RecentProduct":
      return { ...state, dashboard_recentproduct: action.payload };
    case "Dashbaord_ExpiredProduct":
      return { ...state, dashboard_expiredproduct: action.payload };
    case "Salesdashbaord_ExpiredProduct":
      return { ...state, saleshdashboard_recenttransaction: action.payload };
    case "Brand_list":
      return { ...state, brand_list: action.payload };

    case "Unit_Data":
      return { ...state, unit_data: action.payload };
    case "Variantattribute_Data":
      return { ...state, variantattributes_data: action.payload };
    case "Warranty_Data":
      return { ...state, warranty_data: action.payload };
    case "Barcode_Data":
      return { ...state, barcode_data: action.payload };
    case "Department_Data":
      return { ...state, departmentlist_data: action.payload };
    case "Designation_Data":
      return { ...state, designation_data: action.payload };
    case "Shiftlist_Data":
      return { ...state, shiftlist_data: action.payload };
    case "Attendenceemployee_Data":
      return { ...state, attendenceemployee_data: action.payload };
    case "toggle_header":
      return { ...state, toggle_header: action.payload };
    case "Invoicereport_Data":
      return { ...state, invoicereport_data: action.payload };
    case "Salesreturns_Data":
      return { ...state, salesreturns_data: action.payload };
    case "Quatation_Data":
      return { ...state, quotationlist_data: action.payload };
    case "customer_data":
      return { ...state, customerdata: action.payload };
    case "Userlist_data":
      return { ...state, userlist_data: action.payload };
    case "Rolesandpermission_data":
      return { ...state, rolesandpermission_data: action.payload };
    case "Deleteaccount_data":
      return { ...state, deleteaccount_data: action.payload };
    case "Attendenceadmin_data":
      return { ...state, attendanceadmin_data: action.payload };
    case "Leavesadmin_data":
      return { ...state, leavesadmin_data: action.payload };
    case "Leavestype_data":
      return { ...state, leavetypes_data: action.payload };
    case "Holiday_data":
      return { ...state, holiday_data: action.payload };
    case "Expiredproduct_data":
      return { ...state, expiredproduct_data: action.payload };
    case "Lowstock_data":
      return { ...state, lowstock_data: action.payload };
    case "Categotylist_data":
      return { ...state, categotylist_data: action.payload };
    case "Layoutstyle_data":
      return { ...state, layoutstyledata: action.payload };
      case "Financial_Table":
      return { ...state, Financial_Table: action.payload };
      case "RESET_FinancialTable_DATA":
      return { ...state, Financial_Table:initialState.Financial_Table };
      case "billsundry_data":
      return { ...state, billsundry_data: action.payload };
      case "RESET__Billsundry_Data":
      return { ...state, billsundry_data:initialState.billsundry_data };
      case "SET_FORM_DATA":
      return {
        ...state,
        Financial_Table: action.payload.financialtabledata || state.Financial_Table,
        billsundry_data: action.payload.billsundryData || state.billsundry_data,
        form_data: action.payload.formData || state.form_data
      };
      case "RESET_FORM_DATA":
        return {
          ...state,
          Financial_Table: initialState.Financial_Table,
          billsundry_data: initialState.billsundry_data,
          form_data:initialState.form_data
        };
      // case "billsundry_data":
      //   return {  ...state,
      //     fields: action.payload.fields,
      //     total: action.payload.total,};
      //   case "RESET__Billsundry_Data":
      //   return { ...state, billsundry_data:initialState.billsundry_data };
    default:
      return state;
  }
};

export default rootReducer;
