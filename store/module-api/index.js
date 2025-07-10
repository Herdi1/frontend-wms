import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = {
    data: [],
    raw_data: {},
    error: "",
    result: "",
    code: "",
    lookup_roles: {
        data: [],
        current_page: 1,
    },
    // lookup_roles_2: {
    //   data: [],
    //   current_page: 1,
    // },
    lookup_group_roles: {
        data: [],
        current_page: 1,
    },
    lookup_sellers: {
        data: [],
        current_page: 1,
    },
    lookup_customer_groups: {
        data: [],
        current_page: 1,
    },
    lookup_suppliers: {
        data: [],
        current_page: 1,
    },
    lookup_customers: {
        data: [],
        current_page: 1,
    },
    lookup_products: {
        data: [],
        current_page: 1,
    },
    lookup_quotations: {
        data: [],
        current_page: 1,
    },
    lookup_po_customers: {
        data: [],
        current_page: 1,
    },
    lookup_po_suppliers: {
        data: [],
        current_page: 1,
    },
    lookup_purchaseings: {
        data: [],
        current_page: 1,
    },
    lookup_warehouses: {
        data: [],
        current_page: 1,
    },
    lookup_sellings: {
        data: [],
        current_page: 1,
    },
    lookup_purchaseing_returns: {
        data: [],
        current_page: 1,
    },
    lookup_product_spesifications: {
        data: [],
        current_page: 1,
    },
    lookup_units: {
        data: [],
        current_page: 1,
    },
    lookup_customer_groups: {
        data: [],
        current_page: 1,
    },
    lookup_users: {
        data: [],
        current_page: 1,
    },
    lookup_product_groups: {
        data: [],
        current_page: 1,
    },
    lookup_product_properties: {
        data: [],
        current_page: 1,
    },
    lookup_resellers: {
        data: [],
        current_page: 1,
    },
    lookup_product_materials: {
        data: [],
        current_page: 1,
    },
    lookup_work_orders: {
        data: [],
        current_page: 1,
    },
    lookup_productions: {
        data: [],
        current_page: 1,
    },
    lookup_material_requirements: {
        data: [],
        current_page: 1,
    },
    lookup_parents: {
        data: [],
        current_page: 1,
    },
    lookup_chart_of_accounts: {
        data: [],
        current_page: 1,
    },
    lookup_chart_of_account_details: {
        data: [],
        current_page: 1,
    },
    lookup_chart_of_account_froms: {
        data: [],
        current_page: 1,
    },
    lookup_chart_of_account_tos: {
        data: [],
        current_page: 1,
    },
    lookup_regus: {
        data: [],
        current_page: 1,
    },
    lookup_pengawas: {
        data: [],
        current_page: 1,
    },
    lookup_mesin: {
        data: [],
        current_page: 1,
    },
    lookup_operator: {
        data: [],
        current_page: 1,
    },
    lookup_defects: {
        data: [],
        current_page: 1,
    },
    lookup_proces: {
        data: [],
        current_page: 1,
    },
    lookup_department: {
        data: [],
        current_page: 1,
    },
    lookup_custom1: {
        data: [],
        current_page: 1,
    },
    lookup_custom2: {
        data: [],
        current_page: 1,
    },
    lookup_grade: {
        data: [],
        current_page: 1,
    },
    lookup_beam: {
        data: [],
        current_page: 1,
    },
    lookup_custom3: {
        data: [],
        current_page: 1,
    },
    lookup_packing: {
        data: [],
        current_page: 1,
    },
    lookup_location: {
        data: [],
        current_page: 1,
    },
    lookup_custom4: {
        data: [],
        current_page: 1,
    },
    lookup_custom5: {
        data: [],
        current_page: 1,
    },
    lookup_custom6: {
        data: [],
        current_page: 1,
    },
    lookup_custom7: {
        data: [],
        current_page: 1,
    },
    lookup_custom8: {
        data: [],
        current_page: 1,
    },
    lookup_custom9: {
        data: [],
        current_page: 1,
    },
    lookup_custom10: {
        data: [],
        current_page: 1,
    },
};

const state = defaultState;

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
};