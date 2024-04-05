import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "_published/assets",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "_published/assets",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "pages",
        fields: [
          {
            type: "string",
            name: "lang",
            label: "Language",
            required: true,
          },
        ],
      },
    ],
  },
});
