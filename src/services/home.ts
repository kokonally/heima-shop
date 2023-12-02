import { http } from '@/utils/http'
import type { BannerItem } from '@/types/home'

/**
 * 首页广告区域
 * @param distributionSite 活动 banner 位置，1 代表首页，2 代表商品分类页，默认为 1
 */
export const getHomeBanner = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
