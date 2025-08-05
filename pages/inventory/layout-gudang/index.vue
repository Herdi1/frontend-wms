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
          <list-option-section :self="this" ref="form-option" />
        </div>

        <div class="w-[600px] h-[600px] relative bg-blue-200">
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
            @resizeStop="
              (x, y, width, height) => onReziseStop(room, x, y, width, height)
            "
          >
            <div
              class="bg-orange-200 border border-gray-300 h-[100%] w-[100%] text-center"
            >
              {{ room.name }}
            </div>
          </VueDraggableResizable>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

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

  mounted() {
    // this.$refs["form-option"].isMaintenancePage = false;
    // this.$refs["form-option"].isExport = false;
    this.$refs["form-option"].isFilter = false;
    // this.$refs["form-option"].isAddData = true;
    if (
      this.getRoles.destroy ||
      this.getRoles.destroy_all ||
      this.getRoles.restore ||
      this.getRoles.restore_all
    ) {
      this.$refs["form-option"].isMaintenancePage = false;
    }

    if (this.getRoles.store) {
      this.$refs["form-option"].isAddData = true;
    }

    if (this.getRoles.export) {
      this.$refs["form-option"].isExportFile = false;

      this.$refs["form-option"].isExportFilePdf = false;
      this.$refs["form-option"].isExportFileExcel = false;

      if ("export_pdf" in this.getRoles || "export_excel" in this.getRoles) {
        this.$refs["form-option"].isExportFilePdf = this.getRoles.export_pdf;
        this.$refs["form-option"].isExportFileExcel =
          this.getRoles.export_excel;
      }
    }

    if (this.getRoles.print) {
      this.$refs["form-option"].isExportPrint = false;
    }
  },

  computed: {
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
      title: "Layout Gudang",
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
        url: "inventory/layout_gudang",
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
      },

      rooms: [
        {
          id: 1,
          name: "Zona gudang A",
          x: 20,
          y: 30,
          z: 5,
          width: 200,
          height: 150,
        },
        {
          id: 2,
          name: "Zona gudang B",
          x: 50,
          y: 70,
          z: 5,
          width: 200,
          height: 150,
        },
        {
          id: 2,
          name: "Zona gudang C",
          x: 400,
          y: 70,
          z: 5,
          width: 100,
          height: 150,
        },
      ],
    };
  },

  methods: {
    onDragStop(room, x, y) {
      room.x = x;
      room.y = y;

      // const newAxis = this.rooms.forEach((other) => {
      //   if (other.id !== room.id) {
      //     this.checkCollide(room, other);
      //   }
      // });
      // console.log(newAxis);
      console.log(this.checkCollide(this.rooms[1], this.rooms[2]));
    },
    onReziseStop(room, x, y, width, height) {
      room.x = x;
      room.y = y;
      room.width = width;
      room.height = height;
      console.log(room);
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
      this.rooms.push({});
    },
  },
};
</script>
