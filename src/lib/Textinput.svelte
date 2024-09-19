<script lang="ts">
  // your script goes here
  function onEnter(event: any) {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      document.forms[0].submit();
    }
  }
</script>

<form action="" id="form" class="flex gap-4">
  <textarea
    class="textarea textarea-bordered"
    placeholder="Bio"
    on:keypress={onEnter}
    rows="3"
  ></textarea>
  <button type="submit" class="btn btn-primary">Send</button>
</form>
