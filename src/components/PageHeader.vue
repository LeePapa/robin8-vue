<template>
  <div class="page-header">
    <div v-if="!!company && company != ''" class="container clearfix">
      <h1 class="partner-logo pull-left">
        <img src="@images/logo.png" alt="Robin8" class="logo-img" />
        <!--<img :src="companyLogo" :alt="company" class="logo-img" />-->
      </h1>
      <div class="user-info pull-right">
        <div class="media">
          <div class="media-left">
            <div v-if="!!avatarImgUrl && avatarImgUrl != 'null'" class="avatar">
              <router-link to="/settings/company_info">
                <img :src="avatarImgUrl" alt="" class="avatar-img" />
              </router-link>
            </div>
            <div v-else class="avatar">
              <router-link to="/settings/company_info">
                <img src="@images/user.png" alt="" class="avatar-img" />
              </router-link>
            </div>
          </div>
          <div class="media-body media-middle">
            <h5 class="name">
              <router-link to="/settings/company_info">{{nickname}}</router-link>
            </h5>
            <p class="logout-btn">
              <span @click="logOut">{{$t('lang.logout')}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="languages-ctrl pull-right">        
        <span
          class="item"
          :class="[lang == 'vi-VN' ? 'active' : '']"
          @click="toggleLang('vi-VN')"
        >Vi</span>
        <span
          class="item"
          :class="[lang == 'en-US' ? 'active' : '']"
          @click="toggleLang('en-US')"
        >En</span>
      </div>
      <div class="sub-logo pull-right">
        <span class="text">Powered by</span>
        <router-link to="/">
          <img src="@images/logo.png" alt="Robin8" class="logo-img" />
        </router-link>
      </div>
    </div>
    <div v-else class="container clearfix">
      <h1 class="logo pull-left">
        <router-link to="/">
          <img src="@images/logo.png" alt="Robin8" class="logo-img" />
        </router-link>
      </h1>
      <div class="user-info pull-right">
        <div class="media">
          <div class="media-left">
            <div v-if="!!avatarImgUrl && avatarImgUrl != 'null'" class="avatar">
              <router-link to="/settings/company_info">
                <img :src="avatarImgUrl" alt="" class="avatar-img" />
              </router-link>
            </div>
            <div v-else class="avatar">
              <router-link to="/settings/company_info">
                <img src="@images/user.png" alt="" class="avatar-img" />
              </router-link>
            </div>
          </div>
          <div class="media-body media-middle">
            <h5 class="name">
              <router-link to="/settings/company_info">{{nickname}}</router-link>
            </h5>
            <p class="logout-btn">
              <span @click="logOut">{{$t('lang.logout')}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="languages-ctrl pull-right">
        <span
          class="item"
          :class="[lang == 'en-US' ? 'active' : '']"
          @click="toggleLang('en-US')"
        >En</span>
        <span
          class="item"
          :class="[lang == 'vi-VN' ? 'active' : '']"
          @click="toggleLang('vi-VN')"
        >Vi</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapState(['avatarImgUrl', 'nickname', 'company', 'companyLogo']),
  },
  data () {
    return {
      lang: ''
    }
  },
  methods: {
    ...mapMutations(['removeAuthorization', 'removeNickname', 'removeMobile', 'removeAccount', 'removeEmail', 'removeAvatarImgUrl', 'removeCompany', 'removeCompanyName', 'removeCompanyLogo', 'setLanguage']),
    logOut () {
      // window.localStorage.clear()
      this.removeAuthorization()
      this.removeNickname()
      this.removeMobile()
      this.removeAccount()
      this.removeEmail()
      this.removeAvatarImgUrl()
      this.removeCompany()
      this.removeCompanyName()
      this.removeCompanyLogo()
      this.$router.replace('/login')
    },
    toggleLang (lang) {
      this.$i18n.locale = lang
      this.lang = lang
      this.setLanguage(lang)
    }
  },
  mounted () {
    this.lang = this.$i18n.locale
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background-color: #3e3b4f;
  .container {
    padding: 20px;
    background-color: #3e3b4f;
    .logo, .partner-logo {
      height: 40px;
      padding: 5px 0;
      .logo-img {
        vertical-align: top;
        height: 100%;
      }
    }
    .sub-logo {
      height: 40px;
      padding: 8px 0;
      .text {
        padding-right: 10px;
      }
      .logo-img {
        vertical-align: top;
        height: 100%;
      }
    }
    .languages-ctrl {
      @include display-flex;
      height: 40px;
      padding: 0 40px;
      align-items: center;
      & > .item {
        margin: 0 5px;
        cursor: pointer;
        &.active {
          color: #fff;
        }
      }
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      .avatar-img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      a {
        color: #fff;
      }
    }
    .logout-btn {
      font-size: $font-xs;
      color: #fafafa;
      span {
        border-bottom: 1px solid #eaeaea;
        cursor: pointer;
      }
    }
  }
}
</style>
