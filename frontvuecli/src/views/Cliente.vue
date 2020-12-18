<template>
  <div>


    <div class="container">

      <!--  HEADER  -->
      <chapter v-bind:chapter_title="pageTitle" v-bind:chapter_content="pageTitleContent"></chapter>

      <!--  CORPO -->
      <div class="row">


        <!--TABELA-->
        <div class="col-md-8 order-md-1 mb-4">


          <h4 v-if="responseData" class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Registros</span>
            <span class="badge badge-secondary badge-pill"> {{ responseDataSize }} </span>
          </h4>

          <b-table id="my-table" ref="table" :items="responseData" empty-text="Nenhum resultado disponível" hover
                   responsive="true" select-mode="single" selectable
                   selected-variant="secondary" show-empty small
                   striped @row-selected="onRowSelected">


          </b-table>


        </div>


        <!--FORMULARIO        -->
        <div class="col-md-4 order-md-2">
          <b-form @submit.stop.prevent="onSubmit">


            <!-- NOME -->
            <b-form-group id="bgroup1" label="Nome" label-for="inp1">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <b-icon icon="person" variant="secondary"></b-icon> </span>
                </div>

                <b-form-input
                    id="inp1"
                    v-model="$v.nome.$model"
                    :state="validateState('nome')"
                    aria-describedby="live1"
                    name="inp1"
                ></b-form-input>

                <b-form-invalid-feedback id="live1">
                  {{ this.err.required }}
                </b-form-invalid-feedback>
              </div>
            </b-form-group>


            <!-- EMAIL -->
            <b-form-group id="bgroup2" label="Email" label-for="inp2">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <b-icon icon="mailbox" variant="secondary"></b-icon> </span>
                </div>

                <b-form-input
                    id="inp2"
                    v-model="$v.email.$model"
                    :readonly="disableEmail"
                    :state="validateState('email')"
                    aria-describedby="live2"
                    name="inp2"
                ></b-form-input>

                <b-form-invalid-feedback id="live2">
                  {{ this.err.email }}
                </b-form-invalid-feedback>
              </div>
            </b-form-group>


            <!-- TELEFONE -->
            <b-form-group id="bgroup3" label="Telefone" label-for="inp3">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <b-icon icon="telephone-inbound" variant="secondary"></b-icon> </span>
                </div>

                <b-form-input
                    id="inp3"
                    v-model="$v.telefone.$model"
                    :state="validateState('telefone')"
                    aria-describedby="live3"
                    name="inp3"
                ></b-form-input>

                <b-form-invalid-feedback id="live3">
                  {{ this.err.numeric }}
                </b-form-invalid-feedback>
              </div>
            </b-form-group>


            <div v-if="submitStatus">
              <hr class="mb-4">
              <b class="text-primary">{{ this.submitStatus }}</b>
            </div>

            <hr class="mb-4">


            <b-button class="ml-2 bg-primary" type="submit">Salvar</b-button>
            <b-button v-show="disableEmail" class="btn btn-primary ml-2 bg-danger" @click="remover()">Remover</b-button>
            <b-button class="ml-2 bg-secondary" @click="resetForm()">Reset</b-button>
          </b-form>


        </div>


      </div>


    </div>
    <!-- FIM TEMPLATE !-->


  </div>
</template>

<script>
import {email, minLength, numeric, required} from "vuelidate/lib/validators";
import Chapter from '@/components/Chapter';

export default {
  name: 'Cliente',
  components: {
    chapter: Chapter
  },
  data() {
    return {
      pageTitle: 'Clientes',
      pageTitleContent: 'Clique nos registros para editar e remover, cadastre no formulário ao lado!.',
      selected: undefined,
      submitStatus: undefined,
      id_cliente: undefined,
      nome: undefined,
      email: undefined,
      telefone: undefined,
      disableEmail: false,
      responseData: undefined,
      err: {
        required: 'Este campo é obrigatório.',
        email: 'Campo deve ser um e-mail válido.',
        numeric: 'Campo deve ser numérico.',
        min: 'Campo com limitação mínima de caracteres.'
      }
    }
  },
  computed:{
    responseDataSize(){
      return Object.keys(this.responseData).length;
    }
  },
  validations: {
    nome: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email
    },
    telefone: {
      required,
      numeric
    }
  },
  mounted() {
    this.listar();

    if (this.$store.state.logged !== true) {
      if (this.$router.history.current.path !== '/login') {
        this.$router.push('/login')
      }
    }
  },
  methods: {
    clean() {
      this.nome = undefined;
      this.email = undefined;
      this.telefone = undefined;
      this.disableEmail = false;
    },
    onRowSelected(items) {
      this.selected = items[0];

      if (this.selected) {
        this.nome = this.selected.nome;
        this.email = this.selected.email;
        this.telefone = this.selected.telefone;
        this.disableEmail = true;
      } else {
        this.resetForm();
      }
    },
    listar() {
      this.axios.get('/cliente')
          .then(response => {
            if (response.status === 200) {
              this.responseData = response.data;
            } else {
              this.submitStatus = 'Dados NÃO encontrados !';
            }
          })
          .catch(error => {
            this.submitStatus = error
          });
    },
    salvar() {
      if (this.disableEmail) {
        this.editar();
      }
        this.axios.post('/cliente', {
          nome: this.nome, email: this.email, telefone: this.telefone
        })
          .then(response => {
            if (response.status === 200) {
              this.submitStatus = 'Cadastrado com sucesso !';

              this.resetForm();
              this.listar();
            } else {
              this.submitStatus = 'Status code retornado (' + response.status + ")";
            }
          })
          .catch(error => {
            this.submitStatus = error;
            if (error.response && error.response.status == 304) {
              this.submitStatus = 'Registro atualizado. Status '+ error.response.status;
            }
          });
    },
    remover() {
      this.axios.delete('/cliente', {
        headers: {Authorization: false},
        data: {
          email: this.selected.email
        }
      })
          .then(response => {
            if (response.status === 200) {
              this.submitStatus = 'Operação realizada com sucesso !';
            } else {
              this.submitStatus = 'Operação realizada com sucesso !' + response.status;
            }
            this.listar();
            this.resetForm();
          })
          .catch(error => {
            this.submitStatus = error;
          });
    },
    editar() {
      this.axios.put('/cliente', {
        nome: this.nome,
        email: this.email,
        telefone: this.telefone
      })
          .then(response => {
            if (response.status === 200) {
              this.submitStatus = 'Operação realizada com sucesso !';
            } else {
              this.submitStatus = 'Operação realizada com sucesso !' + response.status;
            }

            this.listar();
            this.resetForm();
          })
          .catch(error => {
            this.submitStatus = error;
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
