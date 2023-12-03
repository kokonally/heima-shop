<script setup lang="ts">
//
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import { getHomeBanner, getHomeCategoryMutli, getHomeHotMutli } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'

const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const resp = await getHomeBanner()
  bannerList.value = resp.result
}

const categoryList = ref<CategoryItem[]>([])
// 获取分类数据
const getgetHomeCategoryMutliData = async () => {
  const resp = await getHomeCategoryMutli()
  categoryList.value = resp.result
}

const hotList = ref<HotItem[]>([])
// 热门推荐
const getHomeHotMutliData = async () => {
  const resp = await getHomeHotMutli()
  hotList.value = resp.result
}

// 页面加载完成后执行
onLoad(() => {
  getHomeBannerData()
  getgetHomeCategoryMutliData()
  getHomeHotMutliData()
})
</script>

<template>
  <!--导航栏-->
  <CustomNavbar />
  <!--轮播图-->
  <XtxSwiper :list="bannerList" />
  <!--分类-->
  <CategoryPanel :list="categoryList" />
  <!--热门推荐-->
  <HotPanel :list="hotList" />
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
