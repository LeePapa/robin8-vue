import commonJs from '@javascripts/common.js'

let authorization = ''
let localAuthorization = commonJs.getLocalData('robin8Authorization')
// console.log('当前token：' + localAuthorization)
try {
  if (!!localAuthorization && localAuthorization != '') {
    authorization = localAuthorization
  }
} catch (e) {}

let nickname = ''
let localNickname = commonJs.getLocalData('robin8UserName')
// console.log('当前nickname：' + localNickname)
try {
  if (!!localNickname && localNickname != '') {
    nickname = localNickname
  }
} catch (e) {}

let mobile = ''
let localMobile = commonJs.getLocalData('robin8Mobile')
// console.log('当前mobile：' + localMobile)
try {
  if (!!localMobile && localMobile != '') {
    mobile = localMobile
  }
} catch (e) {}

let account = ''
let localAccount = commonJs.getLocalData('robin8Account')
// console.log('当前account：' + localAccount)
try {
  if (!!localAccount && localAccount != '') {
    account = localAccount
  }
} catch (e) {}

let email = ''
let localEmail = commonJs.getLocalData('robin8Email')
// console.log('当前email：' + localEmail)
try {
  if (!!localEmail && localEmail != '') {
    email = localEmail
  }
} catch (e) {}


let avatarImgUrl = ''
let localImgUrl = commonJs.getLocalData('robin8AvatarImgUrl')
// console.log('当前avatarImgUrl：' + localImgUrl)
try {
  if (!!localImgUrl && localImgUrl != '') {
    avatarImgUrl = localImgUrl
  }
} catch (e) {}

let company = ''
let localCompany = commonJs.getLocalData('robin8Company')
// console.log('当前company：' + localCompany)
try {
  if (!!localCompany && localCompany != '') {
    company = localCompany
  }
} catch (e) {}

let companyName = ''
let localCompanyName = commonJs.getLocalData('robin8CompanyName')
// console.log('当前companyName：' + localCompanyName)
try {
  if (!!localCompanyName && localCompanyName != '') {
    companyName = localCompanyName
  }
} catch (e) {}

let companyLogo = ''
let localCompanyLogo = commonJs.getLocalData('robin8CompanyLogo')
// console.log('当前companyLogo：' + localCompanyLogo)
try {
  if (!!localCompanyLogo && localCompanyLogo != '') {
    companyLogo = localCompanyLogo
  }
} catch (e) {}

let language = ''
let localLanguage = commonJs.getLocalData('robin8Language')
// console.log('当前language：' + localLanguage)
try {
  if (!!localLanguage && localLanguage != '') {
    language = localLanguage
  }
} catch (e) {}

let messages = ''
let localMessages = commonJs.getLocalData('robin8Messages')
// console.log('当前messages：' + localMessages)
try {
  if (!!localMessages && localMessages != '') {
    messages = localMessages
  }
} catch (e) {}

let detailShow = ''
let localDetailShow = commonJs.getLocalData('robin8DetailShow')
// console.log('当前detailShow：' + localDetailShow)
try {
  if (!!localDetailShow && localDetailShow != '') {
    detailShow = localDetailShow
  }
} catch (e) {}

let advancedSearchShow = ''
let localAdvancedSearchShow = commonJs.getLocalData('robin8AdvancedSearchShow')
// console.log('当前advancedSearchShow：' + localAdvancedSearchShow)
try {
  if (!!localAdvancedSearchShow && localAdvancedSearchShow != '') {
    advancedSearchShow = localAdvancedSearchShow
  }
} catch (e) {}

export default {
  authorization,
  nickname,
  mobile,
  account,
  email,
  avatarImgUrl,
  company,
  companyName,
  companyLogo,
  language,
  messages,
  detailShow,
  advancedSearchShow
}
