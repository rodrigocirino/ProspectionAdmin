<template>
  <div>

    <div class="container">

      <!--  HEADER  -->
      <chapter v-bind:chapter_title="pageTitle" v-bind:chapter_content="pageTitleContent"></chapter>

      <!--  CORPO -->
      <b-row>
        <!--TABELA-->
        <div class="col-12">

          <b-row>
            <b-col>
              <b-form-group
                  class="mb-10"
                  label="Pesquise"
                  label-align-sm="right"
                  label-cols-sm="1"
                  label-for="filter-input"
              >
                <b-input-group>
                  <b-form-input
                      id="filter-input"
                      v-model="filter"
                      placeholder="Quente"
                      type="search"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <h4 v-if="responseData" class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Registros</span>
            <span class="badge badge-secondary badge-pill"> {{ responseDataSize }} </span>
          </h4>

          <b-table id="my-table" ref="table" :fields="fields" :filter="filter" :items="responseData" hover
                   responsive select-mode="single" selectable selected-variant="secondary"
                   show-empty empty-text="Nenhum resultado disponível" small striped
                   @row-selected="onRowSelected">

            <template #head(cnome)="data">
              <span class="text-primary">{{ data.label }}</span>
            </template>
            <template #head(cemail)="data">
              <span class="text-primary">{{ data.label }}</span>
            </template>
            <template #head(ctelefone)="data">
              <span class="text-primary">{{ data.label }}</span>
            </template>
            <template #head(quente)="data">
              <span class="text-success">{{ data.label }}</span>
            </template>

          </b-table>

          <template>
            <div>
              <b-form>
                <b-form-checkbox v-model="checked" :disabled="!this.selected || quente"
                                 name="check-button" size="lg" switch>
                  Deseja alterar a temperatura da prospecção
                  <span v-if="selected"> n&deg; {{ this.selected.pid }} ? </span>
                  <b-button :disabled="!this.selected" variant="primary" @click="editar()">
                    <b-icon aria-hidden="true" icon="check2-circle"></b-icon>
                    Salvar
                  </b-button>
                </b-form-checkbox>
              </b-form>

              <hr/>

              <b-form>
                <label class="mr-2">Deseja excluir a prospecção </label>
                <strong v-if="selected" class="mr-2"> n&deg; {{ this.selected.pid }} </strong>
                <b-button :disabled="!this.selected" variant="danger" @click="remover()">
                  <b-icon aria-hidden="true" icon="trash"></b-icon>
                  Remover
                </b-button>
              </b-form>
            </div>
          </template>


        </div>
      </b-row>

    </div>
  </div>
</template>

<script>
import Chapter from '@/components/Chapter';

export default {
  name: 'Home',
  components: {
    chapter: Chapter
  },
  watch: {
    selected() {
      this.checked = this.selected ? (this.selected.quente === 1 ? true : false) : false;
    }
  },
  computed: {
    responseDataSize() {
      return Object.keys(this.responseData).length;
    }
  },
  data() {
    return {
      pageTitle:'Manutenção dos prospectos',
      pageTitleContent:'Clique nos registros para editar e remover, pesquise por prospectos "quentes" no campo indicado !',
      filter: '',
      selected: undefined,
      checked: undefined,
      responseData: undefined,
      submitStatus: undefined,
      componentKey: 0,
      id: undefined,
      data: undefined,
      quente: undefined,
      id_cliente: undefined,
      id_vendedor: undefined,
      cliente: {
        id_cliente: undefined,
        nome: undefined,
        email: undefined,
        telefone: undefined
      },
      vendedor: {
        id_vendedor: undefined,
        nome: undefined,
        email: undefined,
        senha: undefined
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
        {key: 'quente', label: 'Temperatura'},
      ],
    }
  },
  mounted() {
    this.getVendedorProspectos();

    if (this.$store.state.logged !== true) {
      if (this.$router.history.current.path !== '/login') {
        this.$router.push('/login')
      }
    }
  },
  methods: {
    dataTable(data) {
      return new Date(data).toISOString().replace(/T.*/, '').split('-').reverse().join('-')
      //return (new Date(data).getDate() + '/' + new Date(data).getMonth() +'/'+ new Date(data).getFullYear());
    },
    temperaturaTable(value) {
      return value === 1 ? 'Quente' : '-';
    },
    onRowSelected(items) {
      this.selected = items[0];
    },
    getVendedorProspectos() {
      this.axios.get('/prospectos/join?id_vendedor=' + this.$store.state.emailLoggedIn)
          .then(response => {
            if (response.status === 200) {
              this.responseData = response.data;
              this.submitStatus = 'Dados carregados com sucessso !';
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
    editar() {
      this.axios.put('/prospectos', {
        data: this.selected.data.slice(0, -5),
        quente: this.checked,
        pid: this.selected.pid
      })
          .then(response => {
            if (response.status === 200) {
              this.submitStatus = 'Operacao realizada com sucesso !';

              this.getVendedorProspectos();
            } else {
              this.submitStatus = response;
            }
          })
          .catch(error => {
            this.submitStatus = error;
          });
    },
    remover() {
      this.axios.delete('/prospectos', {
        headers: {Authorization: false},
        data: {
          pid: this.selected.pid
        }
      })
          .then(response => {
            if (response.status === 200) {
              this.submitStatus = 'Operacao realizada com sucesso !';
            } else {
              this.submitStatus = "Registro possue restrições de chave estrangeira e não pode ser removido";
            }
            this.getVendedorProspectos();
          })
          .catch(error => {
            this.submitStatus = error;
          });
    }

  }
}
</script>

<style lang="scss" scoped>

</style>