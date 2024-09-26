<script>
  import Icon from "@iconify/svelte";
  import MenuButton from "./MenuButton.svelte";
  import Textinput from "./Textinput.svelte";
  export let roomName = "";
  import ChatBubble from "./ChatBubble.svelte";
</script>

<div class="flex h-svh flex-col">
  <header class="navbar gap-2 border-b border-neutral bg-base-200">
    <label for="my-drawer-2" class="btn btn-ghost drawer-button lg:hidden">
      <Icon icon="ci:chevron-left" class="size-6" />
    </label>
    <div class="flex-1 text-sm font-bold sm:text-base md:text-xl lg:ms-2">
      @{roomName}
    </div>
    <div>
      <ul class="menu menu-horizontal">
        <MenuButton icon="ci:user-add" />
        <MenuButton icon="ci:more-vertical" />
      </ul>
    </div>
  </header>
  <section class="flex w-full grow flex-col justify-end p-4">
    <ChatBubble
      user="Obi-Wan Kenobi"
      message="You were my brother, Anakin."
      time="12:30"
      avatar="https://static.wikia.nocookie.net/swfanon/images/e/e1/Obiwankenobi_dsws.jpg"
      me
    />
    <ChatBubble
      user="Obi-Wan Kenobi"
      message="😀"
      time="12:30"
      avatar="https://static.wikia.nocookie.net/swfanon/images/e/e1/Obiwankenobi_dsws.jpg"
      previous_user="Obi-Wan Kenobi"
      me
    />
    <ChatBubble
      user="Anakin"
      message="I hate you!"
      time="12:30"
      avatar="https://static.wikia.nocookie.net/swfanon/images/5/5a/Shadow_Anakin.jpg"
    />
    <ChatBubble
      user="Obi-Wan Kenobi"
      message="👋🏿"
      time="12:31"
      avatar="https://static.wikia.nocookie.net/swfanon/images/e/e1/Obiwankenobi_dsws.jpg"
      me
    />
  </section>
  <footer class="p-4">
    <Textinput />
  </footer>
</div>
