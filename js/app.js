import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

new Vue({
  el: '#app',
  data: {
    query: '',
    submitted: false,
    searchResult: [],
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    keywords: [],
    history: []
  },

  created(){
      this.selectedTab = this.tabs[0];
      this.fetchKeyword()
      this.fetchHistory()
  },

  methods: {
    onSubmit(e) {
      this.search()
    },

    onClickKeyword(keyword) {
        this.query = keyword;
        this.search()
    },

    onClickHistory(history) {
        this.query = history;
        this.search()
    },

    onClickRemoveHistory(keyword) {
      HistoryModel.remove(keyword)
      this.fetchHistory();
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

      HistoryModel.add(this.query);
      this.fetchHistory()
    },

    fetchKeyword(){
        KeywordModel.list().then(data => {
            this.keywords = data
        })
    },

    fetchHistory(){
        HistoryModel.list().then(data => {
            this.history = data
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