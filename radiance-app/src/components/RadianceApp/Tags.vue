<template>
  <v-container ma-0 pa-0 fluid>
    <v-layout class="pt-12">
      <v-card color="grey darken-4" dark>
        <v-card-title class="mx-6"
          ><v-icon large class="mx-3"> mdi-tag-outline </v-icon>Tags</v-card-title
        >
      </v-card>
    </v-layout>
    <v-container fluid fill-height>
      <v-layout child-flex>
        <v-data-table
          :headers="headers"
          :items="tags"
          :loading="loading"
          loading-text="Cargando... Por favor espere"
          class="elevation-6"
          :footer-props="{
            'items-per-page-text': 'Tags por página',
            'items-per-page-all-text': 'Todos',
            'page-text': '{0}-{1} de {2}',
          }"
        >
          <template v-slot:item.icon="{ item }">
            <v-icon large :color="item.color">{{ item.icon }}</v-icon>
          </template>
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
                      >Nuevo Tag</v-btn
                    >
                  </v-layout>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-subheader>Nombre de la tecnología</v-subheader>
                      <v-row class="py-3">
                        <v-text-field v-model="editedItem.name" solo></v-text-field>
                      </v-row>
                      <v-subheader>Icono para la tecnología</v-subheader>
                      <v-row class="py-3">
                        <v-autocomplete
                          solo
                          v-model="editedItem.icon"
                          :items="publicTags"
                        ></v-autocomplete>
                      </v-row>
                      <v-subheader>Color para el ícono</v-subheader>
                      <v-container fluid fill-height>
                        <v-layout justify-center flex-child>
                          <v-color-picker
                            v-model="editedItem.color"
                            dot-size="30"
                            hide-inputs
                            hide-mode-switch
                            mode="hexa"
                          ></v-color-picker>
                        </v-layout>
                      </v-container>
                      <v-layout justify-center class="py-3">
                        <v-card elevation="0">
                          <v-icon size="80" :color="editedItem.color">{{
                            editedItem.icon
                          }}</v-icon>
                        </v-card>
                      </v-layout>
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
                      @click="deleteItemConfirm(editedItem.tagId)"
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
              >La lista de tags esta vacía. Agrega un tag para verlo en la lista.</span
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
  name: "Tags",
  data: () => ({
    loading: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nombre",
        align: "center",
        value: "name",
      },
      { text: "Icono", align: "center", value: "icon", sortable: false },
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
    tags: [],
    publicTags: [],
    editedIndex: -1,
    editedItem: {
      tagId: "",
      name: "",
      icon: "",
      color: "",
      isDelete: "",
    },
    defaultItem: {
      tagId: "",
      name: "",
      icon: "",
      color: "",
      isDelete: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Tag" : "Editar Tag";
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
      axios.get("tag/").then((response) => {
        if (response.status == 200) {
          this.tags = response.data.tags;
        } else {
          console.log(response.status);
        }
      });
      this.loading = false;

      this.publicTags = [
        "mdi-ab-testing",
        "mdi-android",
        "mdi-angular",
        "mdi-angularjs",
        "mdi-ansible",
        "mdi-apache-kafka",
        "mdi-api",
        "mdi-apple",
        "mdi-apple-finder",
        "mdi-apple-icloud",
        "mdi-apple-ios",
        "mdi-apple-safari",
        "mdi-application-array",
        "mdi-application-array-outline",
        "mdi-application-braces",
        "mdi-application-braces-outline",
        "mdi-application-brackets",
        "mdi-application-brackets-outline",
        "mdi-application-parentheses",
        "mdi-application-parentheses-outline",
        "mdi-application-variable",
        "mdi-application-variable-outline",
        "mdi-arch",
        "mdi-artstation",
        "mdi-atlassian",
        "mdi-aws",
        "mdi-babel",
        "mdi-bash",
        "mdi-bitbucket",
        "mdi-bitcoin",
        "mdi-black-mesa",
        "mdi-blender-software",
        "mdi-bootstrap",
        "mdi-box",
        "mdi-bulma",
        "mdi-code-array",
        "mdi-code-braces",
        "mdi-code-braces-box",
        "mdi-code-brackets",
        "mdi-code-equal",
        "mdi-code-greater-than",
        "mdi-code-greater-than-or-equal",
        "mdi-code-less-than",
        "mdi-code-less-than-or-equal",
        "mdi-code-not-equal",
        "mdi-code-not-equal-variant",
        "mdi-code-parentheses",
        "mdi-code-parentheses-box",
        "mdi-code-string",
        "mdi-code-tags",
        "mdi-code-tags-check",
        "mdi-codepen",
        "mdi-cordova",
        "mdi-creative-commons",
        "mdi-cryengine",
        "mdi-debian",
        "mdi-dev-to",
        "mdi-deviantart",
        "mdi-discord",
        "mdi-disqus",
        "mdi-dlna",
        "mdi-docker",
        "mdi-dolby",
        "mdi-dot-net",
        "mdi-dropbox",
        "mdi-drupal",
        "mdi-electron-framework",
        "mdi-ember",
        "mdi-emby",
        "mdi-eslint",
        "mdi-ethereum",
        "mdi-evernote",
        "mdi-facebook",
        "mdi-facebook-gaming",
        "mdi-facebook-messenger",
        "mdi-facebook-workplace",
        "mdi-fedora",
        "mdi-file-code-outline",
        "mdi-firebase",
        "mdi-firefox",
        "mdi-font-awesome",
        "mdi-freebsd",
        "mdi-gatsby",
        "mdi-gentoo",
        "mdi-git",
        "mdi-github",
        "mdi-gmail",
        "mdi-gnome",
        "mdi-gog",
        "mdi-Google",
        "mdi-google",
        "mdi-google-ads",
        "mdi-google-analytics",
        "mdi-google-assistant",
        "mdi-google-cardboard",
        "mdi-google-chrome",
        "mdi-google-classroom",
        "mdi-google-cloud",
        "mdi-google-drive",
        "mdi-google-earth",
        "mdi-google-fit",
        "mdi-google-glass",
        "mdi-google-hangouts",
        "mdi-google-keep",
        "mdi-google-maps",
        "mdi-google-play",
        "mdi-google-plus",
        "mdi-google-translate",
        "mdi-graphql",
        "mdi-hexadecimal",
        "mdi-home-assistant",
        "mdi-hulu",
        "mdi-humble-bundle",
        "mdi-identifier",
        "mdi-instagram",
        "mdi-iobroker",
        "mdi-jabber",
        "mdi-jira",
        "mdi-jquery",
        "mdi-jsfiddle",
        "mdi-kickstarter",
        "mdi-kodi",
        "mdi-kubernetes",
        "mdi-language-c",
        "mdi-language-cpp",
        "mdi-language-csharp",
        "mdi-language-css3",
        "mdi-language-go",
        "mdi-language-haskell",
        "mdi-language-html5",
        "mdi-language-java",
        "mdi-language-javascript",
        "mdi-language-lua",
        "mdi-language-markdown",
        "mdi-language-markdown-outline",
        "mdi-language-php",
        "mdi-language-python",
        "mdi-language-r",
        "mdi-language-ruby-on-rails",
        "mdi-language-rust",
        "mdi-language-swift",
        "mdi-language-typescript",
        "mdi-lastpass",
        "mdi-linkedin",
        "mdi-linux",
        "mdi-linux-mint",
        "mdi-litecoin",
        "mdi-lumx",
        "mdi-manjaro",
        "mdi-mastodon",
        "mdi-material-ui",
        "mdi-math-norm",
        "mdi-math-norm-box",
        "mdi-meteor",
        "mdi-microsoft",
        "mdi-microsoft-access",
        "mdi-microsoft-azure",
        "mdi-microsoft-azure-devops",
        "mdi-microsoft-bing",
        "mdi-microsoft-dynamics-365",
        "mdi-microsoft-edge",
        "mdi-microsoft-excel",
        "mdi-microsoft-internet-explorer",
        "mdi-microsoft-office",
        "mdi-microsoft-onedrive",
        "mdi-microsoft-onenote",
        "mdi-microsoft-outlook",
        "mdi-microsoft-powerpoint",
        "mdi-microsoft-sharepoint",
        "mdi-microsoft-teams",
        "mdi-microsoft-visual-studio",
        "mdi-microsoft-windows",
        "mdi-microsoft-windows-classic",
        "mdi-microsoft-word",
        "mdi-microsoft-xbox",
        "mdi-midi",
        "mdi-minecraft",
        "mdi-nativescript",
        "mdi-netflix",
        "mdi-nintendo-switch",
        "mdi-nintendo-wii",
        "mdi-nintendo-wiiu",
        "mdi-nix",
        "mdi-nodejs",
        "mdi-npm",
        "mdi-nuxt",
        "mdi-oci",
        "mdi-odnoklassniki",
        "mdi-onepassword",
        "mdi-openid",
        "mdi-opera",
        "mdi-origin",
        "mdi-pandora",
        "mdi-patreon",
        "mdi-pi-hole",
        "mdi-pinterest",
        "mdi-plex",
        "mdi-polymer",
        "mdi-qqchat",
        "mdi-react",
        "mdi-reddit",
        "mdi-rollupjs",
        "mdi-salesforce",
        "mdi-sass",
        "mdi-semantic-web",
        "mdi-simple-icons",
        "mdi-sina-weibo",
        "mdi-skype",
        "mdi-skype-business",
        "mdi-slack",
        "mdi-snapchat",
        "mdi-sony-playstation",
        "mdi-soundcloud",
        "mdi-source-branch",
        "mdi-source-branch-check",
        "mdi-source-branch-minus",
        "mdi-source-branch-plus",
        "mdi-source-branch-refresh",
        "mdi-source-branch-remove",
        "mdi-source-branch-sync",
        "mdi-source-fork",
        "mdi-source-merge",
        "mdi-source-pull",
        "mdi-source-repository",
        "mdi-source-repository-multiple",
        "mdi-spotify",
        "mdi-stack-exchange",
        "mdi-stack-overflow",
        "mdi-stackpath",
        "mdi-steam",
        "mdi-teamviewer",
        "mdi-terraform",
        "mdi-trello",
        "mdi-twitch",
        "mdi-twitter",
        "mdi-ubisoft",
        "mdi-ubuntu",
        "mdi-umbraco",
        "mdi-unity",
        "mdi-unreal",
        "mdi-variable",
        "mdi-vimeo",
        "mdi-vlc",
        "mdi-vuejs",
        "mdi-webpack",
        "mdi-wechat",
        "mdi-whatsapp",
        "mdi-wikipedia",
        "mdi-wordpress",
        "mdi-xamarin",
        "mdi-xml",
        "mdi-xmpp",
        "mdi-yahoo",
        "mdi-youtube",
        "mdi-youtube-gaming",
        "mdi-youtube-studio",
        "mdi-youtube-tv",
        "mdi-zend",
      ];
    },

    editItem(item) {
      this.editedIndex = this.tags.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.tags.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(tagId) {
      this.loading = true;
      axios.delete("tag/" + tagId).then((response) => {
        if (response.status == 200) {
          this.tags.splice(this.editedIndex, 1);
          this.loading = false;
          let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Tag eliminado correctamente.",
              alert_color: "success"
            };
            this.$emit('chanceAlert', alert);
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
          name: item.name,
          icon: item.icon,
          color: item.color,
        };
        axios.post("tag/", json).then((response) => {
          if (response.status == 200) {
            this.editedItem.tagId = response.data.tagId;
            if (this.editedIndex > -1) {
              Object.assign(this.tags[this.editedIndex], this.editedItem);
            } else {
              this.tags.push(this.editedItem);
            }
            this.loading = false;
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Tag creado correctamente.",
              alert_color: "success"
            };
            this.$emit('chanceAlert', alert);

            this.close();
          } else {
            console.log(response.status);
          }
        });
      } else {
        this.loading = true;
        let json = {
          tagId: item.tagId,
          name: item.name,
          icon: item.icon,
          color: item.color,
        };
        axios.put("tag/" + json.tagId, json).then((response) => {
          if (response.status == 200) {
            this.editedItem.tagId = response.data.tagId;
            if (this.editedIndex > -1) {
              Object.assign(this.tags[this.editedIndex], this.editedItem);
            } else {
              this.tags.push(this.editedItem);
            }
            this.loading = false;
            let alert = {
              alert: true,
              alert_active: true,
              alert_message: "Tag editado correctamente.",
              alert_color: "success"
            };
            this.$emit('chanceAlert', alert);
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
