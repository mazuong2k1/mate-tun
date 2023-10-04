<template>
  <div class="p-5">
    <div class="container">
      <h2>Search ADS PAGE ID</h2>
      <form>
        <div class="form-group">
          <label for="usr">Từ khóa tìm kiếm:</label>
          <input
            type="text"
            class="form-control"
            id="q"
            :disabled="isDisabledScan"
            v-model="form.q"
          />
        </div>
        <div class="form-group">
          <label for="sel1">Chọn quốc gia:</label>
          <select
            class="form-control"
            id="sel1"
            :disabled="isDisabledScan"
            v-model="form.country"
          >
            <option
              v-for="(country, index) in array_country"
              :key="index"
              :value="country"
            >
              {{ country }}
            </option>
          </select>
        </div>
        <div class="text-right m-3">
          <button
            type="button"
            class="btn btn-primary"
            :disabled="isDisabledScan"
            @click="scanPage()"
          >
            Scan Page
          </button>
          <button
          v-if="isDisabledScan"
          type="button"
          class="btn btn-primary"
          @click="ResumeScan()"
        >
          Tạm dừng
        </button>
        </div>
      </form>
    </div>
    <!-- <div class="container">
      <div class="form-group">
        <label for="comment">Page Data:</label>
        <span class="badge bg-primary"> Tổng Page: {{ArrayPage.length}}</span>
        <textarea class="form-control" rows="10" id="comment" :disabled="true" v-model="page_data"></textarea>
      </div>
      <div class="form-group">
        <label for="comment">Page Data Lọc Trùng:</label>
        <span class="badge bg-success">Tổng Page Đã Lọc Trùng: {{filteredArray.length}}</span>
        <textarea class="form-control" rows="10" id="comment" :disabled="true" v-model="page_data_filtered"></textarea>
      </div>
    </div> -->
    <div class="container overflow-auto">
      <div>
        <span class="badge bg-primary"> Tổng Page: {{ArrayPage.length}}</span>
        <span class="badge bg-success"> Tổng Page Đã Lọc Trùng: {{filteredArray.length}}</span>  
      </div>
      <b-table
        id="my-table"
        :items="filteredArray"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
      <template #cell(index)="data">
        {{ filteredArray.indexOf(data.item) + 1 }}
      </template>
      <template #cell(action)="data">
        <span><a target="_blank" rel="noopener noreferrer" :href="`https://facebook.com/${data.item.pageID}`">Open Page</a></span>
      </template>
    </b-table>

      <b-pagination
      v-model="currentPage"
      :total-rows="filteredArray.length"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
    </div>
  </div>
</template>
<script>
import { API } from "@/helpers/api";

export default {
  data() {
    return {
      array_country: [
        "ALL",
        "BR",
        "IN",
        "GB",
        "US",
        "CA",
        " AR",
        " AU",
        " AT",
        " BE",
        " CL",
        " CN",
        " CO",
        " HR",
        " DK",
        " DO",
        " EG",
        " FI",
        " FR",
        " DE",
        " GR",
        " HK",
        " ID",
        " IE",
        " IL",
        " IT",
        " JP",
        " JO",
        " KW",
        " LB",
        " MY",
        " MX",
        " NL",
        " NZ",
        " NG",
        " NO",
        " PK",
        " PA",
        " PE",
        " PH",
        " PL",
        " RU",
        " SA",
        " RS",
        " SG",
        " ZA",
        " KR",
        " ES",
        " SE",
        " CH",
        " TW",
        " TH",
        " TR",
        " AE",
        " VE",
        " PT",
        " LU",
        " BG",
        " CZ",
        " SI",
        " IS",
        " SK",
        " LT",
        " TT",
        " BD",
        " LK",
        " KE",
        " HU",
        " MA",
        " CY",
        " JM",
        " EC",
        " RO",
        " BO",
        " GT",
        " CR",
        " QA",
        " SV",
        " HN",
        " NI",
        " PY",
        " UY",
        " PR",
        " BA",
        " PS",
        " TN",
        " BH",
        " VN",
        " GH",
        " MU",
        " UA",
        " MT",
        " BS",
        " MV",
        " OM",
        " MK",
        " LV",
        " EE",
        " IQ",
        " DZ",
        " AL",
        " NP",
        " MO",
        " ME",
        " SN",
        " GE",
        " BN",
        " UG",
        " GP",
        " BB",
        " AZ",
        " TZ",
        " LY",
        " MQ",
        " CM",
        " BW",
        " ET",
        " KZ",
        " NA",
        " MG",
        " NC",
        " MD",
        " FJ",
        " BY",
        " JE",
        " GU",
        " YE",
        " ZM",
        " IM",
        " HT",
        " KH",
        " AW",
        " PF",
        " AF",
        " BM",
        " GY",
        " AM",
        " MW",
        " AG",
        " RW",
        " GG",
        " GM",
        " FO",
        " LC",
        " KY",
        " BJ",
        " AD",
        " GD",
        " VI",
        " BZ",
        " VC",
        " MN",
        " MZ",
        " ML",
        " AO",
        " GF",
        " UZ",
        " DJ",
        " BF",
        " MC",
        " TG",
        " GL",
        " GA",
        " GI",
        " CD",
        " KG",
        " PG",
        " BT",
        " KN",
        " SZ",
        " LS",
        " LA",
        " LI",
        " MP",
        " SR",
        " SC",
        " VG",
        " TC",
        " DM",
        " MR",
        " AX",
        " SM",
        " SL",
        " NE",
        " CG",
        " AI",
        " YT",
        " CV",
        " GN",
        " TM",
        " BI",
        " TJ",
        " VU",
        " SB",
        " ER",
        " WS",
        " AS",
        " FK",
        " GQ",
        " TO",
        " KM",
        " PW",
        " FM",
        " CF",
        " SO",
        " MH",
        " VA",
        " TD",
        " KI",
        " ST",
        " TV",
        " NR",
        " RE",
        " LR",
        " ZW",
        " CI",
        " MM",
        " AN",
        " AQ",
        " BQ",
        " BV",
        " IO",
        " CX",
        " CC",
        " CK",
        " CW",
        " TF",
        " GW",
        " HM",
        " XK",
        " MS",
        " NU",
        " NF",
        " PN",
        " BL",
        " SH",
        " MF",
        " PM",
        " SX",
        " GS",
        " SS",
        " SJ",
        " TL",
        " TK",
        " UM",
        " WF",
        " EH",
      ],
      form: {
        q: "agency",
        country: "US",
        count: 30,
        dataHtml: null,
        inputforwardCursor: '',
        inputcollationToken: ''
      },
      loading: false,
      isDisabledScan: false,
      isResumeScan: false,
      dem_page: 0,
      ArrayPage: [],
      filteredArray: [],
      page_data: '',
      page_data_filtered: '',
      perPage: 30,
      currentPage: 1,
      fields: [
        { key: 'index', label: 'Index' },
        { key: 'pageID', label: 'Page ID' },
        { key: 'pageName', label: 'Page Name' },
        { key: 'action', label: 'Action' },
      ]
    };
  },
  watch: {
    ArrayPage: async function(value){
      this.page_data = (await Promise.all(value.map((item) => `${item.pageID} | ${item.pageName}`))).join('\r\n')
      this.filteredArray = await Promise.all(value.reduce((uniqueArray, currentItem) => {
          // Kiểm tra xem pageID đã tồn tại trong uniqueArray chưa
          const isDuplicate = uniqueArray.some((item) => item.pageID === currentItem.pageID);
      
          // Nếu chưa tồn tại, thêm đối tượng vào uniqueArray
          if (!isDuplicate) {
              uniqueArray.push({ pageID: currentItem.pageID, pageName: currentItem.pageName });
          }
      
          return uniqueArray;
      }, []))
    },
    filteredArray: async function(value){
      this.page_data_filtered = (await Promise.all(value.map((item) => `${item.pageID} | ${item.pageName}`))).join('\r\n')
    }
  },
  methods: {
    scanPage: async function () {
      this.loading = true;
      this.isDisabledScan = true;
      this.isResumeScan = false;
      try {
        const getSearchAds = await API().post("/facebook/get_search_ads", this.form);
        if(getSearchAds.data.success){
          if(this.dem_page == 0){
            this.form.dataHtml = getSearchAds.data.data;
          }
          if(!this.form.dataHtml){
            return alert('Không thể get dữ liệu');
          }
          while(true){
            const searchAds = await API().post("/facebook/search_ads", this.form);
            if(searchAds.data.success){
              this.ArrayPage = this.ArrayPage.concat([...searchAds.data.data])
              this.form.inputforwardCursor = searchAds.data.forwardCursor;
              this.form.inputcollationToken = searchAds.data.collationToken;
              if(!searchAds.data.forwardCursor || searchAds.data.forwardCursor == '' || !searchAds.data.collationToken || searchAds.data.collationToken == ''){
                break;
              }
              if(this.isResumeScan){
                break;
              }
              this.dem_page++;
              await this.delay(5000);
            }else{
              break;
            }
          }
          return alert('Hoàn thành');
        }else{
          return alert('Không thể lấy dữ liệu từ fb');
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
        this.isDisabledScan = false;
        this.isResumeScan = true;
      }
    },
    ResumeScan: function(){
      this.isDisabledScan = false;
      this.isResumeScan = true;
    },
    delay: (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
  },
};
</script>
