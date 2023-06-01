<script>
  /**
   * @type {string | undefined}
   */
  export let src = undefined;

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

<style>
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

  #avatar {
    border-radius: 100%;
    border: solid 1px #ccc;
    height: 128px;
    width: 128px;
    margin-bottom: 10px;
    object-fit: cover;
    font-size: 0;
  }
</style>
