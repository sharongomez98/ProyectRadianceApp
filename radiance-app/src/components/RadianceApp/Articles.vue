<template>
  <v-container ma-0 pa-0 fluid>
    <v-layout class="pt-12">
      <v-card color="grey darken-4" dark>
        <v-card-title class="mx-6"
          ><v-icon large class="mx-3">mdi-newspaper-variant </v-icon
          >Artículos</v-card-title
        >
      </v-card>
    </v-layout>
    <v-container fluid fill-height>
      <v-layout child-flex>
        <v-data-table
          :headers="headers"
          :items="articles"
          :loading="loading"
          loading-text="Cargando... Por favor espere"
          class="elevation-6"
          :footer-props="{
            'items-per-page-text': 'Artículos por página',
            'items-per-page-all-text': 'Todos',
            'page-text': '{0}-{1} de {2}',
          }"
        >
          <template v-slot:item.icon="{ item }">
            <v-icon large :color="item.color">{{ item.icon }}</v-icon>
          </template>
          <template v-slot:top>
            <v-card elevation="0">
              <v-dialog v-model="dialog" max-width="900px">
                <template v-slot:activator="{ on, attrs }">
                  <v-layout justify-end>
                    <v-btn
                      class="ma-6"
                      color="grey darken-4"
                      dark
                      x-large
                      v-bind="attrs"
                      v-on="on"
                      >Nuevo Artículo</v-btn
                    >
                  </v-layout>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-text-field
                        label="Nombre del artículo"
                        placeholder="Nombre del artículo"
                        name="name"
                        type="text"
                        solo
                        v-model="editedItem.tittle"
                      >
                      </v-text-field>
                      <v-textarea
                        label="Descripción del artículo"
                        placeholder="Descripción del artículo"
                        name="description"
                        type="text"
                        solo
                        color="#F37154"
                        rows="3"
                        v-model="editedItem.description"
                      >
                      </v-textarea>
                      <v-text-field
                        label="Imagen para el artículo"
                        placeholder="url de la imagen"
                        name="name"
                        type="text"
                        solo
                        v-model="editedItem.image"
                      >
                      </v-text-field>
                       <v-container>
                          <v-img :src=editedItem.image></v-img>
                      </v-container>
                      <v-subheader>Agregar tags al artículo</v-subheader>
                      <v-autocomplete
                        v-model="editedItem.tags"
                        :items="tags"
                        solo
                        chips
                        multiple
                        color="white"
                        item-text="name"
                        return-object
                      >
                        <template v-slot:selection="data">
                          <v-chip
                            dark
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            @click="data.select"
                          >
                            <v-avatar left>
                              <v-icon :color="data.item.color">{{
                                data.item.icon
                              }}</v-icon>
                            </v-avatar>
                            {{ data.item.name }}
                          </v-chip>
                        </template>
                        <template  v-slot:item="data">
                          <template v-if="typeof data.item !== 'object'">
                            <v-list-item-content v-text="data.item"></v-list-item-content>
                          </template>
                          <template v-else>
                            <v-list-item-avatar>
                              <v-icon :color="data.item.color">{{
                                data.item.icon
                              }}</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title
                                v-html="data.item.name"
                              ></v-list-item-title>
                              <v-list-item-subtitle
                                v-html="data.item.group"
                              ></v-list-item-subtitle>
                            </v-list-item-content>
                          </template>
                        </template>
                      </v-autocomplete>
                      <v-textarea
                        label="Contenido del artículo"
                        placeholder="Contenido del artículo"
                        name="content"
                        type="text"
                        solo
                        color="#F37154"
                        rows="15"
                        v-model="editedItem.content"
                      >
                      </v-textarea>
                      <span v-html="editedItem.content"></span>
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
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title
                    >¿Esta seguro que desea eliminar este elemento?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed @click="closeDelete">Cancelar</v-btn>
                    <v-btn
                      depressed
                      color="error"
                      :loading="loading"
                      @click="deleteItemConfirm(editedItem.articleId)"
                      >Eliminar</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <span
              >La lista de artículos esta vacía. Agrega un artículo para verlo en la
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
import store from "../../store/index";

export default {
  name: "Tags",
  data: () => {
    return ({
      loading: true,
      dialog: false,
      dialogDelete: false,
      role: store.getters["role"],
      headers: [
        {
          text: "Nombre",
          align: "center",
          value: "tittle",
        },
        { text: "Fecha de modificación", align: "center", value: "lastModifyDate", sortable: false },
        { text: "Creado por", align: "center", value: "user.name", sortable: false },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      articles: [],
      tags: [],
      editedIndex: -1,
      editedItem: {
        articleId: "",
        creationDate: "",
        tittle: "",
        description: "",
        content: "",
        user: {},
        lastModifyDate: "",
        image: "",
        tags: [],
      },
      defaultItem: {
        articleId: "",
        creationDate: "",
        tittle: "",
        description: "",
        content: "",
        user: {},
        lastModifyDate: "",
        image: "",
        tags: [],
      },
    });
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Artículo" : "Editar Artículo";
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
      this.getArticles();
      axios
        .get("tag/")
        .then((response) => {
          if (response.status == 200) {
            this.tags = response.data;
          } else {
            console.log(response.status);
          }
        })
        .catch((error) => {
          console.log(response.status);
          let alert = {
            alert: true,
            alert_active: true,
            alert_message: "No se pudo obtener la lista de tags",
            alert_color: "error",
          };
          this.$emit("chanceAlert", alert);
        });
      this.loading = false;
    },

    getArticles() {
        axios
        .get("article/")
        .then((response) => {
          if (response.status == 200) {
            this.articles = response.data;
          } else {
            console.log(response.status);
          }
        })
        .catch((error) => {
          console.log(response.status);
          let alert = {
            alert: true,
            alert_active: true,
            alert_message: "No se pudo obtener la lista de artículos",
            alert_color: "error",
          };
          this.$emit("chanceAlert", alert);
        });
    },

    editItem(item) {
      this.editedIndex = this.articles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.articles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(articleId) {
      this.loading = true;
      axios.delete("article/" + articleId).then((response) => {
        if (response.status == 200) {
          this.articles.splice(this.editedIndex, 1);
          this.loading = false;
          let alert = {
            alert: true,
            alert_active: true,
            alert_message: "Artículo eliminado correctamente.",
            alert_color: "success",
          };
          this.$emit("chanceAlert", alert);
          this.closeDelete();
        }
      }).catch((error) => {
          this.loading = false;
          let alert = {
            alert: true,
            alert_active: true,
            alert_message: "Algo salió mal durante la eliminación del artículo. Por favor, vuelve a intentarlo más tarde.",
            alert_color: "error",
          };
          this.$emit("chanceAlert", alert);
          this.closeDelete();
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
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
        this.loading = true;
        let json = {
          tittle: item.tittle,
          description: item.description,
          content: item.content,
          image: item.image,
          tags: item.tags,
        };
        axios.post("article/", json).then((response) => {
          if (response.status == 200) {
            /* this.editedItem.articleId = response.data.articleId;
            if (this.editedIndex > -1) {
              Object.assign(this.articles[this.editedIndex], this.editedItem);
            } else {
              this.articles.push(this.editedItem);
            } */
            this.loading = false;
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Artículo creado correctamente.",
              alert_color: "success",
            };
            this.$emit("chanceAlert", alert);

            this.close();
          }
        }).catch((error) => {
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Algo salió mal durante la creación del artículo. Por favor, vuelve a intentarlo más tarde.",
              alert_color: "error",
            };
            this.$emit("chanceAlert", alert);
            this.close();
        })
      } else {
        this.loading = true;
        let json = {
          articleId: item.articleId,
          creationDate: item.creationDate,
          tittle: item.tittle,
          description: item.description,
          content: item.content,
          user: item.user,
          lastModifyDate: item.lastModifyDate,
          image: item.image,
          tags: item.tags,
        };
        axios.put("article/" + json.articleId, json).then((response) => {
          if (response.status == 200) {
            /* this.editedItem.articleId = response.data.articleId;
            if (this.editedIndex > -1) {
              Object.assign(this.articles[this.editedIndex], this.editedItem);
            } else {
              this.articles.push(this.editedItem);
            } */
            this.loading = false;
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Artículo editado correctamente.",
              alert_color: "success",
            };
            this.$emit("chanceAlert", alert);
            this.close();
          }
        }).catch((error) => {
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Algo salió mal durante la actualización del artículo. Por favor, vuelve a intentarlo más tarde.",
              alert_color: "error",
            };
            this.$emit("chanceAlert", alert);
            this.close();
        })
      }
      this.getArticles();
    },
  },
};
</script>
<style>
.card-title {
  padding: 0px 0px;
}
</style>
