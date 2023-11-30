//基础url
import { useMemberStore } from '@/stores'

const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

//添加拦截器
const httpInterceptor = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    //1.拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url
    }

    //2.设置超时时间  默认60s
    options.timeout = 10000

    //3.添加小程序端请求标识
    options.header = {
      ...options.header, //保留原有header
      'source-client': 'miniapp',
    }

    //4.添加token
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)
