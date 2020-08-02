import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    searchResult: [],
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    keywords: []
  },

  created(){
      this.selectedTab = this.tabs[0];
      this.fetchKeyword()
  },

  methods: {
    onSubmit(e) {
      this.search()
    },
    onClickKeyword(keyword) {
        this.query = keyword;
        this.search()
    },

    onKeyup(e) {
      if (!this.query.length) this.resetForm()
    },
    onReset(e) {
      this.resetForm()
    },
    search() {
      SearchModel.list().then(data => {
        this.submitted = true
        this.searchResult = data
      })
    },

    fetchKeyword(){
        KeywordModel.list().then(data => {
            this.keywords = data
        })
    },

    resetForm() {
      this.query = ''
      this.submitted = false
      this.searchResult = []
    },

    onClickTab(tab){
        this.selectedTab = tab
    }
  }
})