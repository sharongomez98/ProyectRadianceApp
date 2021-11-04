<template>
  <v-container ma-0 pa-0 fluid>
    <v-layout class="pt-12">
      <v-card color="grey darken-4" dark>
        <v-card-title class="mx-6"
          ><v-icon large class="mx-3"> mdi-format-list-checks </v-icon
          >Suscripciones</v-card-title
        >
      </v-card>
    </v-layout>
    <v-container fluid fill-height>
      <v-layout child-flex>
        <v-data-table
          :headers="headers"
          :items="subscriptionTypes"
          :loading="loading"
          loading-text="Cargando... Por favor espere"
          class="elevation-6"
          :footer-props="{
            'items-per-page-text': 'Suscripciones por página',
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
                      >Nueva Suscripción</v-btn
                    >
                  </v-layout>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-subheader>Nombre de la suscripción</v-subheader>
                      <v-row class="py-3">
                        <v-text-field v-model="editedItem.name" solo></v-text-field>
                      </v-row>
                      <v-subheader>Precio de la suscripción</v-subheader>
                      <v-row class="py-3">
                        <v-text-field
                          v-model="editedItem.price"
                          solo
                          type="number"
                        ></v-text-field>
                      </v-row>
                      <v-subheader>Descripción de la suscripción</v-subheader>

                      <v-row class="py-3">
                        <v-textarea
                          type="text"
                          solo
                          rows="10"
                          v-model="editedItem.description"
                          class="py-3"
                        >
                        </v-textarea>
                      </v-row>
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
              >La lista de suscripciones esta vacía. Agrega una suscripción para verla en
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
  name: "SuscriptionTypes",
  data: () => ({
    loading: true,
    dialog: false,
    headers: [
      {
        text: "Nombre",
        align: "center",
        value: "name",
      },
      { text: "Precio", align: "center", value: "price", sortable: false },
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
    subscriptionTypes: [],
    editedIndex: -1,
    editedItem: {
      subscriptionTypeId: "",
      name: "",
      price: "",
      description: "",
    },
    defaultItem: {
      subscriptionTypeId: "",
      name: "",
      price: "",
      description: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nueva Suscripción" : "Editar Suscripción";
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
          this.subscriptionTypes = response.data;
        } else {
          console.log(response.status);
        }
      });
      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.subscriptionTypes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.subscriptionTypes.indexOf(item);
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
        this.loading = true;
        let json = {
          name: item.name,
          price: item.price,
          description: item.description,
        };
        axios.post("subscriptiontype/", json).then((response) => {
          if (response.status == 200) {
            this.editedItem.subscriptionTypeId = response.data.subscriptionTypeId;
            if (this.editedIndex > -1) {
              Object.assign(this.subscriptionTypes[this.editedIndex], this.editedItem);
            } else {
              this.subscriptionTypes.push(this.editedItem);
            }
            this.loading = false;
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Suscripción creada correctamente.",
              alert_color: "success",
            };
            this.$emit("chanceAlert", alert);

            this.close();
          } else {
            console.log(response.status);
          }
        });
      } else {
        this.loading = true;
        let json = {
          subscriptionTypeId: item.subscriptionTypeId,
          name: item.name,
          price: item.price,
          description: item.description,
        };
        axios.put("subscriptiontype/" + json.subscriptionTypeId, json).then((response) => {
          if (response.status == 200) {
            this.editedItem.subscriptionTypeId = response.data.subscriptionTypeId;
            if (this.editedIndex > -1) {
              Object.assign(this.subscriptionTypes[this.editedIndex], this.editedItem);
            } else {
              this.subscriptionTypes.push(this.editedItem);
            }
            this.loading = false;
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Suscripción editada correctamente.",
              alert_color: "success",
            };
            this.$emit("chanceAlert", alert);
            this.close();
          } else {
            console.log(response.status);
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
</style>
