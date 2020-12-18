<template>
  <div>


    <div class="container">

      <!--  HEADER  -->
      <chapter v-bind:chapter_content="pageTitleContent" v-bind:chapter_title="pageTitle"></chapter>

      <b-row class="justify-content-center">
        <!--FORMULARIO        -->
        <div class="col-12 col-md-5">
          <b-form @submit.stop.prevent="onSubmit">


            <!-- DATA -->
            <b-form-group id="bgroup1" label="Data" label-for="inp1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <b-icon icon="alarm" variant="secondary"></b-icon> </span>
                </div>

                <b-form-datepicker
                    id="inp1"
                    v-model="$v.data.$model"
                    :state="validateState('data')"
                    aria-describedby="live1"
                    name="inp1"
                    size="sm"
                ></b-form-datepicker>

                <b-form-invalid-feedback id="live1">
                  {{ this.err.required }}
                </b-form-invalid-feedback>
              </div>
            </b-form-group>


            <!-- QUENTE -->
            <b-form-group id="bgroup2" label="Quente" label-for="inp2">
              <div class="input-group justify-content-center">

                <b-form-checkbox
                    id="inp2"
                    v-model="$v.quente.$model"
                    :state="validateState('quente')"
                    aria-describedby="live2"
                    name="inp2"
                    size="lg"
                    switch
                ></b-form-checkbox>

                <b-form-invalid-feedback id="live2">
                  {{ this.err.required }}
                </b-form-invalid-feedback>
              </div>
            </b-form-group>


            <!-- CLIENTE -->
            <b-form-group id="bgroup3" label="Cliente" label-for="inp3">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <b-icon icon="people" variant="secondary"></b-icon> </span>
                </div>
                <b-form-select
                    id="inp3"
                    v-model="$v.id_cliente.$model"
                    :options="options1"
                    :state="validateState('id_cliente')"
                    aria-describedby="live3"
                    name="inp3"
                ></b-form-select>

                <b-form-invalid-feedback id="live3">{{ this.err.required }}</b-form-invalid-feedback>
              </div>
            </b-form-group>

            <!-- VENDEDOR -->

            <b-form-group id="bgroup4" label="Vendedor" label-for="inp4">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <b-icon icon="people" variant="secondary"></b-icon> </span>
                </div>
                <b-form-select
                    id="inp4"
                    v-model="$v.id_vendedor.$model"
                    :options="options2"
                    :state="validateState('id_vendedor')"
                    aria-describedby="live4"
                    name="inp4"
                ></b-form-select>

                <b-form-invalid-feedback id="live4">{{ this.err.required }}</b-form-invalid-feedback>
              </div>
            </b-form-group>


            <div v-if="submitStatus">
              <hr class="mb-4">
              <b class="text-primary">{{ this.submitStatus }}</b>
            </div>

            <hr class="mb-4">


            <b-button class="ml-2 bg-primary" type="submit">Salvar</b-button>
            <b-button class="ml-2 bg-secondary" @click="resetForm()">Reset</b-button>
          </b-form>

        </div>
      </b-row>

    </div>

  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";
import Chapter from "@/components/Chapter";

export default {
  name: 'Prospectos',
  components: {
    chapter: Chapter
  },
  watch: {
    selected() {
      this.checked = this.selected ? (this.selected.quente === 1 ? true : false) : false;
    }
  },
  data() {
    return {
      pageTitle: 'Prospectos',
      pageTitleContent: 'Cadastre um novo contato no formulário abaixo !.',
      filter: '',
      selected: undefined,
      checked: undefined,
      responseData: undefined,
      submitStatus: undefined,
      id: undefined,
      data: undefined,
      quente: undefined,
      id_cliente: 0,
      id_vendedor: 0,
      cliente: {
        id: undefined,
        nome: undefined,
        email: undefined,
        telefone: undefined
      },
      vendedor: {
        id: undefined,
        nome: undefined,
        email: undefined,
        senha: undefined
      },
      err: {
        required: 'Este campo é obrigatório.',
        email: 'Campo deve ser um e-mail válido.',
        numeric: 'Campo deve ser numérico.',
        min: 'Campo com limitação mínima de caracteres.'
      },
      fields: [
        {key: 'pid', label: 'Cód'},
        {key: 'data', label: 'Data', formatter: 'dataTable'},
        {
          key: 'quente',
          label: 'Temperatura',
          formatter: 'temperaturaTable',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true
        },
        {key: 'cnome', label: 'Cliente', sortable: true},
        {key: 'cemail', label: 'Email', sortable: true},
        {key: 'ctelefone', label: 'Telefone', sortable: true},
        {key: 'vnome', label: 'Vendedor'},
        {key: 'vemail', label: 'Login'},
      ],
      options1: [
        {value: null, text: 'Selecione uma opção', selected: true, disabled: false}
      ],
      options2: [
        {value: null, text: 'Selecione uma opção', selected: true}
      ]
    }
  },
  validations: {
    quente: {
      required
    },
    data: {
      required
    },
    id_cliente: {
      required,
      minValue: minValue(1)
    },
    id_vendedor: {
      required,
      minValue: minValue(1)
    }
  },
  mounted() {

    this.getClientes();
    this.getVendedores();

    if (this.$store.state.logged !== true) {
      if (this.$router.history.current.path !== '/login') {
        this.$router.push('/login')
      }
    }
  },
  methods: {
    clean() {
      this.data = undefined;
      this.quente = undefined;
      this.id_cliente = undefined;
      this.id_vendedor = undefined;
    },
    getClientes() {
      this.axios.get('/cliente')
          .then(response => {
            if (response.status === 200) {
              this.cliente = response.data;
              let noption = [];
              for (var key in response.data) {
                noption = {
                  value: response.data[key].id,
                  text: (response.data[key].nome + ' ' + response.data[key].email)
                };
                this.options1.push(noption);
              }
            } else {
              this.submitStatus = 'Dados NÃO encontrados !';
            }
          })
          .catch(error => {
            this.submitStatus = error;
            if (error.response) {
              this.submitStatus = 'Erro ao carregar dados. ' + error.response;
            }
          });
    },
    getVendedores() {
      this.axios.get('/vendedor')
          .then(response => {
            if (response.status === 200) {
              let noption = [];
              for (var key in response.data) {
                noption = {
                  value: response.data[key].id,
                  text: (response.data[key].nome + ' ' + response.data[key].email)
                };
                this.options2.push(noption);
              }
            } else {
              this.submitStatus = 'Dados NÃO encontrados !';
            }
          })
          .catch(error => {
            this.submitStatus = error;
            if (error.response) {
              this.submitStatus = 'Erro ao carregar dados. ' + error.response;
            }
          });
    },
    salvar() {
      this.axios.post('/prospectos', {
        data: this.data,
        quente: this.quente,
        id_cliente: this.id_cliente,
        id_vendedor: this.id_vendedor
      })
          .then(response => {
            if (response.status === 200) {
              this.submitStatus = 'Cadastrado com sucesso !';
              //this.resetForm();
            } else {
              this.submitStatus = 'Operação realizada com sucesso !' + response.status;
            }
          })
          .catch(error => {
            this.submitStatus = error;
            if (error.response && error.response.status == 304) {
              this.submitStatus = 'Usuario já esta cadastrado, realize uma pesquisa !';
            }
          });
    }
    ,//BEGIN VUELIDATE
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }

      this.salvar();
    },
    validateState(name) {
      const {$dirty, $error} = this.$v[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.clean();
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }//END VUELIDATE
  }
}
</script>

<style lang="scss" scoped>

</style>
