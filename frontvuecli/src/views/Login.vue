<template>
  <div>


    <b-container class="container">

      <!--  HEADER  -->
      <div class="py-3 text-center">

        <h2>Login</h2>

      </div>

      <!--  CORPO -->
      <b-row class="justify-content-center">


        <!--FORMULARIO        -->
        <b-col class="col-12 col-md-6">
          <b-form @submit.stop.prevent="onSubmit">

            <!-- EMAIL -->
            <b-form-group id="bgroup2" label="Email" label-for="inp2">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <b-icon icon="mailbox" variant="secondary"></b-icon> </span>
                </div>

                <b-form-input
                    id="inp2"
                    v-model="$v.email.$model"
                    :state="validateState('email')"
                    aria-describedby="live2"
                    name="inp2"
                ></b-form-input>

                <b-form-invalid-feedback id="live2">
                  {{ this.err.email }}
                </b-form-invalid-feedback>
              </div>
            </b-form-group>


            <!-- Senha -->
            <b-form-group id="bgroup3" label="Senha" label-for="inp3">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <b-icon icon="key" variant="secondary"></b-icon> </span>
                </div>

                <b-form-input
                    id="inp3"
                    type="password"
                    v-model="$v.senha.$model"
                    :state="validateState('senha')"
                    aria-describedby="live3"
                    name="inp3"
                ></b-form-input>

                <b-form-invalid-feedback id="live3">
                  {{ this.err.required }}
                </b-form-invalid-feedback>
              </div>
            </b-form-group>


            <div v-if="errorLogin">
              <hr class="mb-4">
              <div  class="text-danger"> {{ this.errorLogin }}</div>
            </div>

              <router-link to="/vendedor" class="float-right">Registrar-se</router-link>

              <b-button class="bg-primary mr-n5" type="submit">Entrar</b-button>

            <hr class="mb-4">

          </b-form>


        </b-col>


      </b-row>


    </b-container>
    <!-- FIM TEMPLATE !-->

  </div>
</template>

<script>
import {email, required} from "vuelidate/lib/validators";

export default {
  name: 'Login',
  data() {
    return {
      errorLogin: undefined,
      email: undefined,
      senha: undefined,
      err: {
        required: 'Este campo é obrigatório.',
        email: 'Campo deve ser um e-mail válido.',
      }
    }
  },
  validations: {
    email: {
      email,
      required
    },
    senha: {
      required
    }
  },
  methods: {
    signIn() {

        this.axios.post('/login', {
            email: this.email, senha: this.senha
          })
          .then(response => {
            if(response.status === 200) {
              this.logged = true;
              this.errorLogin = undefined;
              this.$store.commit('loggedIn')
              this.$store.commit('setEmailLoggedIn', this.email)
              this.$router.push('/home')
            } else {
              this.errorLogin = 'Usuário não encontrado (' + response.status + ')';
              this.$store.commit('loggedOut')
            }
          })
          .catch(error => {
            this.errorLogin = error;
          });
    }
    ,//BEGIN VUELIDATE
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }

      this.signIn();
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
