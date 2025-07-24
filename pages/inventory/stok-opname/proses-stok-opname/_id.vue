<template>
  <div></div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { mapActions, mapState } from "vuex";
export default {
  props: ["self"],

  data() {
    let id = parseInt(this.$route.params.id);

    return {
      id,

      // isStopSearchUser: false,
      // isLoadingGetUser: false,
      // user_search: "",

      // isStopSearchJabatan: false,
      // isLoadingGetJabatan: false,
      // jabatan_search: "",

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      // isStopSearchItem: false,
      // isLoadingGetItem: false,
      // item_search: "",

      isStopSearchItemZonaGudang: false,
      isLoadingGetItemZonaGudang: false,
      zonaGudang_search: "",

      isStopSearchSlotAisle: false,
      isLoadingGetSlotAisle: false,
      slot_aisle_search: "",

      isStopSearchSlotRack: false,
      isLoadingGetSlotRack: false,
      slot_rack_search: "",

      isStopSearchSlotLevel: false,
      isLoadingGetSlotLevel: false,
      slot_level_search: "",

      isStopSearchSlotBin: false,
      isLoadingGetSlotBin: false,
      slot_bin_search: "",

      isStopSearchItemGudang: false,
      isLoadingGetItemGudang: false,
      itemGudang_search: "",

      isStopSearchValuation: false,
      isLoadingGetValuation: false,
      valuation_search: "",

      // isStopSearchItemPelanggan: false,
      // isLoadingGetItemPelanggan: false,
      // itemPelanggan_search: "",

      // isStopSearchSupplier: false,
      // isLoadingGetSupplier: false,
      // supplier_search: "",

      isEditable: Number.isInteger(id) ? true : false,
      isLoadingPage: Number.isInteger(id) ? true : false,
      isLoadingForm: false,
      title: "Stok Opname",
      parameters: {
        url: "inventory/stok-opname",
        form: {
          tanggal: "",
          gudang_id: "",
          keterangan: "",
          stok_opname_details: [],

          //Tracking
          user_agent: "",
          device: "",
          longitude: "",
          latitude: "",
        },
      },
    };
  },

  async created() {
    try {
      if (this.isEditable) {
        let res = await this.$axios.get(`inventory/stok-opname/${this.id}`);
        Object.keys(this.parameters.form).forEach((item) => {
          if (item != "stok_opname_details") {
            this.parameters.form[item] = res.data[item];
          }
        });
        this.parameters.form.gudang_id = res.data.gudang;

        this.parameters.form.stok_opname_details =
          res.data.stok_opname_details.map((item) => {
            return {
              ...item,
              stok_opname_details_id: item.stok_opname_details_id,
              item_gudang_id: item.item_gudang,
              zona_gudang_id: item.zona_gudang,
              valuation_id: item.valuation,
              slot_penyimpanan_id_aisle: item.slot_penyimpanan_aisle,
              slot_penyimpanan_id_rack: item.slot_penyimpanan_rack,
              slot_penyimpanan_id_level: item.slot_penyimpanan_level,
              slot_penyimpanan_id_bin: item.slot_penyimpanan_bin,
            };
          });
        this.isLoadingPage = false;
      }
    } catch (error) {
      console.log("error", error);
      //this.$router.back()
    }
  },

  async mounted() {
    // await this.onSearchUser();
    // await this.onSearchJabatan();
    await this.onSearchGudang();

    // await this.onSearchItem();
    await this.onSearchItemGudang();
    // await this.onSearchItemPelanggan();
    // await this.onSearchSupplier();
    await this.onSearchValuation();
    await this.onSearchZonaGudang();
    await this.onSearchSlotAisle();
    await this.onSearchSlotRack();
    await this.onSearchSlotLevel();
    await this.onSearchSlotBin();

    this.getUserAgent();
    this.getGeoLocation();
  },

  computed: {
    ...mapState("moduleApi", [
      "error",
      "result",
      "lookup_custom1", //gudang
      // "lookup_custom2", //item
      "lookup_custom3", //zona gudang
      "lookup_custom4", //slot aisle
      "lookup_custom5", //slot rack
      "lookup_custom6", //slot level
      "lookup_custom7", //slot bin
      "lookup_custom8", //item gudang
      "lookup_custom9", //valuation
      // "lookup_custom10", //item pelanggan
      // "lookup_suppliers", //supplier
    ]),
  },

  methods: {
    ...mapActions("moduleApi", ["addData", "updateData", "lookUp"]),

    getUserAgent() {
      this.parameters.form.user_agent = navigator.userAgent;
      if (this.parameters.form.user_agent.includes("Mobile")) {
        this.form.device = "Mobile";
      } else if (this.parameters.form.user_agent.includes("Tablet")) {
        this.parameters.form.device = "Tablet";
      } else {
        this.parameters.form.device = "Desktop";
      }
    },

    getGeoLocation() {
      if ("geolocation" in navigator) {
        this.isLoadingForm = true;

        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.parameters.form.longitude =
              position.coords.longitude.toString();
            this.parameters.form.latitude = position.coords.latitude.toString();
            this.isLoadingForm = false;
          },
          (error) => {
            this.isLoadingForm = false;
            this.$toaster.error(error.message);
          }
        );
      } else {
        this.$toaster.error("geolocation not supported");
      }
    },

    // updateStokSelisih(item) {
    //   this.$nextTick(() => {
    //     const stokReal = parseFloat(item.stok_real) || 0;
    //     const stokSistem = parseFloat(item.stok_sistem) || 0;
    //     item.stok_selisih = stokReal - stokSistem;
    //   });
    // },

    async onSubmit(isInvalid) {
      if (isInvalid || this.isLoadingForm) return;
      this.isLoadingForm = true;
      let url = "inventory/stok-opname";
      let formData = {
        ...this.parameters.form,
        gudang_id:
          typeof this.parameters.form.gudang_id == "object"
            ? this.parameters.form.gudang_id.gudang_id
            : this.parameters.form.gudang_id,
        stok_opname_details: this.parameters.form.stok_opname_details.map(
          (item) => {
            return {
              ...item,
              stok_opname_details_id: item.stok_opname_details_id
                ? item.stok_opname_details_id
                : "",
              item_gudang_id:
                typeof item.item_gudang_id === "object"
                  ? item.item_gudang_id.item_gudang_id
                  : item.item_gudang_id,
              item_id:
                typeof item.item_gudang_id === "object"
                  ? item.item_gudang_id.item_id
                  : item.item_id,
              slot_penyimpanan_id_aisle:
                typeof item.slot_penyimpanan_id_aisle === "object"
                  ? item.slot_penyimpanan_id_aisle.slot_penyimpanan_id
                  : item.slot_penyimpanan_id_aisle,
              slot_penyimpanan_id_bin:
                typeof item.slot_penyimpanan_id_bin === "object"
                  ? item.slot_penyimpanan_id_bin.slot_penyimpanan_id
                  : item.slot_penyimpanan_id_bin,
              slot_penyimpanan_id_level:
                typeof item.slot_penyimpanan_id_level === "object"
                  ? item.slot_penyimpanan_id_level.slot_penyimpanan_id
                  : item.slot_penyimpanan_id_level,
              slot_penyimpanan_id_rack:
                typeof item.slot_penyimpanan_id_rack === "object"
                  ? item.slot_penyimpanan_id_rack.slot_penyimpanan_id
                  : item.slot_penyimpanan_id_rack,
              valuation_id:
                typeof item.valuation_id === "object"
                  ? item.valuation_id.valuation_id
                  : item.valuation_id,
              zona_gudang_id:
                typeof item.zona_gudang_id === "object"
                  ? item.zona_gudang_id.zona_gudang_id
                  : item.zona_gudang_id,
            };
          }
        ),
      };

      if (this.isEditable) {
        url += "/" + this.id;
      }

      this.$axios({
        method: this.isEditable ? "PUT" : "POST",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success(
            "Data berhasil di " + (this.isEditable ? "Diedit" : "Tambah")
          );
          if (!this.isEditable) {
            this.parameters.form = {
              tanggal: "",
              gudang_id: "",
              keterangan: "",
              stok_opname_details: [],

              //Tracking
              user_agent: "",
              device: "",
              longitude: "",
              latitude: "",
            };
          }
          this.$router.back();
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
          // this.formValidate.reset();
        });
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom1.current_page = isNext
            ? this.lookup_custom1.current_page + 1
            : this.lookup_custom1.current_page - 1;
        } else {
          this.lookup_custom1.current_page = 1;
        }
        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang",
          lookup: "custom1",
          query:
            "?search=" +
            this.gudang_search +
            "&page=" +
            this.lookup_custom1.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGudang = false;
      }
    },

    onSelectGudang(item) {
      if (item) {
        // this.parameters.form.gudang_id = item;
        this.parameters.form.stok_opname_details.forEach((_, index) => {
          this.onGetSystemStok(index);
        });
      } else {
        this.parameters.form.gudang_id = "";
      }
    },

    AddDetailItem() {
      this.parameters.form.stok_opname_details.push({
        item_id: "",
        // item_pelanggan_id: "",
        item_gudang_id: "",
        // supplier_id: "",
        valuation_id: "",
        zona_gudang_id: "",
        slot_penyimpanan_id_aisle: "",
        slot_penyimpanan_id_rack: "",
        slot_penyimpanan_id_level: "",
        slot_penyimpanan_id_bin: "",
        stok_real: 0.0,
        stok_sistem: 0.0,
        stok_selisih: 0.0,
        keterangan: "",
      });
    },

    onDeleteItem(index) {
      this.parameters.form.stok_opname_details =
        this.parameters.form.stok_opname_details.filter(
          (_, itemIndex) => index !== itemIndex
        );
    },

    // onGetItem(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return;

    //   clearTimeout(this.isStopSearchItem);

    //   this.isStopSearchItem = setTimeout(() => {
    //     this.item_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_custom2.current_page = isNext
    //         ? this.lookup_custom2.current_page + 1
    //         : this.lookup_custom2.current_page - 1;
    //     } else {
    //       this.lookup_custom2.current_page = 1;
    //     }
    //     this.onSearchItem();
    //   }, 600);
    // },

    // async onSearchItem() {
    //   if (!this.isLoadingGetItem) {
    //     this.isLoadingGetItem = true;

    //     await this.lookUp({
    //       url: "master/item/get-item",
    //       lookup: "custom2",
    //       query:
    //         "?search=" +
    //         this.item_search +
    //         "&page=" +
    //         this.lookup_custom2.current_page +
    //         "&per_page=10",
    //     });
    //     this.isLoadingGetItem = false;
    //   }
    // },

    onGetZonaGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchZonaGudang);

      this.isStopSearchZonaGudang = setTimeout(() => {
        this.zonaGudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom3.current_page = isNext
            ? this.lookup_custom3.current_page + 1
            : this.lookup_custom3.current_page - 1;
        } else {
          this.lookup_custom3.current_page = 1;
        }
        this.onSearchZonaudang();
      }, 600);
    },

    async onSearchZonaGudang() {
      if (!this.isLoadingGetZonaGudang) {
        this.isLoadingGetZonaGudang = true;

        await this.lookUp({
          url: "master/zona-gudang/get-zona-gudang",
          lookup: "custom3",
          query:
            "?search=" +
            this.zonaGudang_search +
            "&page=" +
            this.lookup_custom3.current_page +
            "&per_page=10",
        });
        this.isLoadingGetZonaGudang = false;
      }
    },

    onGetSlotAisle(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotAisle);

      this.isStopSearchSlotAisle = setTimeout(() => {
        this.slot_aisle_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom4.current_page = isNext
            ? this.lookup_custom4.current_page + 1
            : this.lookup_custom4.current_page - 1;
        } else {
          this.lookup_custom4.current_page = 1;
        }

        this.onSearchSlotAisle();
      }, 600);
    },

    async onSearchSlotAisle() {
      if (!this.isLoadingGetSlotAisle) {
        this.isLoadingGetSlotAisle = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom4",
          query:
            "?search=" +
            this.slot_aisle_search +
            "&level=1" +
            "&page=" +
            this.lookup_custom4.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotAisle = false;
      }
    },

    onGetSlotRack(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotRack);

      this.isStopSearchSlotRack = setTimeout(() => {
        this.slot_rack_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom5.current_page = isNext
            ? this.lookup_custom5.current_page + 1
            : this.lookup_custom5.current_page - 1;
        } else {
          this.lookup_custom5.current_page = 1;
        }

        this.onSearchSlotRack();
      }, 600);
    },

    async onSearchSlotRack() {
      if (!this.isLoadingGetSlotRack) {
        this.isLoadingGetSlotRack = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom5",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=2" +
            "&page=" +
            this.lookup_custom5.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotRack = false;
      }
    },

    onGetSlotLevel(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotLevel);

      this.isStopSearchSlotLevel = setTimeout(() => {
        this.slot_level_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom6.current_page = isNext
            ? this.lookup_custom6.current_page + 1
            : this.lookup_custom6.current_page - 1;
        } else {
          this.lookup_custom6.current_page = 1;
        }

        this.onSearchSlotLevel();
      }, 600);
    },

    async onSearchSlotLevel() {
      if (!this.isLoadingGetSlotLevel) {
        this.isLoadingGetSlotLevel = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom6",
          query:
            "?search=" +
            this.slot_rack_search +
            "&level=3" +
            "&page=" +
            this.lookup_custom6.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotLevel = false;
      }
    },

    onGetSlotBin(search, isNext) {
      if (!search.length && typeof isNext === "function") return false;

      clearTimeout(this.isStopSearchSlotBin);

      this.isStopSearchSlotBin = setTimeout(() => {
        this.slot_bin_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom7.current_page = isNext
            ? this.lookup_custom7.current_page + 1
            : this.lookup_custom7.current_page - 1;
        } else {
          this.lookup_custom7.current_page = 1;
        }

        this.onSearchSlotBin();
      }, 600);
    },

    async onSearchSlotBin() {
      if (!this.isLoadingGetSlotBin) {
        this.isLoadingGetSlotBin = true;

        await this.lookUp({
          url: "master/slot-penyimpanan/get-slot-penyimpanan",
          lookup: "custom7",
          query:
            "?search=" +
            this.slot_bin_search +
            "&level=4" +
            "&page=" +
            this.lookup_custom7.current_page +
            "&per_page=10",
        });

        this.isLoadingGetSlotBin = false;
      }
    },

    onGetItemGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchItemGudang);

      this.isStopSearchItemGudang = setTimeout(() => {
        this.itemGudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom8.current_page = isNext
            ? this.lookup_custom8.current_page + 1
            : this.lookup_custom8.current_page - 1;
        } else {
          this.lookup_custom8.current_page = 1;
        }
        this.onSearchItemGudang();
      }, 600);
    },

    async onSearchItemGudang() {
      if (!this.isLoadingGetItemGudang) {
        this.isLoadingGetItemGudang = true;

        await this.lookUp({
          url: "master/item-gudang/get-item-gudang",
          lookup: "custom8",
          query:
            "?search=" +
            this.itemGudang_search +
            "&gudang_id=" +
            this.parameters.form.gudang_id +
            "&page=" +
            this.lookup_custom8.current_page +
            "&per_page=10",
        });
        this.isLoadingGetItemGudang = false;
      }
    },

    onGetValuation(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchValuation);

      this.isStopSearchValuation = setTimeout(() => {
        this.valuation_search = search;

        if (typeof isNext !== "function") {
          this.lookup_custom9.current_page = isNext
            ? this.lookup_custom9.current_page + 1
            : this.lookup_custom9.current_page - 1;
        } else {
          this.lookup_custom9.current_page = 1;
        }
        this.onSearchValuation();
      }, 600);
    },

    async onSearchValuation() {
      if (!this.isLoadingGetValuation) {
        this.isLoadingGetValuation = true;

        await this.lookUp({
          url: "master/valuation/get-valuation",
          lookup: "custom9",
          query:
            "?search=" +
            this.valuation_search +
            "&page=" +
            this.lookup_custom9.current_page +
            "&per_page=10",
        });
        this.isLoadingGetValuation = false;
      }
    },

    // onGetItemPelanggan(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return;

    //   clearTimeout(this.isStopSearchItemPelanggan);

    //   this.isStopSearchItemPelanggan = setTimeout(() => {
    //     this.itemPelanggan_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_custom10.current_page = isNext
    //         ? this.lookup_custom10.current_page + 1
    //         : this.lookup_custom10.current_page - 1;
    //     } else {
    //       this.lookup_custom10.current_page = 1;
    //     }
    //     this.onSearchItemPelanggan();
    //   }, 600);
    // },

    // async onSearchItemPelanggan() {
    //   if (!this.isLoadingGetItemPelanggan) {
    //     this.isLoadingGetItemPelanggan = true;

    //     await this.lookUp({
    //       url: "master/item-pelanggan/get-item-pelanggan",
    //       lookup: "custom10",
    //       query:
    //         "?search=" +
    //         this.itemPelanggan_search +
    //         "&page=" +
    //         this.lookup_custom9.current_page +
    //         "&per_page=10",
    //     });
    //     this.isLoadingGetItemPelanggan = false;
    //   }
    // },

    // onGetSupplier(search, isNext) {
    //   if (!search.length && typeof isNext === "function") return;

    //   clearTimeout(this.isStopSearchSupplier);

    //   this.isStopSearchSupplier = setTimeout(() => {
    //     this.supplier_search = search;

    //     if (typeof isNext !== "function") {
    //       this.lookup_suppliers.current_page = isNext
    //         ? this.lookup_suppliers.current_page + 1
    //         : this.lookup_suppliers.current_page - 1;
    //     } else {
    //       this.lookup_suppliers.current_page = 1;
    //     }
    //     this.onSearchSupplier();
    //   }, 600);
    // },

    // async onSearchSupplier() {
    //   if (!this.isLoadingGetSupplier) {
    //     this.isLoadingGetSupplier = true;

    //     await this.lookUp({
    //       url: "master/supplier/get-supplier",
    //       lookup: "suppliers",
    //       query:
    //         "?search=" +
    //         this.supplier_search +
    //         "&page=" +
    //         this.lookup_suppliers.current_page +
    //         "&per_page=10",
    //     });
    //     this.isLoadingGetSupplier = false;
    //   }
    // },
    onSelectItem(index) {
      let details = [...this.parameters.form.stok_opname_details];

      let itemDetail = {
        ...this.parameters.form.stok_opname_details[index],
      };

      if (!itemDetail.item_gudang_id) {
        this.parameters.form.stok_opname_details[index].item_gudang_id = "";
        return;
      }

      let itemGudang = itemDetail.item_gudang_id;

      let itemGudangs = details.filter(
        (item) =>
          (item.item_gudang_id ? item.item_gudang_id.item_gudang_id : 0) ===
          itemGudang.item_gudang_id
      );

      if (itemGudangs.length > 1) {
        this.$toaster.error("Item gudang sudah ada");
        this.parameters.form.stok_opname_details = details.filter(
          (_, indexItem) => index != indexItem
        );
      } else {
        this.onGetSystemStok(index);
      }
    },

    onChangeStok(index) {
      this.parameters.form.stok_opname_details[index].stok_selisih =
        this.parameters.form.stok_opname_details[index].stok_real -
        this.parameters.form.stok_opname_details[index].stok_sistem;
    },

    onGetSystemStok(index) {
      // let gudang_id = this.parameters.form.gudang_id;
      let item_gudang_id =
        this.parameters.form.stok_opname_details[index].item_gudang_id;
      let zona_gudang_id =
        this.parameters.form.stok_opname_details[index].zona_gudang_id;
      let valuation_id =
        this.parameters.form.stok_opname_details[index].valuation_id;
      let aisle =
        this.parameters.form.stok_opname_details[index]
          .slot_penyimpanan_id_aisle;
      let rack =
        this.parameters.form.stok_opname_details[index]
          .slot_penyimpanan_id_rack;
      let level =
        this.parameters.form.stok_opname_details[index]
          .slot_penyimpanan_id_level;
      let bin =
        this.parameters.form.stok_opname_details[index].slot_penyimpanan_id_bin;

      if (
        typeof this.parameters.form.gudang_id == "object" &&
        typeof item_gudang_id == "object"
      ) {
        this.parameters.form.stok_opname_details[index].stok_sistem = 0.0;
        this.onChangeStok(index);
        this.$axios
          .get(
            `/inventory/stok_opname/get-stock/${this.parameters.form.gudang_id.gudang_id}/${item_gudang_id.item_gudang_id}/${zona_gudang_id.zona_gudang_id}/${valuation_id.valuation_id}?slot_penyimpanan_id_aisle=${aisle.slot_penyimpanan_id}&slot_penyimpanan_id_bin=${bin.slot_penyimpanan_id}&slot_penyimpanan_id_level=${level.slot_penyimpanan_id}&slot_penyimpanan_id_rack=${rack.slot_penyimpanan_id}`
          )
          .then((res) => {
            if (res.data) {
              this.parameters.form.stok_opname_details[index].stok_sistem =
                res.data.quantity || 0.0;
            }
            this.onChangeStok(index);
          });
      }
    },

    formReset() {
      this.isEditable = false;
      this.parameters.form = {
        tanggal: "",
        gudang_id: "",
        keterangan: "",
        stok_opname_details: [],

        //Tracking
        user_agent: "",
        device: "",
        longitude: "",
        latitude: "",
      };
    },
  },
};
</script>
