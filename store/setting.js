const state = () => ({
    settings    : [],    
    app_profile : {
      company_name : '',
      address : '',
      email : '',
      phone : '',
      logo : '',
      logo_print : '',
      header_color : '',
      tax : 0.00,
      footer_print_quotation : '',
      website : '',
      signature : '',
      signature_owner : '',
      is_min_stock : false,
      bank_name : '',
      bank_account : '',
      bank_no : '',
      limit_item_transaction : 0,
      product_group_material : "",
    },
})

const mutations = {
     SET_SETTINGS: (state,settings) => {
        state.settings = settings;
     },  
     SET_APP_PROFILE: (state,payload) => {
      if(payload && payload.length){
        payload.forEach(item => {          
          state.app_profile[item.name] = item.name == 'umk'  
            ? parseInt(item.value) 
            : item.value;
        });
      }    
   }, 
}

const actions = {
    async nuxtClientInit({commit},{app}) {
      try{   
        let response = await app.$axios.get("/get-setting");    

        commit("SET_SETTINGS",response.data);
        commit("SET_APP_PROFILE",response.data);
        
      }catch(err){
        console.log(err);
        commit("SET_SETTINGS",[]);
        commit("SET_APP_PROFILE",{});
      }
    },
    async setSetting({commit,dispatch},payload) {
      try{
        let response = await this.$axios.get("/get-setting");    
        commit("SET_SETTINGS",response.data)
      }catch(err){
        console.log(err);
        commit("SET_SETTINGS",[]);
      }
    },   
}

export default {
  namespaced : true,
  state,
  mutations,
  actions,
}