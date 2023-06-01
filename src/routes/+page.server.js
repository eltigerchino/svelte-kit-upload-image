import { dev } from "$app/environment";
import { fail } from "@sveltejs/kit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formdata = await request.formData();

    const file = formdata.get("image");

    if (!(file instanceof Object) || !file.name) {
      return fail(400, { missing: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let filepath = `${__dirname}/../../../client/avatar.png`;
    if (dev) {
      filepath = `static/avatar.png`;
    }
    fs.writeFileSync(filepath, buffer, "base64");

    return { filename: file.name };
  },
};
