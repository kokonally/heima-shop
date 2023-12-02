<script setup lang="ts">
//
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import { getHomeBanner } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const resp = await getHomeBanner()
  bannerList.value = resp.result
}

// 页面加载完成后执行
onLoad(() => {
  getHomeBannerData()
})
</script>

<template>
  <!--导航栏-->
  <CustomNavbar />
  <!--轮播图-->
  <XtxSwiper :list="bannerList" />
  <view class="index">index</view>
</template>

<style lang="scss">
//
</style>
