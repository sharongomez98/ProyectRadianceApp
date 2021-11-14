<template>
  <v-container ma-0 pa-0 fluid>
    <v-layout class="pt-12">
      <v-card color="grey darken-4" dark>
        <v-card-title class="mx-6"
          ><v-icon large class="mx-3">mdi-wallet </v-icon>Pagos</v-card-title
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
              <v-dialog v-model="dialog" max-width="700px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-subheader>Detalles de usuario</v-subheader>
                      <v-container>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-center">Propiedad</th>
                                <th class="text-center">Valor</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td class="text-center">{{ "Nombre de usuario" }}</td>
                                <td class="text-center">{{ editedItem.name }}</td>
                              </tr>
                              <tr>
                                <td class="text-center">{{ "Usuario" }}</td>
                                <td class="text-center">{{ editedItem.user }}</td>
                              </tr>
                              <tr>
                                <td class="text-center">{{ "Correo" }}</td>
                                <td class="text-center">{{ editedItem.mail }}</td>
                              </tr>
                              <tr>
                                <td class="text-center">{{ "Teléfono" }}</td>
                                <td class="text-center">{{ editedItem.phoneNumber }}</td>
                              </tr>
                              <tr>
                                <td class="text-center">{{ "Rol Actual" }}</td>
                                <td class="text-center">{{ editedItem.role }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-container>
                      <v-subheader>Detalles de suscripción</v-subheader>
                      <v-container>
                        <v-simple-table>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td class="text-center">{{ "Fecha de finalización" }}</td>
                                <td class="text-center">{{ editedItem.subscription.finalizationDate }}</td>
                              </tr>
                              <tr>
                                <td class="text-center">{{ "Suscripción actual" }}</td>
                                <td class="text-center">
                                  {{ editedItem.subscription.subscriptionType.name }}
                                </td>
                              </tr>
                              <tr>
                                <td class="text-center">{{ "Precio de suscripción" }}</td>
                                <td class="text-center">
                                  {{ "$"
                                  }}{{ editedItem.subscription.subscriptionType.price }}
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-container>
                      <v-subheader>Historial de pagos</v-subheader>
                      <v-container>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-center">Monto</th>
                                <th class="text-center">Fecha</th>
                                
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item, index) in historyItem" :key="index">
                                <td class="text-center">{{ item.amount }}</td>
                                <td class="text-center">{{ item.date }}</td>
                                
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-container>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed color="primary" @click="close"> Cerrar </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="viewItem(item)"> mdi-eye </v-icon>
          </template>
          <template v-slot:no-data>
            <span
              >La lista de usuarios esta vacía. Agrega un usuario para verlo en la
              lista.</span
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
  name: "Payments",
  data: () => ({
    loading: true,
    dialog: false,
    dialogDelete: false,
    showPassword: false,
    headers: [
      {
        text: "Nombre",
        align: "start",
        value: "name",
      },
      { text: "Email", align: "start", value: "mail", sortable: false },
      { text: "Usuario", align: "start", value: "user", sortable: false },
      { text: "Rol", align: "start", value: "role", sortable: false },
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
      subscription:{
        finalizationDate: "",
         subscriptionType: {
           name: "",
           price: "",
         },
      },
    },
    historyItem: {},
    defaultHisitoryItem: null,
  }),

  computed: {
    formTitle() {
      return "Historial de pagos del usuario";
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
          this.users = response.data;
        } else {
          console.log(response.status);
        }
      });

      this.loading = false;
    },

    viewItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      axios
        .get("payment/" + this.editedItem.userId)
        .then((response) => {
          if (response.status == 200) {
            this.historyItem = response.data;
            this.dialog = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      //this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(userId) {
      this.loading = true;
      axios.delete("user/" + userId).then((response) => {
        if (response.status == 200) {
          this.users.splice(this.editedIndex, 1);
          this.loading = false;
          let alert = {
            alert: true,
            alert_active: true,
            alert_message: "Usuario eliminado correctamente.",
            alert_color: "success",
          };
          this.$emit("chanceAlert", alert);
          this.closeDelete();
        } else {
          console.log(response.status);
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.historyItem = Object.assign({}, this.defaultHisitoryItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save(item) {
      if (this.editedIndex == -1) {
        console.log(item);
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
