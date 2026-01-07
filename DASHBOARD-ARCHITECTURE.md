# Silex Dashboard Architecture - Complete Analysis

> **Last Updated**: December 27, 2025
> **Silex Version**: 3.6.0-canary.1
> **Purpose**: Reference documentation for understanding and extending the dashboard

---

## Table of Contents

- [Quick Start](#quick-start)
- [Running Services](#running-services)
- [Project Structure](#project-structure)
- [Complete Data Flow](#complete-data-flow)
- [Key Integration Points](#key-integration-points)
- [Template System](#template-system)
- [Special Techniques](#special-techniques)
- [Implementation Guide](#implementation-guide)
- [Template/Fork Feature Design](#templatefork-feature-design)

---

## Quick Start

### Starting the Dashboard

```bash
cd /home/lexoyo/_/Silex/packages/silex-dashboard

# Start all services (TinaCMS, Silex, 11ty)
npm start

# OR start individually:
npm run tina:dev    # TinaCMS on :4001
npm run silex:dev   # Silex on :6805
npm run 11ty:dev    # 11ty on :8080
```

### Accessing Services

- **Silex Editor**: http://localhost:6805/?id=dashboard
- **TinaCMS Admin**: http://localhost:4001/admin
- **11ty Preview**: http://localhost:8080/en/
- **GraphQL Playground**: http://localhost:4001/graphql

---

## Running Services

### Service Architecture

```
┌─────────────────┐
│   TinaCMS       │  Port 4001
│   GraphQL API   │  (Content Management)
└────────┬────────┘
         │
         ├─────────────────────────────────┐
         │                                 │
         ▼                                 ▼
┌─────────────────┐              ┌─────────────────┐
│   11ty          │  Port 8080   │   Silex         │  Port 6805
│   Static Gen    │  (Preview)   │   Editor        │  (Design)
└─────────────────┘              └─────────────────┘
         │                                 │
         │                                 │
         ▼                                 ▼
┌─────────────────────────────────────────────────┐
│              _site/ (Static Output)              │
│  - /en/index.html    - /fr/index.html           │
│  - /en/connectors/   - /fr/connectors/          │
└─────────────────────────────────────────────────┘
```

### Service Responsibilities

| Service | Port | Purpose | Technologies |
|---------|------|---------|-------------|
| **TinaCMS** | 4001 | Content management, GraphQL API | TinaCMS, GraphQL |
| **Silex** | 6805 | Visual editor, design, page settings | GrapesJS, Express |
| **11ty** | 8080 | Static site generation, templating | Eleventy, Liquid |

---

## Project Structure

### File Organization

```
silex-dashboard/
├── silex/                          # Silex editor data
│   ├── websites/
│   │   └── dashboard/
│   │       ├── website.json        # ★ Pages, components, styles (2 pages, 133 styles)
│   │       └── meta.json           # Site metadata {"name":"Dashboard"}
│   ├── server-config.js            # Express middleware (locale, routing)
│   └── client-config.js            # CMS datasource config
│
├── templates/                      # 11ty input (Silex output)
│   ├── websites.html               # Base template (Silex-generated)
│   ├── websites-en.html            # ★ 11ty template with frontmatter (EN)
│   ├── websites-fr.html            # ★ 11ty template with frontmatter (FR)
│   ├── connectors.html             # Base template
│   ├── connectors-en.html          # ★ 11ty template (EN)
│   ├── connectors-fr.html          # ★ 11ty template (FR)
│   ├── css/                        # Silex-generated CSS
│   └── assets/                     # Images, fonts, favicon
│
├── 11ty/                           # 11ty configuration
│   ├── eleventy.config.mjs         # Main config (i18n, passthroughs)
│   ├── _data/
│   │   ├── api-translations.json   # Error messages, UI strings
│   │   └── site.js                 # Global site data
│   └── _includes/
│       └── alternate.liquid        # Hreflang tags for SEO
│
├── collections/                    # ★ TinaCMS content
│   ├── home/
│   │   ├── en.md                   # English UI labels (title, buttons, etc.)
│   │   └── fr.md                   # French UI labels
│   ├── connectors/
│   │   ├── en.md                   # Connectors page labels
│   │   └── fr.md
│   ├── languages/
│   │   ├── en.json                 # Language config {"code":"en","label":"English"}
│   │   └── fr.json
│   └── settings/
│       ├── en.json                 # Nav, footer links
│       └── fr.json
│
├── tina/                           # TinaCMS config
│   ├── config.ts                   # ★ Schema definition (4 collections)
│   └── __generated__/              # Auto-generated GraphQL schema
│
└── _site/                          # 11ty output (gitignored)
    ├── en/
    │   ├── index.html              # Final websites page (EN)
    │   └── connectors/
    │       └── index.html          # Final connectors page (EN)
    ├── fr/
    │   ├── index.html              # Final websites page (FR)
    │   └── connectors/
    │       └── index.html          # Final connectors page (FR)
    ├── css/                        # Copied CSS
    ├── js/                         # Vue.js runtime
    └── assets/                     # Copied assets
```

### Page Structure

**2 Pages in Silex** (defined in `website.json`):

| Page ID | Name | Purpose | Permalink |
|---------|------|---------|-----------|
| `mk3OKgfr4A9V7Dww` | Websites | Main dashboard (list user's websites) | `/{{lang}}/` |
| `BOCWuSXKn6FRo8x5L` | Connectors | Login/authentication page | `/{{lang}}/connectors/` |

**Page Multiplication for i18n**:
- Each Silex page → 2 language versions (EN, FR)
- Total: **4 final HTML files**

---

## Complete Data Flow

### 1. Design Phase (Silex)

```
Designer opens: http://localhost:6805/?id=dashboard
    ↓
Designs pages visually:
    - Drag & drop components
    - Apply CSS styles
    - Add Vue.js directives (v-if, v-for, v-on:click)
    ↓
Configures page settings:
    - General: Page name = "Websites"
    - CMS: Permalink = /{{lang}}/
    - CMS: Language list = "en,fr"
    - Code: <head> content = Vue.js app
    - SEO: Title expression (GraphQL query)
    ↓
Clicks "Publish"
    ↓
Silex generates templates/websites.html
    ↓
Saves to silex/websites/dashboard/website.json
```

**website.json structure**:
```json
{
  "pages": [
    {
      "id": "mk3OKgfr4A9V7Dww",
      "name": "Websites",
      "settings": {
        "silexLanguagesList": "en,fr",
        "eleventyPermalink": "[{...}]",
        "head": "/* Vue.js code */"
      }
    }
  ],
  "styles": [ /* 133 CSS rules */ ],
  "components": [],
  "assets": [ /* images, fonts */ ]
}
```

### 2. Content Phase (TinaCMS)

```
Content editor opens: http://localhost:4001/admin
    ↓
Edits collections:
    - home/en.md: title, subtitle, button labels
    - home/fr.md: titre, sous-titre, étiquettes
    - settings/en.json: navigation, footer links
    ↓
Saves changes
    ↓
TinaCMS writes to collections/ directory
    ↓
TinaCMS GraphQL API auto-updates
```

**TinaCMS Schema** (`tina/config.ts`):
```typescript
{
  collections: [
    {
      name: "home",
      path: "collections/home",
      fields: [
        { label: 'Title', name: 'title', type: 'string' },
        { label: 'Subtitle', name: 'subtitle', type: 'string' },
        { label: 'Add Button', name: 'add_button', type: 'string' },
        // ... 20+ fields
      ]
    },
    // ... 3 more collections (connectors, languages, settings)
  ]
}
```

### 3. Build Phase (11ty)

```
11ty watches templates/ directory
    ↓
Detects websites.html changed
    ↓
For each language (en, fr):
    ↓
    1. Creates template file: websites-en.html
       - Adds frontmatter (permalink, lang, collection)
       - Keeps all HTML/CSS/JS from Silex
    ↓
    2. Executes websites-en.11tydata.mjs:
       - Fetches TinaCMS GraphQL (homeConnection, settingsConnection)
       - Returns { tina: { ... } }
    ↓
    3. Processes Liquid tags in HTML:
       {% assign var = tina.homeConnection.edges
          | where: "node.lang", "en"
          | first %}
       {{ var.node.title }}
    ↓
    4. Outputs _site/en/index.html
    ↓
Done! Static HTML ready
```

**11tydata.mjs example**:
```javascript
export default async function (configData) {
  const response = await fetch('http://localhost:4001/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `{
        homeConnection {
          edges {
            node {
              title
              subtitle
              add_button
              lang
            }
          }
        }
        settingsConnection {
          edges {
            node {
              nav { label, url, target }
              lang
            }
          }
        }
      }`
    })
  })

  const json = await response.json()
  return {
    tina: json.data,
    lang: 'en'
  }
}
```

### 4. Runtime Phase (Vue.js)

```
User visits: http://localhost:8080/en/
    ↓
Browser loads HTML with embedded Vue.js in <head>
    ↓
Vue app initializes on window.load:
    ↓
    1. const { api } = silex
    2. const user = await api.getUser()
    3. if (user) {
         this.websites = await api.websiteList()
       } else {
         redirect to /en/connectors/
       }
    ↓
Vue reactivity kicks in:
    - v-if="!empty" shows/hides sections
    - v-for="website in websites" renders list
    - v-on:click="createWebsite" handles clicks
    ↓
User sees fully interactive dashboard!
```

**Vue.js app structure** (in page settings `head`):
```javascript
const App = {
  data() {
    return {
      websites: [],           // From Silex API
      user: null,             // From Silex API
      loading: true,          // UI state
      error: null,            // Error messages
      showCreationForm: false // UI state
    }
  },

  async mounted() {
    const user = await getUser({ type: ConnectorType.STORAGE })
    if (user) {
      this.user = user
      this.websites = await websiteList({
        connectorId: user.storage.connectorId
      })
    }
  },

  methods: {
    async createWebsite() {
      await websiteCreate({
        websiteId: toSafeId(this.newWebsiteName),
        data: { name: this.newWebsiteName }
      })
      this.websites = await websiteList()
    },

    async deleteWebsite(websiteId) {
      if (confirm('Are you sure?')) {
        await websiteDelete({ websiteId })
        this.websites = await websiteList()
      }
    }
  }
}

createApp(App).mount('.app')
```

---

## Key Integration Points

### A. Silex Page Settings → 11ty Template

**How Language Multiplication Works**:

1. **Silex Page Settings**:
   ```javascript
   {
     name: 'Websites',
     silexLanguagesList: 'en,fr',  // ← Triggers multiplication
     eleventyPermalink: '[{
       "type":"property",
       "fieldId":"fixed",
       "options":{"value":"/{{lang}}/"}
     }]'
   }
   ```

2. **Silex Publishes** → `templates/websites.html` (base template, no frontmatter)

3. **11ty Detects** `silexLanguagesList` and creates:
   - `templates/websites-en.html`
   - `templates/websites-fr.html`

4. **Each Gets Frontmatter**:
   ```yaml
   ---
   permalink: "/{{lang}}/"  # From eleventyPermalink expression
   lang: "en"               # Added by language multiplication
   collection: "Websites"   # From page name
   ---
   ```

5. **11ty Processes** each template independently with its own language context

### B. TinaCMS → Liquid Templates

**Expression System**:

Silex uses a JSON-based expression builder that converts to Liquid syntax.

**Example Expression** (in page settings SEO Title):
```json
[
  {"type":"property","fieldId":"homeConnection"},
  {"type":"property","fieldId":"edges"},
  {"type":"filter","id":"where","options":{"key":"node.lang","value":"en"}},
  {"type":"filter","id":"first"},
  {"type":"property","fieldId":"node"},
  {"type":"property","fieldId":"title"}
]
```

**Converts to Liquid**:
```liquid
{% assign var_title = tina.homeConnection.edges
   | where: "node.lang", page.lang
   | first %}
{{ var_title.node.title }}
```

**Used in HTML**:
```html
<h1>
  {% assign var = tina.homeConnection.edges
     | where: "node.lang", page.lang
     | first %}
  {{ var.node.title }}
</h1>
<!-- Outputs: <h1>Silex Dashboard</h1> -->
```

### C. Vue.js Directives in Silex HTML

**How Vue.js is Embedded**:

1. **In Page Settings** (Code tab):
   ```html
   <script src="/js/vue.global.prod.js"></script>
   <script src="/js/main.js"></script>
   <script type="module">
     const App = { /* Vue app definition */ }
     createApp(App).mount('.app')
   </script>
   ```

2. **In Silex Visual Editor**, add Vue directives to HTML elements:
   ```html
   <div v-if="!empty" class="section">
     <h1 v-text="title"></h1>
     <button v-on:click="createWebsite">Create</button>
   </div>

   <div v-for="(website, index) in websites" :key="index">
     <h3 v-text="website.name"></h3>
     <p v-text="'Updated ' + new Date(website.updatedAt).toLocaleDateString()"></p>
   </div>
   ```

3. **11ty Preserves** all Vue directives (they're just HTML attributes)

4. **Browser Executes** Vue.js at runtime, making the page interactive

### D. Dual Content Sources

**Static Content** (from TinaCMS via Liquid):
```html
<button>
  {% assign var = tina.homeConnection.edges | where: "node.lang", "en" | first %}
  {{ var.node.add_button }}
</button>
<!-- Outputs: <button>Create website</button> -->
```

**Dynamic Content** (from Vue.js):
```html
<div v-for="website in websites">
  <h3 v-text="website.name"></h3>
  <!-- Outputs: <h3>My Project</h3> (from Silex API at runtime) -->
</div>
```

**Why Both?**
- **TinaCMS**: UI labels, navigation, footer (changes rarely, SEO-friendly, static)
- **Vue.js**: User data, forms, API calls (changes frequently, requires authentication)

---

## Template System

### Template Multiplication Process

```
┌─────────────────────────────────────────────────────────┐
│  Silex Editor (1 page)                                  │
│  - name: "Websites"                                     │
│  - silexLanguagesList: "en,fr"                          │
└────────────────────┬────────────────────────────────────┘
                     │ Publish
                     ▼
┌─────────────────────────────────────────────────────────┐
│  templates/websites.html (base)                         │
│  - No frontmatter                                       │
│  - All HTML/CSS/JS from Silex                           │
└────────────────────┬────────────────────────────────────┘
                     │ 11ty detects silexLanguagesList
                     ▼
         ┌───────────┴───────────┐
         ▼                       ▼
┌────────────────┐      ┌────────────────┐
│ websites-      │      │ websites-      │
│ en.html        │      │ fr.html        │
├────────────────┤      ├────────────────┤
│ ---            │      │ ---            │
│ permalink:     │      │ permalink:     │
│   "/en/"       │      │   "/fr/"       │
│ lang: "en"     │      │ lang: "fr"     │
│ ---            │      │ ---            │
│                │      │                │
│ (same HTML)    │      │ (same HTML)    │
└────────┬───────┘      └────────┬───────┘
         │                       │
         │ 11ty + Liquid         │
         ▼                       ▼
┌────────────────┐      ┌────────────────┐
│ _site/en/      │      │ _site/fr/      │
│ index.html     │      │ index.html     │
│                │      │                │
│ (English       │      │ (French        │
│  content)      │      │  content)      │
└────────────────┘      └────────────────┘
```

### Content Resolution Flow

```
Template has Liquid tag:
{{ tina.homeConnection.edges | where: "node.lang", page.lang | first | node.title }}
                                                      ▲
                                                      │
                                                      │
For websites-en.html:                    For websites-fr.html:
    page.lang = "en"                         page.lang = "fr"
          │                                        │
          ▼                                        ▼
Filters to en.md content              Filters to fr.md content
          │                                        │
          ▼                                        ▼
Outputs: "Silex Dashboard"            Outputs: "Tableau de bord Silex"
```

### File Relationships

```
Silex Editor (Design)
    ↓ publishes
templates/websites.html ────┐
                            │ copied + frontmatter added
                            ├──→ templates/websites-en.html
                            └──→ templates/websites-fr.html
                                        ↓ 11ty + TinaCMS data
                                        ↓
                            ┌──→ _site/en/index.html
                            └──→ _site/fr/index.html
```

---

## Special Techniques

### 1. Loading State Management

**Problem**: Prevent flash of unstyled content before Vue.js loads

**Solution**: CSS-based progressive enhancement

```css
/* In templates (added by Silex) */
.before-js > * {
  visibility: hidden;
  opacity: 0;
  transition: opacity .5s ease;
}

.after-js > * {
  visibility: visible;
  opacity: 1;
}

.before-js:before {
  content: 'Loading';
  position: absolute;
  top: 49%;
  left: 49%;
}
```

```html
<!-- Body has before-js class initially -->
<body class="app before-js">
  <!-- Content hidden until Vue loads -->
</body>
```

```javascript
// After Vue mounts
setTimeout(() => {
  document.querySelector('.before-js').classList.add('after-js')
}, 100)
```

### 2. Skeleton Loaders

**Problem**: Better UX while data is loading

**Solution**: Show placeholder skeletons with CSS animation

```html
<!-- Loading state -->
<div v-if="loading" class="skeleton-anim">
  <h3 class="skeleton-text skeleton">Loading...</h3>
  <p class="skeleton-text skeleton">Loading...</p>
</div>

<!-- Loaded state -->
<div v-if="!loading" v-for="website in websites">
  <h3 v-text="website.name"></h3>
  <p v-text="website.updatedAt"></p>
</div>
```

```css
.skeleton-anim:after {
  content: "";
  position: absolute;
  background: linear-gradient(
    0.25turn,
    transparent,
    rgba(255,255,255,.75),
    transparent
  );
  animation: loading 1.5s infinite;
}

@keyframes loading {
  to { background-position: 200% 0; }
}
```

### 3. Expression-Based Data Binding

**Visual Builder for GraphQL Queries**:

Instead of writing Liquid manually, Silex provides a dropdown UI:

```
Field Selector:
┌─────────────────────────────┐
│ homeConnection          [▼] │ ← Dropdown shows all GraphQL fields
└─────────────────────────────┘
         ↓
┌─────────────────────────────┐
│ edges                   [▼] │
└─────────────────────────────┘
         ↓
Filter:
┌─────────────────────────────┐
│ where                   [▼] │
│   key: node.lang            │
│   value: en                 │
└─────────────────────────────┘
         ↓
┌─────────────────────────────┐
│ first                   [▼] │
└─────────────────────────────┘
         ↓
┌─────────────────────────────┐
│ node.title              [▼] │
└─────────────────────────────┘
```

**Converts to**:
```liquid
{{ tina.homeConnection.edges | where: "node.lang", "en" | first | node.title }}
```

**Stored in website.json as**:
```json
{
  "eleventySeoTitle": "[
    {\"type\":\"property\",\"fieldId\":\"homeConnection\"},
    {\"type\":\"property\",\"fieldId\":\"edges\"},
    {\"type\":\"filter\",\"id\":\"where\",\"options\":{\"key\":\"node.lang\",\"value\":\"en\"}},
    {\"type\":\"filter\",\"id\":\"first\"},
    {\"type\":\"property\",\"fieldId\":\"node\"},
    {\"type\":\"property\",\"fieldId\":\"title\"}
  ]"
}
```

### 4. API Translations Pattern

**Problem**: Translate API error messages

**Solution**: Centralized translation file + Liquid interpolation

**File**: `11ty/_data/api-translations.json`
```json
{
  "en": {
    "Failed to start dashboard": "Failed to start dashboard",
    "Website created successfully": "Website created successfully"
  },
  "fr": {
    "Failed to start dashboard": "Erreur, impossible de démarrer",
    "Website created successfully": "Le site a bien été créé"
  }
}
```

**Usage in Vue.js code**:
```javascript
this.error = `{{ api-translations[lang]["Failed to start dashboard"] }} - ${error.message}`
this.message = '{{ api-translations[lang]["Website created successfully"] }}'
```

**After 11ty processing**:
```javascript
// In en/index.html
this.error = `Failed to start dashboard - ${error.message}`

// In fr/index.html
this.error = `Erreur, impossible de démarrer - ${error.message}`
```

### 5. Locale Detection & Routing

**Server-side routing** (`silex/server-config.js`):

```javascript
// Detect language from browser
router.use(locale(languages.map(l => l.code), 'en'))

// Redirect to user's language
router.use('/', (req, res, next) => {
  if (req.path === '/' && !req.query.id) {
    res.redirect(`/${req.locale}/`)  // → /en/ or /fr/
  } else {
    next()
  }
})
```

**Client-side routing** (in Vue.js):
```javascript
openLogin() {
  const path = `/{{lang}}/connectors/`
  window.open(path, '_self')
}

openEditor(id) {
  window.open(`/?id=${id}&lang={{lang}}&connectorId=${this.user.storage.connectorId}`, '_self')
}
```

### 6. Hover Effects with CSS

**Interactive buttons** without JavaScript:

```css
.fx-scale-round {
  position: relative;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0, -0.530, 0.405, 2.8);
}

.fx-scale-round::after {
  content: "";
  background: #ffffff;
  position: absolute;
  border-radius: 50%;
  left: -50%;
  right: -50%;
  top: -100%;
  bottom: -100%;
  transform: scale(0);
  transition: all 0.3s ease-out;
}

.fx-scale-round:hover {
  transform: scale(1.1);
}

.fx-scale-round:hover::after {
  transform: scale(1);
}
```

---

## Implementation Guide

### Adding a New Page

1. **In Silex Editor**:
   ```
   - Click "+" in Pages panel
   - Name: "Settings"
   - Design the page visually
   - Configure page settings:
     - General: name = "Settings"
     - CMS: permalink = /{{lang}}/settings/
     - Code: Add Vue.js if needed
   - Click "Publish"
   ```

2. **In TinaCMS** (if page needs content):
   ```typescript
   // tina/config.ts
   {
     name: "settings_content",
     path: "collections/settings_content",
     fields: [
       { name: 'title', type: 'string' },
       // ... more fields
     ]
   }
   ```

3. **Create data file**:
   ```javascript
   // templates/settings-en.11tydata.mjs
   export default async function() {
     const response = await fetch('http://localhost:4001/graphql', {
       body: JSON.stringify({
         query: `{ settingsContentConnection { ... } }`
       })
     })
     return { tina: response.data }
   }
   ```

4. **11ty auto-generates**:
   - `_site/en/settings/index.html`
   - `_site/fr/settings/index.html`

### Adding a New TinaCMS Field

1. **Update schema** (`tina/config.ts`):
   ```typescript
   {
     name: "home",
     fields: [
       // ... existing fields
       {
         label: 'Welcome Message',
         name: 'welcome_message',
         type: 'string'
       }
     ]
   }
   ```

2. **Restart TinaCMS**:
   ```bash
   npm run tina:dev
   ```

3. **Edit content** in TinaCMS admin:
   - Open http://localhost:4001/admin
   - Edit `home/en.md`
   - Add value for "Welcome Message"

4. **Use in template** (via expression builder or Liquid):
   ```liquid
   {{ tina.homeConnection.edges | where: "node.lang", "en" | first | node.welcome_message }}
   ```

### Adding a New Vue.js Method

1. **Open page settings** in Silex (Code tab)

2. **Add method**:
   ```javascript
   methods: {
     // ... existing methods

     async archiveWebsite(websiteId) {
       this.loading = true
       try {
         await websiteArchive({ websiteId, connectorId: this.user.storage.connectorId })
         this.websites = await websiteList({ connectorId: this.user.storage.connectorId })
         this.message = 'Website archived successfully'
       } catch (error) {
         this.error = `Failed to archive website - ${error.message}`
       }
       this.loading = false
     }
   }
   ```

3. **Add button** in Silex visual editor:
   ```html
   <button v-on:click="archiveWebsite(website.websiteId)">
     Archive
   </button>
   ```

4. **Publish** and test

### Customizing Styles

**Option 1: Visual Editor**
- Select element in Silex
- Use Style Manager panel (right side)
- Apply styles visually

**Option 2: CSS Classes**
- Add class in Silex: `my-custom-button`
- Define in page settings (Code tab):
  ```html
  <style>
    .my-custom-button {
      background: linear-gradient(45deg, #8873fe, #ff6b9d);
      border-radius: 8px;
      padding: 12px 24px;
    }
  </style>
  ```

**Option 3: Global Styles**
- Edit `templates/websites.html` `<style>` section
- Changes apply to all language versions

---

## Template/Fork Feature Design

### Use Cases

1. **Designer wants to share a template**:
   - "Export my dashboard design as a reusable template"
   - "Let others start from my design"

2. **User wants to clone a site**:
   - "Create a copy of this dashboard for another project"
   - "Start from a template instead of blank"

3. **Agency wants to offer templates**:
   - "Pre-built dashboards for clients"
   - "Customizable starting points"

### What is a "Template"?

A **complete, self-contained** Silex website package:

```
template-dashboard/
├── metadata.json           # Template info (name, author, preview)
├── website.json            # Silex pages, styles, components
├── collections/            # TinaCMS content structure
├── tina-schema.json        # TinaCMS schema (exported)
├── assets/                 # Images, fonts
└── config/
    ├── client-config.js    # CMS datasource config
    ├── server-config.js    # Server middleware (optional)
    └── eleventy.config.mjs # 11ty config (optional)
```

### Template Metadata Format

```json
{
  "id": "dashboard-v1",
  "name": "Dashboard Template",
  "description": "Multi-language dashboard with user management",
  "author": "Silex Labs",
  "version": "1.0.0",
  "preview": "preview.png",
  "tags": ["dashboard", "admin", "i18n", "vue"],
  "technologies": ["TinaCMS", "Vue.js", "11ty"],
  "languages": ["en", "fr"],
  "pages": 2,
  "features": [
    "User authentication",
    "Website CRUD",
    "Multi-language support",
    "Responsive design"
  ],
  "customization": {
    "colors": ["primary", "secondary", "background"],
    "texts": ["site_name", "tagline"],
    "logo": true
  }
}
```

### Implementation Options

#### Option A: Export/Import System

**Export Flow**:
```
1. User clicks "Export as Template" in Silex
2. Silex packages:
   - website.json (from current site)
   - collections/ (from disk)
   - tina/config.ts → tina-schema.json
   - assets/ (images, fonts)
   - metadata.json (user fills form)
3. Downloads template-dashboard.zip
```

**Import Flow**:
```
1. User clicks "Import Template" in Silex
2. Uploads template-dashboard.zip
3. Silex extracts and creates:
   - New website ID
   - Copies website.json to silex/websites/{newId}/
   - Copies collections/ to project
   - Sets up TinaCMS schema
   - Imports assets
4. Opens new site in editor
```

**Implementation**:
```javascript
// In Silex server
router.post('/api/template/export', async (req, res) => {
  const { websiteId } = req.body

  // Read website.json
  const website = await readWebsite(websiteId)

  // Package files
  const zip = new JSZip()
  zip.file('website.json', JSON.stringify(website))
  zip.file('metadata.json', JSON.stringify(req.body.metadata))

  // Add collections
  const collections = await fs.readdir('collections')
  for (const col of collections) {
    const files = await fs.readdir(`collections/${col}`)
    for (const file of files) {
      const content = await fs.readFile(`collections/${col}/${file}`)
      zip.file(`collections/${col}/${file}`, content)
    }
  }

  // Add assets
  const assets = website.assets
  for (const asset of assets) {
    const file = await fs.readFile(`templates/${asset.src}`)
    zip.file(`assets/${asset.src}`, file)
  }

  // Generate zip
  const buffer = await zip.generateAsync({ type: 'nodebuffer' })
  res.setHeader('Content-Disposition', `attachment; filename=${websiteId}.zip`)
  res.send(buffer)
})

router.post('/api/template/import', upload.single('template'), async (req, res) => {
  const zip = await JSZip.loadAsync(req.file.buffer)

  // Extract metadata
  const metadata = JSON.parse(await zip.file('metadata.json').async('string'))

  // Generate new website ID
  const newId = generateId()

  // Extract website.json
  const website = JSON.parse(await zip.file('website.json').async('string'))
  await writeWebsite(newId, website)

  // Extract collections
  const collectionFiles = Object.keys(zip.files).filter(f => f.startsWith('collections/'))
  for (const file of collectionFiles) {
    const content = await zip.file(file).async('string')
    await fs.writeFile(file, content)
  }

  // Extract assets
  const assetFiles = Object.keys(zip.files).filter(f => f.startsWith('assets/'))
  for (const file of assetFiles) {
    const content = await zip.file(file).async('nodebuffer')
    await fs.writeFile(`templates/${file}`, content)
  }

  res.json({ websiteId: newId, name: metadata.name })
})
```

#### Option B: Template API (In-App)

**Template Registry**:
```javascript
// In Silex server
const TEMPLATES = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: './templates/dashboard-template'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    path: './templates/portfolio-template'
  }
]

router.get('/api/templates', (req, res) => {
  res.json(TEMPLATES.map(t => ({
    id: t.id,
    ...require(`${t.path}/metadata.json`)
  })))
})

router.post('/api/website/create-from-template', async (req, res) => {
  const { templateId, websiteId, customizations } = req.body

  const template = TEMPLATES.find(t => t.id === templateId)

  // Load template
  const website = require(`${template.path}/website.json`)

  // Apply customizations
  if (customizations.colors) {
    applyColorCustomizations(website, customizations.colors)
  }
  if (customizations.texts) {
    applyTextCustomizations(website, customizations.texts)
  }

  // Save new website
  await writeWebsite(websiteId, website)

  // Copy collections
  await copyDir(`${template.path}/collections`, 'collections')

  res.json({ websiteId })
})
```

**UI Flow**:
```
1. User clicks "New Website from Template"
2. Shows template gallery:
   ┌─────────────┬─────────────┬─────────────┐
   │  Dashboard  │  Portfolio  │    Blog     │
   │   [Preview] │   [Preview] │   [Preview] │
   │    [Use]    │    [Use]    │    [Use]    │
   └─────────────┴─────────────┴─────────────┘
3. User clicks "Use Dashboard"
4. Customization dialog:
   - Site name: [My Dashboard____]
   - Primary color: [#8873fe]
   - Logo: [Upload___]
5. Creates website, opens in editor
```

#### Option C: Fork/Duplicate Feature

**Simple duplication** (already possible in dashboard):

```javascript
// In Vue.js app
async duplicateWebsite(websiteId) {
  await websiteDuplicate({
    websiteId,
    connectorId: this.user.storage.connectorId
  })
  this.websites = await websiteList()
}
```

**Enhanced with customization**:

```javascript
async forkWebsite(websiteId) {
  // Show customization dialog
  const customizations = await showForkDialog()

  // Duplicate
  const newId = await websiteDuplicate({ websiteId })

  // Apply customizations via API
  await websiteCustomize({
    websiteId: newId,
    name: customizations.name,
    colors: customizations.colors,
    logo: customizations.logo
  })

  // Open in editor
  window.open(`/?id=${newId}`, '_self')
}
```

### Customization System

**Define customizable fields**:

```json
// In template metadata
{
  "customization": {
    "schema": [
      {
        "id": "primary_color",
        "label": "Primary Color",
        "type": "color",
        "default": "#8873fe",
        "affects": [".button--primary", ".nav__item--active"]
      },
      {
        "id": "site_name",
        "label": "Site Name",
        "type": "text",
        "default": "My Dashboard",
        "affects": ["collections/home/*/title"]
      },
      {
        "id": "logo",
        "label": "Logo",
        "type": "image",
        "default": "/assets/logo.svg",
        "affects": [".nav__logo"]
      }
    ]
  }
}
```

**Apply customizations**:

```javascript
function applyCustomizations(website, customizations) {
  // Replace colors in styles
  website.styles.forEach(style => {
    if (style.style['background-color'] === '#8873fe') {
      style.style['background-color'] = customizations.primary_color
    }
  })

  // Replace text in collections
  collections.home.forEach(file => {
    file.title = file.title.replace('My Dashboard', customizations.site_name)
  })

  // Replace logo
  website.assets.forEach(asset => {
    if (asset.src === '/assets/logo.svg') {
      asset.src = customizations.logo
    }
  })
}
```

### Recommended Approach

**Phase 1: Simple Export/Import**
- Export button in Silex dashboard
- Downloads .zip with website.json + collections
- Import uploads .zip, creates new site
- No customization UI yet

**Phase 2: Template Gallery**
- Built-in templates in Silex
- "New from Template" button
- Gallery UI with previews
- One-click creation

**Phase 3: Customization**
- Template metadata defines customizable fields
- UI for color picker, text inputs, image upload
- Live preview of customizations
- Apply before creating site

**Phase 4: Marketplace**
- Community templates
- Rating/reviews
- Search/filter
- Premium templates

### Technical Considerations

**Storage**:
- Templates in filesystem: `templates/library/`
- Or in database with version control
- Or remote registry (npm-style)

**Versioning**:
- Template version in metadata
- Migration scripts for breaking changes
- Compatibility checks

**Dependencies**:
- TinaCMS schema changes
- Required plugins
- Node version requirements

**Security**:
- Validate uploaded templates
- Sanitize user inputs
- Prevent code injection in Vue.js snippets

---

## Summary

The Silex Dashboard demonstrates a **triple-layer architecture**:

1. **Design Layer** (Silex + GrapesJS):
   - Visual editing
   - Component structure
   - CSS styling
   - Page settings

2. **Content Layer** (TinaCMS + 11ty):
   - Static content management
   - Multi-language support
   - GraphQL API
   - Static site generation

3. **Application Layer** (Vue.js):
   - Runtime interactivity
   - API integration
   - State management
   - User interactions

**Key Benefits**:
- **Designers** work visually in Silex
- **Content editors** use TinaCMS admin
- **Developers** add features via Vue.js
- **End result**: Fast, static, SEO-friendly, interactive site

**For Template/Fork Features**:
- Package: website.json + collections + assets
- Export: Zip download or API
- Import: Upload or template gallery
- Customize: Colors, text, images via UI

---

## Quick Reference

### Common Tasks

| Task | Files to Edit | How |
|------|---------------|-----|
| **Change page design** | Use Silex Editor | Visual drag & drop |
| **Update UI labels** | `collections/home/*.md` | Edit in TinaCMS or text editor |
| **Add navigation link** | `collections/settings/*.json` | Edit `nav` array |
| **Add new page** | Silex Editor | Pages panel → "+" button |
| **Modify Vue.js logic** | Silex page settings (Code tab) | Edit `<script>` in HEAD |
| **Add TinaCMS field** | `tina/config.ts` | Add to `fields` array |
| **Change permalink** | Silex page settings (CMS tab) | Edit "Permalink" expression |
| **Customize styles** | Silex Style Manager | Visual or CSS |

### File Locations

| Content | Path |
|---------|------|
| **Page structure** | `silex/websites/dashboard/website.json` |
| **UI labels** | `collections/home/*.md` |
| **Navigation** | `collections/settings/*.json` |
| **TinaCMS schema** | `tina/config.ts` |
| **11ty config** | `11ty/eleventy.config.mjs` |
| **Templates** | `templates/*.html` |
| **Final output** | `_site/` |

### API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `http://localhost:6805/?id=dashboard` | Silex editor |
| `http://localhost:4001/admin` | TinaCMS admin |
| `http://localhost:4001/graphql` | GraphQL API |
| `http://localhost:8080/en/` | Preview (English) |
| `http://localhost:8080/fr/` | Preview (French) |

---

**Last Updated**: December 27, 2025
**Maintainer**: Silex Team
**Questions?**: https://docs.silex.me or https://community.silex.me
