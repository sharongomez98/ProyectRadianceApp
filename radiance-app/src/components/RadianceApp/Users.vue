<template>
  <v-container ma-0 pa-0 fluid>
    <v-layout class="pt-12">
      <v-card color="grey darken-4" dark>
        <v-card-title class="mx-6"
          ><v-icon large class="mx-3">mdi-account-multiple </v-icon>Usuarios</v-card-title
        >
      </v-card>
    </v-layout>
    <v-container fluid fill-height>
      <v-layout child-flex>
        <v-data-table
          :headers="headers"
          :items="users"
          :loading="loading"
          loading-text="Cargando... Por favor espere"
          class="elevation-6"
          :footer-props="{
            'items-per-page-text': 'Usuarios por página',
            'items-per-page-all-text': 'Todos',
            'page-text': '{0}-{1} de {2}',
          }"
        >
          <template v-slot:top>
            <v-card elevation="0">
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-layout justify-end>
                    <v-btn
                      class="ma-6"
                      color="grey darken-4"
                      dark
                      x-large
                      v-bind="attrs"
                      v-on="on"
                      >Nuevo Usuario</v-btn
                    >
                  </v-layout>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <h3 class="format">Datos personales</h3>
                      <v-text-field
                        label="Nombres y Apellidos"
                        placeholder="Nombres y Apellidos"
                        name="name"
                        type="text"
                        solo
                        v-model="editedItem.name"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Correo electrónico"
                        placeholder="Correo electrónico"
                        name="email"
                        type="text"
                        solo
                        v-model="editedItem.mail"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Teléfono"
                        placeholder="Teléfono"
                        name="phone"
                        type="text"
                        solo
                        v-model="editedItem.phoneNumber"
                      >
                      </v-text-field>
                      <h3 class="format">Datos del usuario</h3>
                      <v-text-field
                        label="Usuario"
                        placeholder="Usuario"
                        name="username"
                        type="text"
                        solo
                        v-model="editedItem.user"
                      >
                      </v-text-field>
                      <v-text-field
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        label="Contraseña"
                        placeholder="Contraseña"
                        name="password"
                        solo
                        color="#F37154"
                        v-model="editedItem.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                      ></v-text-field>
                      <h3 class="format">Datos de la suscripción</h3>
                      <v-subheader>Tipo de suscripción</v-subheader>
                      
                      <v-row class="py-3">
                        <v-autocomplete
                          v-model="editedItem.subscriptionType"
                          :items="suscriptionTypes"
                          solo
                          chips
                          color="deep-orange lighten-3"
                          item-text="name"
                          return-object
                        >
                        </v-autocomplete>
                      </v-row>
                      <span>{{"span"}}{{editedItem}}</span>
                      <h3 class="format">Datos de pago</h3>
                      <v-text-field
                        label="Número de tarjeta crédito/débito"
                        placeholder="XXXX XXXX XXXX XXXX"
                        name="username"
                        type="number"
                        solo
                        v-model="editedItem.card"
                      >
                      </v-text-field>
                      <v-text-field
                        label="Fecha de expiración"
                        placeholder="MM/YY"
                        name="username"
                        type="text"
                        solo
                        v-model="editedItem.expirationDate"
                      >
                      </v-text-field>
                      <v-text-field
                        label="CVC"
                        placeholder="CVC"
                        name="username"
                        type="text"
                        solo
                        v-model="editedItem.card"
                      >
                      </v-text-field>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed @click="close"> Cancelar </v-btn>
                    <v-btn
                      depressed
                      color="primary"
                      :loading="loading"
                      @click="save(editedItem)"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          </template>
          <template v-slot:no-data>
            <span
              >La lista de usuarios esta vacía. Agrega un usuario para verlo en
              la lista.</span
            >
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "Users",
  data: () => ({
    loading: true,
    dialog: false,
    showPassword: false,
    headers: [
      {
        text: "Nombre",
        align: "center",
        value: "name",
      },
      { text: "Email", align: "center", value: "mail", sortable: false },
      { text: "Teléfono", align: "center", value: "phoneNumber", sortable: false },
      { text: "Role", align: "center", value: "role", sortable: false },
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
    users: [],
    suscriptionTypes: [],
    editedIndex: -1,
    editedItem: {
      userId: "",
      name: "",
      mail: "",
      phoneNumber: "",
      role: "",
      image: "",
      user: "",
      password: "",
      isVerified: "",
      subscriptionType: null,
    },
    defaultItem: {
      userId: "",
      name: "",
      mail: "",
      phoneNumber: "",
      role: "",
      image: "",
      user: "",
      password: "",
      isVerified: "",
      subscriptionType: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.loading = true;
      axios.get("subscriptiontype/").then((response) => {
        if (response.status == 200) {
          this.suscriptionTypes = response.data;
        } else {
          console.log(response.status);
        }
      });
      axios.get("user/").then((response) => {
        if (response.status == 200) {
          this.users = response.data.users;
        } else {
          console.log(response.status);
        }
      });
      
      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save(item) {
      if (this.editedIndex == -1) {
        console.log(item)
        this.loading = true;
        let json = {
          name: item.name,
          mail: item.mail,
          phoneNumber: item.phoneNumber,
          role: "",
          image: "",
          user: item.user,
          password: item.password,
          isVerified: "",
          subscription: {
            finalizationDate: "",
            status: "",
            subscriptionType: {
              subscriptionTypeId: item.subscriptionType.subscriptionTypeId,
              name: item.subscriptionType.name,
              price: item.subscriptionType.price,
              description: item.subscriptionType.description,
            },
          },
        };
        console.log(json);
        axios.post("user/", json).then((response) => {
          if (response.status == 200) {
            this.editedItem.subscriptionTypeId = response.data.subscriptionTypeId;
            if (this.editedIndex > -1) {
              Object.assign(this.users[this.editedIndex], this.editedItem);
            } else {
              this.users.push(this.editedItem);
            }
            this.loading = false;
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Usuario creado correctamente.",
              alert_color: "success",
            };
            this.$emit("chanceAlert", alert);

            this.close();
          } else {
            console.log(response.status);
            this.loading = false;
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Error al crear usuario. Intente de nuevo más tarde.",
              alert_color: "error",
            };
            this.$emit("chanceAlert", alert);
          }
        });
      }
    },
  },
};
</script>
<style>
.card-title {
  padding: 0px 0px;
}
h3.format {
  font-family: "Montserrat" !important;
  font-size: 18px !important;
  margin: 32px 0px !important;
  color: #8a8a8a !important;
  font-weight: 500 !important;
}
</style>
