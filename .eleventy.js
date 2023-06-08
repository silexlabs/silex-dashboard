module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets')
  let nextId = 0
  eleventyConfig.addPairedShortcode('get', (content, url) => {
    nextId++
    return `
    <div id="get-${nextId}">
      <script type="module">
        import { html, render } from 'https://unpkg.com/lit-html/lit-html.js'
        function renderTemplate(container, {loaded, json, del}) {
            render(html\`${content}\`, container)
        }
        async function del(id) {
          const ok = confirm('Delete? Are you sure? Really?')
          if(ok) {
            console.log('Delete website', id)
            const response = await fetch('${url}?id=' + id, {
              method: "DELETE",
              mode: "cors",
            })
            if(response.ok) {
              // reload to get the latest data
              // TODO: do not reload the page
              window.location.reload()
            }
          }
        }
        window.addEventListener('load', () => {
          const container = document.getElementById('get-${nextId}')
          console.log({container})
          async function load() {
            const response = await fetch('${url}')
            if(response.ok) {
              // Load the data
              const json = await response.json()
              // Render the data
              renderTemplate(container, {json, loaded: true, del})
            }
          }
          load()
          // Render defaults / placeholders
          renderTemplate(container, {json: [], loaded: false, del})
        })
      </script>
    </div>
    `
  })
  eleventyConfig.addPairedShortcode('post', (content, url) => {
    nextId++
    return `
    <div id="get-${nextId}">
      ${content}
      <script type="module">
        import { html, render } from 'https://unpkg.com/lit-html/lit-html.js'
        const container = document.getElementById('get-${nextId}')
        container.addEventListener('click', () => {
          async function load() {
            const name = prompt()
            if(name) {
              console.log('Create website', name)
              const response = await fetch('${url}?id=' + name, {
                method: "POST",
                mode: "cors",
                data: JSON.stringify({
                  name,
                }),
              })
              if(response.ok) {
                // reload to get the latest data
                // TODO: do not reload the page
                window.location.reload()
              }
            }
          }
          load()
        })
      </script>
    </div>
    `
  })
  eleventyConfig.addPairedShortcode('delete', (content, url) => {
    nextId++
    return `
    <div id="get-${nextId}">
      ${content}
      <script type="module">
        import { html, render } from 'https://unpkg.com/lit-html/lit-html.js'
        const container = document.getElementById('get-${nextId}')
        const id = container.parentElement.getAttribute('id')
        container.addEventListener('click', () => {
          async function load() {
            const ok = confirm('Delete? Are you sure? Really?')
            if(ok) {
              console.log('Delete website', id)
              const response = await fetch('${url}?id=' + id, {
                method: "DELETE",
                mode: "cors",
              })
              if(response.ok) {
                // reload to get the latest data
                // TODO: do not reload the page
                window.location.reload()
              }
            }
          }
          load()
        })
      </script>
    </div>
    `
  })
}