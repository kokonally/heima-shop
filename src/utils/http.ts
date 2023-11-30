//基础url
import { useMemberStore } from '@/stores'

const baseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const memberStore = useMemberStore()
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
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}

/**
 * 封装http请求
 * @param options
 */
export const http = <T>(options: UniApp.RequestOptions) => {
  //1.返回一个promise
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      //2.请求成功
      success(resp) {
        //2.1提取核心数据
        const statusCode = resp.statusCode //状态码
        if (statusCode >= 200 && statusCode < 300) {
          //状态码2xx
          resolve(resp.data as Data<T>)
        } else if (statusCode === 401) {
          //401错误 清理用户信息
          memberStore.clearProfile()
          uni.navigateTo({
            url: 'pages/login/login',
          })
          reject(resp) //标记为失败
        } else {
          //通用错误
          uni.showToast({
            icon: 'none',
            title: (resp.data as Data<T>).msg || '请求错误',
          })
          reject(resp)
        }
      },
      fail(err) {
        //网络错误
        uni.showToast({
          icon: 'none',
          title: '网络错误',
        })
        reject(err)
      },
    })
  })
}
