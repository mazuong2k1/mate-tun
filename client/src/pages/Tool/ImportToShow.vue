<template>
    <div class="container mt-5">
      <h2>JSON Data Display</h2>
  
      <input type="file" id="jsonFile" accept=".json" @change="importJsonFile" />
  
      <table class="table table-bordered mt-3" id="myTable">
        <thead>
          <tr>
            <th>Index</th>
            <th>PageID</th>
            <th>PageName</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody id="tableBody">
          <tr v-for="(item, index) in displayedData" :key="item.pageID">
            <td>{{ index + 1 }}</td>
            <td>{{ item.pageID }}</td>
            <td>{{ item.pageName }}</td>
            <td>
              <a :href="`https://facebook.com/${item.pageID}`" target="_blank">Link</a>
            </td>
          </tr>
        </tbody>
      </table>
  
      <ul class="pagination" id="pagination">
        <li class="page-item" v-for="page in totalPages" :key="page">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(page)"
          >{{ page }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        data: [],
        displayedData: [],
        perPage: 30,
        currentPage: 1,
        totalPages: 0
      };
    },
    methods: {
      importJsonFile(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              this.data = JSON.parse(reader.result);
              this.updateDisplay();
            } catch (error) {
              console.error('Error parsing JSON file:', error);
            }
          };
          reader.readAsText(file);
        }
      },
      updateDisplay() {
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = Math.min(startIndex + this.perPage, this.data.length);
        this.displayedData = this.data.slice(startIndex, endIndex);
        this.totalPages = Math.ceil(this.data.length / this.perPage);
      },
      changePage(page) {
        this.currentPage = page;
        this.updateDisplay();
      }
    }
  };
  </script>
  
  <style>
  /* Add any custom styles you need */
  </style>
  