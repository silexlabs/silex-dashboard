import '/js/vue.global.prod.js'
import '/js/main.js'

const { createApp } = Vue;
const { api, constants, types } = silex;
const {
  ConnectorType,
} = types
const {
  setServerUrl,
  getUser,
  logout,
  websiteDelete,
  websiteDuplicate,
  websiteList,
  websiteCreate,
  websiteMetaWrite,
} = api
function toSafeId(name) {
  return name.replace(/[/\\?%*:|"<>]/g, '_')
}

const App = {
  data() {
    return {
      websites: [],
      newWebsiteName: '',
      showCreationForm: false,
      error: null,
      message: null,
      loggedIn: false,
      loading: true,
      storage: null,
      user: null,
      showMenu: false,
      empty: false,
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    async init() {
      try {
        // Init Silex server path
        // Go up one level because of the language prefix
        setServerUrl(window.location.origin)
        // Start
        const user = await getUser({ type: ConnectorType.STORAGE })
        // Escape single quotes in the picture URL and decode the picture URL
        user.picture = decodeURIComponent(user.picture).replace(/'/g, "\\'")
        if (user) {
          this.user = user
          this.loggedIn = true
          this.websites = await websiteList({ connectorId: this.user.storage.connectorId })
          this.empty = this.websites.length === 0
          this.loading = false
        } else {
          this.openLogin()
        }
      } catch (error) {
        console.error(error)
        this.loading = false
        if (error.code === 401 || error.httpStatusCode === 401) {
          this.loggedIn = false
          this.openLogin()
        } else {
          this.error = `{{ api-translations[lang]["Failed to start dashboard"] }} - ${error.message}`
          this.message = ''
        }
      }
    },

    openLogin(id, lang) {
      //throw new Error('debug')
      const path = `/{{lang}}${CONNECTORS_PATH}`
      console.log(window.location.pathname, window.location.path, path)
      if (window.location.pathname === path) return
      window.open(path, '_self')
    },

    openEditor(id, lang) {
      window.open(`/?id=${id}&lang=${lang}&connectorId=${this.user.storage.connectorId}`, '_self')
    },

    async logout() {
      await logout({
        type: ConnectorType.STORAGE,
        connectorId: this.user.storage.connectorId,
      })
      window.location.reload()
    },

    async createWebsite() {
      try {
        if (!this.newWebsiteName) throw new Error('{{ api-translations[lang]["You need to provide a website name"] }}')
        this.loading = true
        const websiteId = toSafeId(this.newWebsiteName)
        const result = await websiteCreate({
          websiteId,
          data: {
            name: this.newWebsiteName,
            imageUrl: null,
          },
          connectorId: this.user.storage.connectorId
        })
        this.message = '{{ api-translations[lang]["Website created successfully"] }}'
        this.error = ''
        this.newWebsiteName = ''
        this.showCreationForm = false;
        this.websites = await websiteList({ connectorId: this.user.storage.connectorId })
        this.empty = this.websites.length === 0
        this.loading = false
        return result
      } catch (error) {
        this.loading = false
        console.error(error)
        this.error = `{{ api-translations[lang]["Failed to create website"] }} - ${error.message}`
        this.message = ''
      }
    },

    async deleteWebsite(websiteId) {
      const ok = confirm('{{ api-translations[lang]["Deleting a website? Are your sure? Really?"] }}')
      if (!ok) return
      this.loading = true
      try {
        const result = await websiteDelete({ websiteId, connectorId: this.user.storage.connectorId })
        this.message = '{{ api-translations[lang]["Website deleted successfully"] }}'
        this.error = ''
        this.websites = await websiteList({ connectorId: this.user.storage.connectorId })
        this.empty = this.websites.length === 0
        this.loading = false
        return result
      } catch (error) {
        this.loading = false
        this.error = `{{ api-translations[lang]["Failed to delete website"] }} - ${error.message}`
        this.message = ''
      }
    },

    async duplicateWebsite(websiteId) {
      this.loading = true
      try {
        await websiteDuplicate({ websiteId, connectorId: this.user.storage.connectorId, data: { name } })
        this.error = ''
        this.websites = await websiteList({ connectorId: this.user.storage.connectorId })
        this.message = '{{ api-translations[lang]["Website duplicated successfully"] }}'
        this.empty = this.websites.length === 0
        this.loading = false
      } catch (error) {
        this.loading = false
        this.error = `{{ api-translations[lang]["Failed to duplicate website"] }} - ${error.message}`
        this.message = ''
      }
    },

    async renameWebsite(websiteId) {
      const website = this.websites.find(w => w.websiteId === websiteId)
      const name = prompt('{{ api-translations[lang]["New name for this website"] }}', website.name)
      if (!name) return
      this.loading = true
      try {
        const result = await websiteMetaWrite({ websiteId, connectorId: this.user.storage.connectorId, data: { name } })
        this.message = '{{ api-translations[lang]["Website renamed successfully"] }}'
        this.error = ''
        this.websites = await websiteList({ connectorId: this.user.storage.connectorId })
        this.empty = this.websites.length === 0
        this.loading = false
        return result
      } catch (error) {
        this.loading = false
        this.error = `{{ api-translations[lang]["Failed to rename website"] }} - ${error.message}`
        this.message = ''
      }
    },
  },
};
// Prepare elements for vue
document.querySelectorAll('[v-text], [v-html]')
  .forEach(el => el.innerText = '')


// Create the app
const app = createApp(App);

// Mount the app
app.mount('.app');


// Remove loading
setTimeout(() => {
  document.querySelector('.before-js').classList.add('after-js')
}, 100)
