<template>
  <section>
    <ul class="flex space-x-2 rtl:space-x-reverse mb-5">
      <li>
        <a href="javascript:;" class="text-primary hover:underline"
          >Inventory</a
        >
      </li>
      <li
        class="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:content-['/'] before:text-gray-400"
      >
        <span>{{ this.title }}</span>
      </li>
    </ul>
    <div class="mb-5 flex items-center justify-between">
      <h5 class="text-lg font-semibold dark:text-white-light">
        {{ this.title }}
      </h5>
    </div>

    <div class="flex sm:flex-col md:flex-row gap-5">
      <!-- <div
        class="sm:w-full md:w-4/12 bg-white dark:bg-slate-800 rounded-md p-2 px-4"
      >
        <FormInput :self="this" ref="formInput" />
      </div> -->
      <div class="w-full bg-white dark:bg-slate-800 rounded-md p-2 px-4">
        <div>
          <!-- <list-option-section :self="this" ref="form-option" /> -->
          <h1 class="font-bold text-xl uppercase mb-3">Layout Gudang</h1>
        </div>

        <div class="relative gap-3 w-full">
          <div class="mb-3">
            <ValidationProvider name="gudang_id">
              <select-button
                :self="{
                  label: 'Gudang',
                  optionLabel: 'nama_gudang',
                  lookup: lookup_warehouses,
                  value: parameters.form.gudang_id,
                  onGet: onGetGudang,
                  isLoadingL: isLoadingGetGudang,
                  input: onSelectGudang,
                }"
                width="w-[50%]"
                class="mb-5 w-[500px]"
              />
            </ValidationProvider>
          </div>
          <div class="flex gap-2">
            <div class="min-w-[800px] w-[800px] h-[800px] bg-gray-300">
              <VueDraggableResizable
                v-for="room in rooms"
                :key="index"
                :x="room.x"
                :y="room.y"
                :w="room.width"
                :h="room.height"
                :parent="true"
                :draggable="false"
                :resizable="false"
                @dragging="(x, y) => onDragStop(room, x, y)"
                style="border: 1px solid black"
                @resizing="
                  (x, y, width, height) =>
                    onReziseStop(room, x, y, width, height)
                "
              >
                <div
                  :style="`background-color: ${room.color}`"
                  :class="`bg-[${room.color}] border border-gray-300 h-[100%] z-20 w-[100%] text-center cursor-pointer`"
                  @click="zonaClick(room, $event)"
                >
                  {{ room.nama_zona_gudang }}
                </div>
              </VueDraggableResizable>
            </div>
            <ZonaDetail ref="zonaDetail" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import { mapActions, mapState } from "vuex";
import ZonaDetail from "./ZonaDetail.vue";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Kapasitas Zona",
    };
  },

  components: {
    VueDraggableResizable,
    ZonaDetail,
  },

  async mounted() {
    // this.$refs["form-option"].isMaintenancePage = false;
    // this.$refs["form-option"].isExport = false;
    // this.$refs["form-option"].isFilter = false;
    // this.$refs["form-option"].isAddData = true;
    // if (
    //   this.getRoles.destroy ||
    //   this.getRoles.destroy_all ||
    //   this.getRoles.restore ||
    //   this.getRoles.restore_all
    // ) {
    //   this.$refs["form-option"].isMaintenancePage = false;
    // }

    // if (this.getRoles.store) {
    //   this.$refs["form-option"].isAddData = true;
    // }

    // if (this.getRoles.export) {
    //   this.$refs["form-option"].isExportFile = false;

    //   this.$refs["form-option"].isExportFilePdf = false;
    //   this.$refs["form-option"].isExportFileExcel = false;

    //   if ("export_pdf" in this.getRoles || "export_excel" in this.getRoles) {
    //     this.$refs["form-option"].isExportFilePdf = this.getRoles.export_pdf;
    //     this.$refs["form-option"].isExportFileExcel =
    //       this.getRoles.export_excel;
    //   }
    // }

    // if (this.getRoles.print) {
    //   this.$refs["form-option"].isExportPrint = false;
    // }

    await this.onSearchGudang();
  },

  computed: {
    ...mapState("moduleApi", ["error", "result", "lookup_warehouses"]),

    getRoles() {
      if (this.user.is_superadmin == 1) {
        return this.default_roles;
      } else {
        let main_role = this.user.role.menus.find(
          (item) => item.rute == "layout-gudang"
        );

        let roles = {};

        if (JSON.parse(main_role.pivot.operators).includes("all")) {
          return this.default_roles;
        }

        JSON.parse(main_role.pivot.operators).forEach((item) => {
          roles[item.replace("-", "_")] = true;
        });

        return roles;
      }
    },
  },

  data() {
    return {
      user: this.$auth.user,

      isStopSearchGudang: false,
      isLoadingGetGudang: false,
      gudang_search: "",

      title: "Kapasitas Zona",
      isLoadingForm: false,
      isLoadingData: false,
      isPaginate: true,
      user: this.$auth.user,
      default_roles: {
        store: true,
        update: true,
        destroy: true,
        restore: true,
        show: true,
        export: true,
        export_excel: true,
        export_pdf: true,
        print: true,
        destroy_all: true,
        restore_all: true,
        import: true,
      },

      parameters: {
        url: "inventory/kapasitas-zona",
        type: "pdf",
        params: {
          soft_deleted: "",
          search: "",
          order: "konversi_stok_id",
          sort: "desc",
          all: "",
          start_date: "",
          end_date: "",
          status_konversi: "",
          status_approve: "",
          gudang_id: "",
          per_page: 10,
          page: 1,
          form: {
            kode_konversi_stok: "",
            tanggal: "",
            tanggal_mulai: "",
            tanggal_selesai: "",
            lama_pengerjaan: "",
            gudang_id: "",
            status_approve: "",
            keterangan: "",
            konversi_stok_detail_bahan: [],
            konversi_stok_detail_jadi: [],
            biaya_konversi: [],
          },
        },
        loadings: {
          isDelete: false,
          isRestore: false,
        },
        form: {
          gudang_id: "",
        },
      },

      formZona: {
        name: "",
        width: 0,
        height: 0,
      },

      zona_gudangs: [],

      rooms: [],
    };
  },

  watch: {
    rooms: {
      handler(newVal) {
        return newVal.map((item) => {
          return { ...item };
        });
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions("moduleApi", ["lookUp"]),

    onDragStop(room, x, y) {
      room.x = x;
      room.y = y;

      // const newAxis = this.rooms.forEach((other) => {
      //   if (other.id !== room.id) {
      //     this.checkCollide(room, other);
      //   }
      // });
      // console.log(newAxis);
      // console.log(this.checkCollide(this.rooms[1], this.rooms[2]));
    },
    onReziseStop(room, x, y, width, height) {
      room.x = x;
      room.y = y;
      room.width = width;
      room.height = height;
      console.log(room);
      // this.onSizeCange(room, width, height);
    },
    checkCollide(zonaA, zonaB) {
      let x;
      let y;
      if (zonaA.x + zonaA.width <= zonaB.x) {
        x = zonaA.x + zonaA.width >= zonaB.x ? zonaB.x - zonaA.width : zonaA.x;
      }
      if (zonaA.x >= zonaB.x + zonaB.width) {
        x = zonaA.x <= zonaB.x + zonaB.width ? zonaA.x + zonaB.width : zonaA.x;
      }
      if (zonaA.y >= zonaB.y + zonaB.height) {
        y =
          zonaA.y <= zonaB.y + zonaB.height ? zonaA.y + zonaB.height : zonaA.y;
      }
      if (zonaA.y + zonaA.height <= zonaB.y) {
        y =
          zonaA.y + zonaA.height >= zonaB.y ? zonaB.y - zonaA.height : zonaA.y;
      }

      return { x, y };
    },
    addZona() {
      this.rooms.push({
        name: this.formZona.name,
        width: this.formZona.width,
        height: this.formZona.height,
      });
      this.formZona = {
        id: this.rooms.length,
        name: "",
        width: 0,
        height: 0,
      };
    },
    onSizeCange(room, width, height) {
      room.width = width;
      room.height = height;
    },

    onSubmit() {
      if (this.isLoadingForm) return;

      this.isLoadingForm = true;
      let url = "inventory/layout-gudang";

      let formData = {};

      formData.gudang_id = this.parameters.form.gudang_id.gudang_id;

      formData.layout_gudangs = this.rooms.map((item) => {
        return {
          ...item,
          // gudang_id: this.parameters.form.gudang_id.gudang_id,
          zona_gudang_id: item.zona_gudang_id,
          canvas: `{"x": "${item.x}", "y": "${item.y}", "width": "${item.width}", "height": "${item.height}", "color": "${item.color}"}`,
        };
      });

      this.$axios({
        method: "post",
        url: url,
        data: formData,
      })
        .then((res) => {
          this.$toaster.success("Data berhasil di Tambah");
        })
        .catch((err) => {
          this.$globalErrorToaster(this.$toaster, err);
        })
        .finally(() => {
          this.isLoadingForm = false;
        });
    },

    onGetGudang(search, isNext) {
      if (!search.length && typeof isNext === "function") return;

      clearTimeout(this.isStopSearchGudang);

      this.isStopSearchGudang = setTimeout(() => {
        this.gudang_search = search;

        if (typeof isNext !== "function") {
          this.lookup_warehouses.current_page = isNext
            ? this.lookup_warehouses.current_page + 1
            : this.lookup_warehouses.current_page - 1;
        } else {
          this.lookup_warehouses.current_page = 1;
        }
        this.onSearchGudang();
      }, 600);
    },

    async onSearchGudang() {
      if (!this.isLoadingGetGudang) {
        this.isLoadingGetGudang = true;

        await this.lookUp({
          url: "master/gudang/get-gudang-user",
          lookup: "warehouses",
          query:
            "?search=" +
            this.gudang_search +
            "&user_id=" +
            this.user.user_id +
            "&page=" +
            this.lookup_warehouses.current_page +
            "&per_page=10",
        });
        this.isLoadingGetGudang = false;
      }
    },

    async onSelectGudang(item) {
      if (item) {
        this.isLoadingData = true;
        this.parameters.form.gudang_id = item;
        const layout = await this.$axios.get("inventory/kapasitas-zona", {
          params: { gudang_id: this.parameters.form.gudang_id.gudang_id },
        });
        if (layout.data.length > 0) {
          this.rooms = [];
          this.zona_gudangs = [];
          layout.data.forEach((item) => {
            const rawCanvas = item.canvas;
            const canvas = JSON.parse(`${rawCanvas}`);
            this.rooms.push({
              ...item,
              layout_gudang_id: item.layout_gudang_id,
              gudang_id: item.gudang_id,
              zona_gudang_id: item.zona_gudang_id,
              nama_zona_gudang: item.zona_gudang.nama_zona_gudang,
              kode_zona_gudang: item.zona_gudang.kode_zona_gudang,
              x: canvas.x,
              y: canvas.y,
              width: canvas.width,
              height: canvas.height,
              color: canvas.color,
            });
          });
          // await this.$axios
          //   .get(
          //     `master/zona-gudang/get-zona-gudang?gudang_id=${item.gudang_id}`
          //   )
          //   .then((res) => {
          //     this.zona_gudangs = res.data.data
          //       .filter(
          //         (zona) =>
          //           !this.rooms.some(
          //             (data) => data.zona_gudang_id === zona.zona_gudang_id
          //           ) && zona.status_zona.trim() !== "v"
          //       )
          //       .map((item) => {
          //         return {
          //           zona_gudang_id: item.zona_gudang_id,
          //           nama_zona_gudang: item.nama_zona_gudang,
          //           kode_zona_gudang: item.kode_zona_gudang,
          //           x: 0,
          //           y: 0,
          //           width: 100,
          //           height: 100,
          //           color: "ff0000",
          //         };
          //       });
          //   });
        } else {
          // await this.$axios
          //   .get(
          //     `master/zona-gudang/get-zona-gudang?gudang_id=${item.gudang_id}`
          //   )
          //   .then((res) => {
          //     this.rooms = [];
          //     this.zona_gudangs = [];
          //     this.zona_gudangs = res.data.data
          //       .filter((data) => data.status_zona.trim() !== "v")
          //       .map((item) => {
          //         return {
          //           zona_gudang_id: item.zona_gudang_id,
          //           nama_zona_gudang: item.nama_zona_gudang,
          //           kode_zona_gudang: item.kode_zona_gudang,
          //           x: 0,
          //           y: 0,
          //           width: 100,
          //           height: 100,
          //           color: "ff0000",
          //         };
          //       });
          //   });
        }
      } else {
        this.parameters.form.gudang_id = "";
        this.rooms = [];
      }
    },

    // async getZona() {
    //   await this.$axios
    //     .get(
    //       `master/zona-gudang/get-zona-gudang?gudang_id=${this.parameters.form.gudang_id.gudang_id}`
    //     )
    //     .then((res) => {
    //       this.zona_gudangs = res.data.data
    //         .filter(
    //           (zona) =>
    //             !this.rooms.some(
    //               (data) => data.zona_gudang_id === zona.zona_gudang_id
    //             )
    //         )
    //         .map((item) => {
    //           return {
    //             zona_gudang_id: item.zona_gudang_id,
    //             nama_zona_gudang: item.nama_zona_gudang,
    //             kode_zona_gudang: item.kode_zona_gudang,
    //             x: 0,
    //             y: 0,
    //             width: 100,
    //             height: 100,
    //             color: "ff0000",
    //           };
    //         });
    //       console.log(this.zona_gudangs);
    //     });
    // },

    // addRooms(item) {
    //   this.rooms.push(item);
    //   this.zona_gudangs = this.zona_gudangs.filter(
    //     (data) => item.zona_gudang_id !== data.zona_gudang_id
    //   );
    // },

    changeColor(room, index) {
      this.rooms[index] = room;
    },

    // async deleteZona(index) {
    //   this.rooms = this.rooms.filter((_, itemIndex) => index !== itemIndex);
    //   await this.getZona();
    // },

    async zonaClick(room, event) {
      const rect = event.target.getBoundingClientRect();

      if (this.$refs.zonaDetail.visible) {
        this.$refs.zonaDetail.hide();
      } else {
        this.$refs.zonaDetail.show();
        this.$refs.zonaDetail.layout_id = room.layout_gudang_id;
        // this.$refs.zonaDetail.room.x = rect.left + rect.width / 2;
        // this.$refs.zonaDetail.room.y = rect.top - 5;
        await this.$refs.zonaDetail.getKapasitasZona();
      }
    },
  },
};
</script>
