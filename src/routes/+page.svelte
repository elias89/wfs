<script>
  import "./../global.css";

  import { onMount } from "svelte";
  import { goto, afterNavigate } from "$app/navigation";
  import { page } from '$app/state';

  let currentPath = null;

  let onFileNavigate = (file) => {
    if (file.isFile) return;

    goto(`/?goto=${file.path}`);
  }
  

  let onFileSelection = (event) => {
    event.target.focus({focusVisible: true});
  }

  let goBack = () => {
    const previousPath = getPreviousPath();
    debugger
    goto(previousPath.length? `/?goto=${previousPath}`: '/');
  }

  let getPreviousPath = () => {
    const currentPath = page.url.searchParams?.get('goto') || '';
    // Separate path segments and remove empties from the split
    const pathSegments = currentPath?.split('/').filter(segment => segment !== '');
    pathSegments?.pop();

    return pathSegments.join('/');
  }

  afterNavigate(()=> {
    currentPath = page.url.searchParams?.get('goto') || null;
  });

  onMount(() => {
    console.log(page.data)
  })
</script>
<div class="wfs">
  <div class="wfs-toolbar">
    <div class="wfs-path">{currentPath || '/'}</div>
  </div>
  <div class="wfs-main">
    <div class="wfs-pane">
      {#if currentPath}
      <div class="wfs-file" on:dblclick={()=>goBack()}>
        ..
      </div>
      {/if}
      {#each page.data.files as file, index }
        <div class="wfs-file" on:dblclick={()=>onFileNavigate(file)} on:click={onFileSelection} class:isFile={file.isFile} id={file.name} tabindex={index}>

          <div class="wfs-file-name" class:wfs-hiddenFile={file.isHiddenFile}>
            {file.name}
          </div>

          <div class="wfs-file-date" title="Date modified">{file.modifiedDate}</div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .wfs {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;

    &-toolbar {
      display: flex;
      background-color: #2e2e2e;
      padding: 0 var(--spacing--regular);
      height: 30px;
      align-items: center;
      flex: none;
    }
    &-path {
      display: flex;
    }
    &-main {
      display: flex;
      flex: 1;
      width: 100%;
      background-color: #272727;
    }
    &-pane {
      display: flex;
      width: 100%;
      padding: var(--spacing--regular);
      flex-direction: column;
    }
    &-file {
      display: flex;
      cursor: default;
      user-select: none;
      padding: 2px 6px;
      border-radius: var(--borderRadius--regular);
      overflow: hidden;
      justify-content: space-between;
      border: 1px solid transparent;
      flex: none;
      // outline: 1px solid var(--color--primary);

      &.isFile {
        color: var(--color--file);
      }
      &:hover {
        background-color: var(--color--primary);
        color: black;
      }
      &:focus {
        border-color: var(--color--primary);
      }
    }

    &-hiddenFile {
      opacity: .7;;
    }
  }
</style>