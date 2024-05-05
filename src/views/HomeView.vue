<template>
  <div class="home">
    <div v-if="loading" class="loading-overlay">
      <span>Loading...</span>
    </div>
    <div class="container">
      <div class="row pt-3" v-if="dt_det.length == 0">
        <div class="col-12">
          <div class="bg-primary text-light rounded-12 p-3">
            <div class="row">
              <div
                class="col-12 d-flex justify-content-between align-items-center my-3"
              >
                <small class="fw-semibold">Abdul Rahman Jaelani</small>
                <div class="d-flex justify-content-around w-30">
                  <i
                    class="fs-5 p-2 rounded ti opacity-3 text-dark ti-bell"
                  ></i>
                  <i
                    class="fs-5 p-2 rounded ti opacity-3 text-dark ti-user"
                  ></i>
                </div>
              </div>
              <div class="col-12 mb-2">Silahkan isi form dibawah ini!</div>
              <div class="col-12">
                <div class="form-group row">
                  <div class="col-10">
                    <select
                      name="kurir"
                      id="kurir"
                      class="form-control bg-light"
                      v-model="parameter.kurir"
                      @change="
                        {
                          if (parameter.kurir.length > 0) {
                            other_inp = true;
                          } else {
                            other_inp = false;
                          }
                        }
                      "
                    >
                      <option value="">Pilih kurir</option>
                      <option value="jne">JNE</option>
                      <option value="sicepat">Sicepat</option>
                      <option value="antaraja">Antaraja</option>
                      <option value="lion">Lion</option>
                      <option value="sap">SAP</option>
                      <option value="pos">POS</option>
                      <option value="ide">IDE</option>
                    </select>
                  </div>
                  <div class="col-2 d-flex justify-content-center">
                    <button class="btn btn-light" @click="getData()">
                      <i class="ti ti-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-12 my-3" v-if="other_inp">
                <div class="row">
                  <div class="col-5">
                    <input
                      type="text"
                      name="asal"
                      id="asal"
                      class="form-control bg-light"
                      placeholder="Asal"
                      v-model="parameter.asal"
                    />
                  </div>
                  <div
                    class="col-2 d-flex align-items-center justify-content-center"
                  >
                    Ke
                  </div>
                  <div class="col-5">
                    <input
                      type="text"
                      name="tujuan"
                      id="tujuan"
                      class="form-control bg-light"
                      placeholder="Tujuan"
                      v-model="parameter.tujuan"
                    />
                  </div>
                  <div class="col-12 mt-2">
                    <input
                      type="number"
                      name="berat"
                      id="berat"
                      class="form-control bg-light"
                      placeholder="Berat (kg)"
                      v-model="parameter.berat"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row bg-white rounded p-2"
        style="position: sticky; top: 0"
        v-if="dt_det.length > 0"
      >
        <div class="col-12 p-2">
          <img
            src="../../public/assets/images/logos/Location.gif"
            alt="map logo"
            class="img-fluid"
          />
        </div>
        <div class="col-12 d-flex justify-content-between">
          <div class="row">
            <div class="col-8">
              <h5 class="fw-semibold">
                {{ dt_det[0].name }} - {{ dt_det[0].service }}
              </h5>
            </div>
            <div class="col-4">
              <span>{{ dt_det[0].price }}</span>
            </div>
            <div class="col-12">
              {{ dt_det[0].type }}
            </div>
            <div class="col-12">
              {{ dt_det[0].estimated }}
            </div>
            <div class="col-12">
              <span @click="back()"
                ><i class="ti ti-arrow-left"></i> <small>Kembali</small></span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-3 px-2">
        <div class="col-12 py-2">
          <h5 class="fw-semibold">Hasil pencarian</h5>
        </div>
        <div
          class="col-12 p-2 shadow rounded mb-2"
          v-for="(kurir, index) in dt_kurir"
          :key="kurir.code"
          @click="initDet(index)"
        >
          <div class="row">
            <div class="col-4">
              <img
                src="../../public/assets/images/logos/Take Away.gif"
                alt="layanan logo"
                class="img-fluid rounded-12"
              />
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-12 pt-2">
                  <b>{{ kurir.name }} <i class="ti ti-package"></i></b>
                </div>
                <div class="col-12 pt-2 row">
                  <small class="col-4">{{ kurir.service }}</small>
                  <small class="col-8">{{ kurir.type }}</small>
                </div>
                <div class="col-12 row">
                  <small class="col-6 fw-semibold">{{ kurir.price }}</small>
                  <small class="col-6">{{ kurir.estimated }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12" v-if="dt_kurir.length == 0">
          <h5 class="text-center">Tidak ada hasil pencarian</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      dt_kurir: [],
      loading: false,
      other_inp: false,
      parameter: {
        kurir: "",
        asal: "",
        tujuan: "",
        berat: 1,
      },
      index_det: 0,
      dt_det: [],
    };
  },
  created() {},
  methods: {
    async getData() {
      if (
        this.parameter.kurir == "" ||
        this.parameter.asal == "" ||
        this.parameter.tujuan == ""
      ) {
        alert("Silahkan lengkapi dulu form pencarian!");
        return;
      }
      try {
        this.loading = true;
        const response = await axios.get(
          `cost?api_key=a8dbb155f9e7a5d0dfaa34f8353244fa2da610888afdfcfadab3085ffaa79e91&courier=${this.parameter.kurir}&origin=${this.parameter.asal}&destination=${this.parameter.tujuan}&weight=${this.parameter.berat}`
        );
        let data = response.data.data.costs;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].price = parseInt(data[i].price).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            });
          }
          this.dt_kurir = data;
        } else {
          alert("Data ongkir tidak ditemukan!");
        }
        this.loading = false;
        this.other_inp = false;
        console.log(data);
      } catch (error) {
        console.log(error);
        alert(error);
        this.loading = false;
        this.other_inp = false;
      }
    },
    initDet(index) {
      this.dt_det = [this.dt_kurir[index]];
      console.log(this.dt_det);
      console.log(this.dt_det.length);
    },
    back() {
      this.dt_det = [];
    },
  },
};
</script>
