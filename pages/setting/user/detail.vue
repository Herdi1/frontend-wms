<template>
  <portal v-if="visible" to="modal-detail">
    <div class="fixed inset-0 bg-black bg-opacity-50 z-50"></div>
    <div
      class="fixed top-6 left-1/2 -translate-x-1/2 bg-white rounded shadow-lg p-6 z-50 w-full max-w-md dark:bg-slate-700 dark:text-gray-100"
      aria-hidden="true"
      id="modal-detail"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="flex justify-between text-xl font-bold mb-3">
            <h5 class="">Detail Data</h5>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hide()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="grid grid-cols-2 mb-3">
              <div class="col">
                <div class="form-group">
                  <label class="font-bold" for="fullname">Nama Lengkap</label>
                  <div>{{ parameters.form.nama_lengkap }}</div>
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label class="font-bold" for="uername">Username</label>
                  <div>{{ parameters.form.username }}</div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="font-bold mb-3" for="email">Email</label>
              <div>{{ parameters.form.email }}</div>
            </div>

            <div class="grid grid-cols-2 mb-3">
              <div class="col">
                <div class="form-group">
                  <label class="font-bold" for="role">Role</label>
                  <div>
                    {{
                      parameters.form.role ? parameters.form.role.nama_role : ""
                    }}
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label class="font-bold" for="jabatan">Jabatan</label>
                  <div>
                    {{
                      parameters.form.jabatan
                        ? parameters.form.jabatan.nama_jabatan
                        : ""
                    }}
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 mb-3">
              <div class="col">
                <div class="form-group">
                  <label class="font-bold" for="jabatan">Pelanggan</label>
                  <div>
                    {{
                      parameters.form.pelanggan
                        ? parameters.form.pelanggan.nama_pelanggan
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label class="font-bold" for="jabatan">Gudang</label>
                  <div>
                    {{
                      parameters.form.gudang
                        ? parameters.form.gudang.nama_gudang
                        : ""
                    }}
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="table table-responsive">
               <table class="table-responsive">
                 <tr>
                   <td>Hak Akses</td>
                   <td>Operator</td>
                 </tr>
                 <tr v-for="item in parameters.form.group_role.grants"
                  :key="item.id">
                  <td>{{item.role ? item.role.title : '-'}}</td>
                  <td>
                    <span class="badge badge-success ml-1 mr-1 mb-2"
                      v-for="itemOperator in item.operators"
                      :key="itemOperator">
                      {{itemOperator}}
                    </span>
                  </td>
                 </tr>
                 <tr v-if="!parameters.form.group_role.grants.length">
                   <td colspan="2" class="text-center">
                     Data tidak ditemukan
                   </td>
                 </tr>
               </table>
             </div> -->
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  middleware: ["isNotAccessable"],

  props: ["self"],

  data() {
    return {
      visible: false,
      parameters: {
        form: {
          group_role: {
            grants: [],
          },
        },
      },
    };
  },

  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>
