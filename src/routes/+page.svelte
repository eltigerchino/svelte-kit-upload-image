<script>
  import { enhance } from "$app/forms";
  import ImageInput from "../lib/ImageInput.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<article>
  <h1>Upload image</h1>
  <form method="post" use:enhance enctype="multipart/form-data">
    <ImageInput src={data.avatar} />
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
