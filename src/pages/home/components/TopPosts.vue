<template>
  <div class="panel default-panel home-top-post">
    <div class="panel-head">
      <h5 class="title purple">
        <span class="iconfont icon-calendar"></span>
        {{$t('lang.homePage.topPosts.title')}}
      </h5>
    </div>

    <div class="panel-body list-content">
      <default-tabs
        :tabList="tabList"
        :tabIndex="tabIndex"
        @changeTab="changeTab"
        class="panel-tab"
      >
        <div class="list-content-inner">
          <div v-if="isPost">
            <div v-for="(key, oneIndex) in postListBox" :key="oneIndex">
              <div class="home-post" v-for="(item, index) in key" :key="index">
                <p v-if="postType === 0" class="home-post-title">{{item.title}}</p>
                <a :href="item.url" target="_blank" v-else><p class="home-post-title">{{item.title}}</p></a>
                <div class="home-post-detail" @click="intoKolDetail(item)">
                  <img :src="item.avatar_url" alt class>
                  <div>
                    <strong>{{item.profile_name}}</strong>
                    <p>{{item.post_time}}</p>
                  </div>
                </div>
                <p class="home-post-content">{{item.content}}</p>
                <div class="home-post-form">
                  <span>
                    <i class="iconfont icon-heart"></i>
                    <b>{{item.post_influence.likes}}</b>
                  </span>
                  <span v-if="postType === 0">
                    <i class="iconfont icon-share"></i>
                    <b>{{item.post_influence.shares}}</b>
                  </span>
                  <span>
                    <i class="iconfont icon-comment"></i>
                    <b>{{item.post_influence.comments}}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="nonetip" v-if="isShow">
            <span>{{$t('lang.totalNoDataTip')}}</span>
          </div>
          <div class="r8-loading" v-if="isLoading">
            <a-spin tip="Loading..."/>
          </div>
          <div class="nonetip" v-if="isBrandShow">
            <span>{{$t('lang.homePage.noBrand')}}</span>
          </div>
        </div>
        <div class="text-center mt20">
          <button type="button" class="btn btn-sm btn-outline btn-circle btn-purple" @click="PostShowMore">{{$t('lang.more')}}</button>
        </div>
      </default-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import DefaultTabs from '@components/DefaultTabs'
import { mapState } from 'vuex'
export default {
  components: {
    DefaultTabs
  },
  props: ['childKeyList', 'isSelectBrand'],
  data() {
    return {
      kolHasLiked: true,
      kolHasMsg: true,
      kolHasChecked: false,
      isShow: false,
      isLoading: true,
      isBrandShow: false,
      isPost: false,
      postWeiboCurrentPage: 0,
      postWeixinCurrentPage: 0,
      tabIndex: 0,
      topPostParams: {
        start_date: commonJs.cPastFourteenDays,
        end_date: commonJs.cPastOneday,
        brand_keywords: 'BMW',
        page_no: 0,
        page_size: 4
      },
      postListBox: [],
      postList: [],
      postType: 0,
      tabList: [
        {
          index: 0,
          name: ('weibo')
        },
        {
          index: 1,
          name: ('wechat')
        }
      ]

    }
  },
  computed: {
    ...mapState(['authorization'])
  },
  watch: {
    childKeyList: {
      handler() {
        if (this.isSelectBrand) {
          this.isLoading = true
          this.isBrandShow = false
          this.isShow = false
          this.isPost = false
          if (this.childKeyList.brand_keywords !== '') {
            let newKey = ''
            this.childKeyList.brand_keywords.split(',').forEach(item => {
              newKey += '"' + item + '" '
            }) 
            this.topPostParams.brand_keywords = newKey 
            if (Number(this.tabIndex) === 0) {
              this.postWeiboCurrentPage = 0
              this.topPostParams.page_no = this.postWeiboCurrentPage 
              // 微博
              this.topPostWeibo(this.topPostParams)
            } 
            if (Number(this.tabIndex) === 1) {
              this.postWeixinCurrentPage = 0
              this.topPostParams.page_no = this.postWeixinCurrentPage 
              // 微信
              this.topPostWeixin(this.topPostParams)
            }
          }
        } else {
          this.isLoading = false
          this.isBrandShow = true
          this.isShow = false
          this.isPost = false
        }
      },
      immediate:true,
      deep: true
    },
  },
  created() {},
  methods: {
    changeTab(tab) {
      this.tabIndex = tab.index
      this.postListBox = [] 
      this.isShow = false 
      this.isLoading = true 
      this.isBrandShow = false
      if (this.isSelectBrand) {
        if (tab.index === 0) {
          this.postWeiboCurrentPage = 0
          this.topPostParams.page_no = this.postWeiboCurrentPage 
          // 微博
          this.topPostWeibo(this.topPostParams)
        }
        if (tab.index === 1) {
          this.postWeixinCurrentPage = 0
          this.topPostParams.page_no = this.postWeixinCurrentPage 
          // 微信
          this.topPostWeixin(this.topPostParams)
        }
      } else {
        this.isLoading = false
        this.isBrandShow = true
        this.isShow = false
        this.isPost = false
      }
    },
    // 微博的接口
    topPostWeibo(params) {
      const _that = this
      axios
        .post(apiConfig.topPostWeibo, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          _that.isLoading = false 
          if (res.data.data.length === 0 || !res.data.data.length) {
            if (Number(_that.postWeiboCurrentPage) === 0) {
              _that.isShow = true 
              _that.isBrandShow = false
              _that.isPost = false
            }
            // 下面这种是当点击更多的时候，首先loading加载 内容也不能隐藏 
            if (Number(_that.postWeiboCurrentPage) !== 0) {
              _that.isShow = true 
              _that.isBrandShow = false
              _that.isPost = true
            }
          } else {
            _that.isShow = false 
            _that.isBrandShow = false
            _that.isPost = true
            _that.postType = 0
            _that.postListBox.push(res.data.data) 
            _that.postWeiboCurrentPage ++ 
          }
        })
        .catch(function(error) {
          // console.log(error) 
          alert(error) 
        })
    },
    // 微信的接口
    topPostWeixin(params) {
      const _that = this
      axios
        .post(apiConfig.topPostWeixin, params, {
          headers: {
            'Authorization': _that.authorization
          }
        })
        .then(function(res) {
          _that.isLoading = false 
          if (res.data.data.length === 0 || !res.data.data.length) {
            if (Number(_that.postWeixinCurrentPage) === 0) {
              _that.isShow = true 
              _that.isBrandShow = false
              _that.isPost = false
            }
            // 下面这种是当点击更多的时候，首先loading加载 内容也不能隐藏 
            if (Number(_that.postWeixinCurrentPage) !== 0) {
              _that.isShow = true 
              _that.isBrandShow = false
              _that.isPost = true
            }
          } else {
            _that.isShow = false 
            _that.isBrandShow = false
            _that.isPost = true
            _that.postType = 1
            _that.postListBox.push(res.data.data) 
            _that.postWeixinCurrentPage ++ 
          }
        })
        .catch(function(error) {
          // console.log(error) 
          alert(error) 
        })
    },
     // 跳转 kol detail
    intoKolDetail(item) {
      this.$router.push({
        path: '/kol/',
        name: 'KolDetail',
        params: {
          id: item.profile_id,
        },
        query: {
          type: this.tabIndex,
          brand_keywords: this.childKeyList.brand_keywords
        }
      }) 
    },
    PostShowMore() {
      this.isLoading = true 
      this.isBrandShow = false
      this.isShow = false
      this.isPost = true

      if (this.isSelectBrand) {
        if (this.tabIndex === 0) {
          this.topPostParams.page_no = this.postWeiboCurrentPage 
          // 微博
          this.topPostWeibo(this.topPostParams)
        }
        if (this.tabIndex === 1) {
          this.topPostParams.page_no = this.postWeixinCurrentPage 
          // 微信
          this.topPostWeixin(this.topPostParams)
        }
      } else {
        this.isLoading = false
        this.isBrandShow = true
        this.isShow = false
        this.isPost = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-top-post /deep/ .pills-btn {
  position: absolute ;
  right: 30px;
  top: 16px;
}
.list-content {
  padding: 10px 20px 20px;
  height: 460px;
  overflow: hidden;
}
.home-post-title {
  color: nth($purple, 1);
  @include limit-line(1);
  font-size: $font-nm-s;
}
.home-post-content {
  @include limit-line(3);
  font-size: $font-sm;
  line-height: 20px;
}
</style>
