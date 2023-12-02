<script setup lang="ts">
//
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import { getHomeBanner, getHomeCategoryMutli } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const resp = await getHomeBanner()
  bannerList.value = resp.result
}

// 获取分类数据
const getgetHomeCategoryMutliData = async () => {
  const resp = await getHomeCategoryMutli()
  console.log(resp)
}

// 页面加载完成后执行
onLoad(() => {
  getHomeBannerData()
  getgetHomeCategoryMutliData()
})
</script>

<template>
  <!--导航栏-->
  <CustomNavbar />
  <!--轮播图-->
  <XtxSwiper :list="bannerList" />
  <!--分类-->
  <CategoryPanel />
  <view class="index">index</view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
