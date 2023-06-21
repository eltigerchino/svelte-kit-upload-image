import { dev } from "$app/environment";
import { fail } from "@sveltejs/kit";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { projectRoot } from "$lib/util.server";

// TODO: persist the filename to a database.
/** @type {string} */
let filename;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  return {
    avatar: filename,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formdata = await request.formData();

    const file = formdata.get("image");

    if (!(file instanceof Object) || !file.name) {
      return fail(400, { missing: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    filename = `/avatar-${randomUUID()}.png`;

    /** @type {string} */
    let filepath;
    if (dev) {
      filepath = `static${filename}`;
    } else {
      filepath = projectRoot + `/public${filename}`;
    }

    fs.writeFileSync(filepath, buffer, "base64");

    return { filename };
  },
};
