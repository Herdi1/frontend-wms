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

        <div class="flex gap-3 w-full">
          <div class="">
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

            <div class="w-full">
              <!-- <form @submit.prevent="addZona">
                <h3 class="font-bold text-base">Tambah Zona</h3>
                <div class="flex gap3 w-full justify-between items-center mb-2">
                  <p>Nama Zona</p>
                  <input
                    v-model="formZona.name"
                    type="text"
                    class="p-1 outline-none border border-gray-300 rounded-sm"
                  />
                </div>
                <div class="flex gap3 w-full justify-between items-center mb-2">
                  <p>Panjang</p>
                  <input
                    v-model="formZona.width"
                    type="text"
                    class="p-1 outline-none border border-gray-300 rounded-sm"
                  />
                </div>
                <div class="flex gap3 w-full justify-between items-center mb-2">
                  <p>Lebar</p>
                  <input
                    v-model="formZona.height"
                    type="text"
                    class="p-1 outline-none border border-gray-300 rounded-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    class="mb-2 p-2 rounded-md text-white bg-blue-400"
                  >
                    Tambah Zona
                  </button>
                </div>
              </form> -->
            </div>
            <div class="mb-3 max-h-[500px] overflow-auto w-full">
              <h2 class="font-bold text-base mb-1">Zona</h2>
              <ul class="w-[500px] pl-2">
                <li v-for="(room, i) in rooms" :key="i" class="w-full">
                  <div class="mb-2 w-full">
                    <div class="font-bold flex justify-between items-center">
                      <p>{{ room.nama_zona_gudang }}</p>
                      <button type="button" @click="deleteZona(i)">
                        <i class="fa fa-trash"></i>
                      </button>
                    </div>
                    <div class="flex items-center justify-between mb-2 w-full">
                      <p class="w-[150px]">Warna</p>
                      <input
                        @change="changeColor(room, i)"
                        type="color"
                        v-model="room.color"
                        class="p-1 outline-none border border-gray-300 rounded-sm"
                      />
                    </div>
                  </div>
                </li>
                <li v-for="(zona, i) in zona_gudangs" :key="i" class="w-full">
                  <div class="mb-2 w-full">
                    <div class="font-bold flex justify-between">
                      <p>{{ zona.nama_zona_gudang }}</p>
                      <button
                        type="button"
                        class="p-1 px-2 rounded-md bg-gray-200 font-bold"
                      ></button>
                    </div>
                    <div class="flex items-center justify-between mb-2 w-full">
                      <p class="w-[150px]">Warna</p>
                      <input
                        type="color"
                        v-model="zona.color"
                        class="p-1 outline-none border border-gray-300 rounded-sm"
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="min-w-[800px] w-[800px] h-[800px] relative bg-gray-300">
            <VueDraggableResizable
              v-for="room in rooms"
              :key="index"
              :x="room.x"
              :y="room.y"
              :w="room.width"
              :h="room.height"
              :parent="true"
              :draggable="true"
              :resizable="true"
              @dragging="(x, y) => onDragStop(room, x, y)"
              style="border: 1px solid black"
              @resizing="
                (x, y, width, height) => onReziseStop(room, x, y, width, height)
              "
            >
              <div
                :style="`background-color: ${room.color}`"
                :class="`bg-[${room.color}] border border-gray-300 h-[100%] z-20 w-[100%] text-center`"
              >
                {{ room.nama_zona_gudang }}
              </div>
            </VueDraggableResizable>
          </div>
        </div>
        <div class="mt-5">
          <button
            @click="onSubmit"
            type="button"
            class="p-2 rounded-md text-white bg-green-400"
          >
            Simpan Layout
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import { mapActions, mapState } from "vuex";

export default {
  middleware: ["checkRoleUser"],

  head() {
    return {
      title: "Layout Gudang",
    };
  },

  components: {
    VueDraggableResizable,
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

      title: "Layout Gudang",
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
        url: "inventory/layout-gudang",
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

      console.log(formData);
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
        const layout = await this.$axios.get("inventory/layout-gudang", {
          params: { gudang_id: this.parameters.form.gudang_id.gudang_id },
        });
        if (layout.data.length > 0) {
          this.rooms = [];
          this.zona_gudangs = [];
          layout.data.forEach((item) => {
            const rawCanvas = item.canvas;
            const canvas = JSON.parse(`${rawCanvas}`);
            this.rooms.push({
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
        } else {
          await this.$axios
            .get(
              `master/zona-gudang/get-zona-gudang?gudang_id=${item.gudang_id}`
            )
            .then((res) => {
              this.rooms = [];
              this.zona_gudangs = [];
              this.zona_gudangs = res.data.data.map((item) => {
                return {
                  zona_gudang_id: item.zona_gudang_id,
                  nama_zona_gudang: item.nama_zona_gudang,
                  kode_zona_gudang: item.kode_zona_gudang,
                  x: 0,
                  y: 0,
                  width: 100,
                  height: 100,
                  color: "ff0000",
                };
              });
            });
        }
      } else {
        this.parameters.form.gudang_id = "";
        this.rooms = [];
      }
    },

    changeColor(room, index) {
      this.rooms[index] = room;
    },

    deleteZona(index) {
      this.rooms = this.rooms.filter((_, itemIndex) => index !== itemIndex);
    },
  },
};
</script>
