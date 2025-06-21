export default {
  getData({
    commit,
    dispatch
  }, payload) {
    return this.$axios.get('/' + payload.url, {
        params: payload.params
      })
      .then(response => {
        commit('set_data', response.data.data)
        commit('set_raw_data', response.data)
        commit('set_result', true);
        dispatch("pagination/setPagination", response.data, {
          root: true
        })
      }).catch(error => {
        commit('set_result', false)
        commit('set_error', error)
      });
  },

  addData({
    commit,
    dispatch
  }, payload) {
    return this.$axios.post('/' + payload.url, payload.form)
      .then(response => {
        commit('set_result', true);
      }).catch(error => {
        commit('set_result', false)
        commit('set_error', error)
      })
  },

  updateData({
    commit,
    dispatch
  }, payload) {
    return this.$axios.put('/' + payload.url + '/' + payload.form.id, payload.form)
      .then(response => {
        commit('set_result', true);
      }).catch(error => {
        commit('set_result', false)
        commit('set_error', error)
      })
  },

  deleteData({
    commit,
    dispatch
  }, payload) {
    return this.$axios.delete('/' + payload.url + '/' + payload.id)
      .then(response => {
        commit('set_result', true);
      }).catch(error => {
        commit('set_result', false)
        commit('set_error', error)
      })
  },

  deleteAllData({
    commit,
    dispatch
  }, payload) {
    return this.$axios.delete("/" + payload.url + "/destroy-all", {
      data: {
        checkboxs: payload.checkboxs,
      }
    }).then(response => {
      commit('set_result', true)
    }).catch(error => {
      commit('set_result', false)
      commit('set_error', error)
    })
  },

  restoreData({
    commit,
    dispatch
  }, payload) {
    return this.$axios.post("/" + payload.url + "/restore/" + payload.id)
      .then(response => {
        commit('set_result', true)
      }).catch(error => {
        commit('set_result', false)
        commit('set_error', error)
      })
  },

  restoreAllData({
    commit,
    dispatch
  }, payload) {
    return this.$axios.post("/" + payload.url + "/restore-all", {
        checkboxs: payload.checkboxs
      })
      .then(response => {
        commit('set_result', true)
      }).catch(error => {
        commit('set_result', false)
        commit('set_error', error)
      })
  },

  getCode({
    commit,
    dispatch
  }, payload) {
    return this.$axios.get("/" + payload.url + "/get-code" + (payload.query || ''))
      .then(response => {
        commit('set_result', true);
        commit('set_code', response.data.code);
      }).catch(error => {
        commit('set_result', false)
        commit('set_error', error)
      })
  },

  lookUp({
    commit
  }, payload) {

    return this.$axios.get('/' + payload.url + (payload.query || ""))
      .then(response => {
        commit('set_result', true)
        switch (payload.lookup) {
          case 'roles':
            commit('set_lookup_roles', response.data)
            break;
          case 'group_roles':
            commit('set_lookup_group_roles', response.data)
            break;
          case 'sellers':
            commit('set_lookup_sellers', response.data)
            break;
          case 'suppliers':
            commit('set_lookup_suppliers', response.data);
            break;
          case 'product_spesifications':
            commit('set_lookup_product_spesifications', {
              data: response.data
            });
            break;
          case 'units':
            commit('set_lookup_units', {
              data: response.data
            });
            break;
          case "customer_groups":
            commit("set_lookup_customer_groups", {
              data: response.data
            });
            break;
          case 'customers':
            commit('set_lookup_customers', response.data)
            break;
          case 'products':
            commit('set_lookup_products', response.data)
            break;
          case 'quotations':
            commit('set_lookup_quotations', response.data);
            break;
          case 'po_customers':
            commit('set_lookup_po_customers', response.data);
            break;
          case 'po_suppliers':
            commit('set_lookup_po_suppliers', response.data);
            break;
          case 'purchaseings':
            commit('set_lookup_purchaseings', response.data);
            break;
          case 'warehouses':
            commit('set_lookup_warehouses', response.data);
            break;
          case 'purchaseing_returns':
            commit('set_lookup_purchaseing_returns', response.data);
            break;
          case 'sellings':
            commit('set_lookup_sellings', response.data);
            break;
          case 'users':
            commit('set_lookup_users', response.data);
            break;
          case 'product_groups':
            commit('set_lookup_product_groups', response.data);
            break;
          case 'product_properties':
            commit('set_lookup_product_properties', response.data);
            break;
          case 'resellers':
            commit('set_lookup_resellers', response.data);
            break;
          case 'product_materials':
            commit('set_lookup_product_materials', response.data);
            break;
          case 'work_orders':
            commit('set_lookup_work_orders', response.data);
            break;
          case 'productions':
            commit('set_lookup_productions', response.data);
            break;
          case 'material_requirements':
            commit('set_lookup_material_requirements', response.data);
            break;
          case 'parents':
            commit('set_lookup_parents', response.data);
            break;
          case 'chart_of_accounts':
            commit('set_lookup_chart_of_accounts', response.data);
            break;
          case 'chart_of_account_details':
            commit('set_lookup_chart_of_account_details', response.data);
            break;
          case 'chart_of_account_froms':
            commit('set_lookup_chart_of_account_froms', response.data);
            break;
          case 'chart_of_account_tos':
            commit('set_lookup_chart_of_account_tos', response.data);
            break;
          case 'proses':
            commit('set_lookup_proses', response.data);
            break;
          case 'regus':
            commit('set_lookup_regus', response.data);
            break;
          case 'pengawas':
            commit('set_lookup_pengawas', response.data);
            break;
          case 'mesin':
            commit('set_lookup_mesin', response.data);
            break;
          case 'operator':
            commit('set_lookup_operator', response.data);
            break;
          case 'defects':
            commit('set_lookup_defects', response.data);
            break;
          case 'proces':
            commit('set_lookup_proces', response.data);
            break;
          case 'department':
            commit('set_lookup_department', response.data);
            break;
          case 'custom1':
            commit('set_lookup_custom1', response.data);
            break;
          case 'custom2':
            commit('set_lookup_custom2', response.data);
            break;
          case 'grade':
            commit('set_lookup_grade', response.data);
            break;
          case 'beam':
            commit('set_lookup_beam', response.data);
            break;
          case 'custom3':
            commit('set_lookup_custom3', response.data);
            break;
          case 'packing':
            commit('set_lookup_packing', response.data);
            break;
          case 'location':
            commit('set_lookup_location', response.data);
            break;
        }
      }).catch(error => {
        commit('set_result', false)
        commit('set_error', error)
      })
  },
}
