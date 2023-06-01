<script>
  import { enhance } from "$app/forms";

  /** @type {import('./$types').ActionData} */
  export let form;

  /** @type {string | undefined }*/
  let src = "/avatar.png";

  /**
   *
   * @param event {Event}
   */
  function handleInput(event) {
    const file = /** @type {HTMLInputElement} */ (event.target)?.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result) return;
      src = reader.result.toString();
    };
    reader.readAsDataURL(file);

    /** @ts-ignore we want to reset the page action data */
    form = undefined;
  }
</script>

<article>
  <h1>Upload image</h1>
  <form method="post" use:enhance enctype="multipart/form-data">
    <label for="image">
      <img id="avatar" src="{src}" alt="avatar" />
      Change image
    </label>
    <input
      id="image"
      class="visually-hidden"
      name="image"
      type="file"
      accept=".png"
      required
      on:change="{handleInput}"
    />
    {#if form?.missing}
      <p class="error">Please select a new image.</p>
    {/if}
    <button class="upload-btn">Upload</button>
  </form>

  {#if form?.filename && form.filename !== "undefined"}
    <p>Successfully uploaded image {form?.filename}</p>
  {/if}
</article>

<style>
  article,
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error {
    color: red;
  }

  label {
    display: grid;
    place-items: center;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }

  label:hover {
    color: darkblue;
  }

  .visually-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute;
    clip-path: inset(0px 0px 99.9% 99.9%);
    border: 0;
    padding: 0;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  #avatar {
    border-radius: 100%;
    border: solid 1px #ccc;
    height: 128px;
    width: 128px;
    margin-bottom: 10px;
    object-fit: cover;
    font-size: 0;
  }

  .upload-btn {
    width: 128px;
    height: 32px;
    background-color: black;
    font-family: sans-serif;
    color: white;
    font-weight: bold;
    border: none;
    margin-top: 2rem;
    cursor: pointer;
  }

  .upload-btn:hover {
    background-color: white;
    color: black;
    outline: black solid 2px;
  }
</style>
