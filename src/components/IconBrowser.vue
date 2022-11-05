<template>
  <div class="window active">
    <div class="title-bar">
      <div class="title-bar-text">Browse Icons</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body has-space">
      <p>Look for icons in folder:</p>
      <select v-model="currentFolder">
        <option
          v-for="folder in folders"
          :key="folder.sha"
          :value="folder.path"
          :selected="currentFolder === folder.path"
        >
          {{ folder.name }}
        </option>
      </select>
      <p>Available icons in the selected location:</p>
      <ul>
        <li
          v-for="(icon, i) in icons"
          :key="i"
          :aria-selected="selectedIcon === icon.download_url"
          @click="selectedIcon = icon.download_url"
        >
          <img :src="icon.download_url" />
        </li>
      </ul>
      <div class="footer">
        <button :disabled="!selectedIcon" @click="download">Download</button>
        <button class="default" @click="downloadAll">Download All</button>
      </div>
    </div>
  </div>
</template>

<script>
import client, { repo } from "../github";

export default {
  data() {
    return {
      folders: [],
      icons: [],
      currentFolder: repo.path + "/Shell32.dll",
      selectedIcon: null,
    };
  },
  watch: {
    async currentFolder(value) {
      const icons = await client.repos.getContent({ ...repo, path: value });
      this.icons = icons.data;
    },
  },
  async created() {
    const getFolders = client.repos.getContent({ ...repo });
    const getIcons = client.repos.getContent({
      ...repo,
      path: this.currentFolder,
    });
    const [folders, icons] = await Promise.all([getFolders, getIcons]);
    this.folders = folders.data;
    this.icons = icons.data;
  },
  methods: {
    createLink(href) {
      const a = document.createElement("a");
      a.href = href;
      a.download = true;
      a.target = "_blank";
      a.click();
      a.remove();
    },
    download() {
      this.createLink(this.selectedIcon);
    },
    downloadAll() {
      const downgitUrl =
        "https://downgit.github.io/#/home?url=https://github.com";
      const { owner, repo: _repo, path } = repo;
      this.createLink(`${downgitUrl}/${owner}/${_repo}/tree/main/${path}`);
    },
  },
};
</script>

<style scoped src="7.css/dist/gui/button.css"></style>
<style scoped src="7.css/dist/gui/select.css"></style>
<style scoped src="7.css/dist/gui/window.css"></style>

<style scoped>
.window {
  --iconSize: 48px;
  width: 340px;
}

.window-body.has-space {
  padding: 0 12px;
}

select {
  width: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #888;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  height: calc(var(--iconSize) * 5);
  overflow-y: scroll;
  white-space: nowrap;
}

li {
  margin: 2px;
}

li[aria-selected] {
  background: #39f;
}

li img {
  display: block;
  width: var(--iconSize);
  height: var(--iconSize);
}

.footer {
  padding: 12px 0;
  text-align: right;
}

button + button {
  margin-left: 8px;
}
</style>
