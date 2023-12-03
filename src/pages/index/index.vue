<script setup lang="ts">
//
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import { getHomeBanner, getHomeCategoryMutli, getHomeHotMutli } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/component'

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

const guessRef = ref<XtxGuessInstance>() //获取猜你喜欢组件实例
//滚动触底事件
function onScrolltolower() {
  guessRef.value?.getMore()
}

const refresherStatus = ref<boolean>(false)
//自定义下拉刷新被触发
async function onRefresherrefresh() {
  refresherStatus.value = true //开启下拉动画
  await Promise.all([getHomeBannerData(), getgetHomeCategoryMutliData(), getHomeHotMutliData()])
  guessRef.value.reFlash()
  //刷新成功
  uni.showToast({
    icon: 'none',
    title: '刷新成功',
  })
  refresherStatus.value = false //关闭下拉动画
}
</script>

<template>
  <!--导航栏-->
  <CustomNavbar />
  <!--滚动容器-->
  <scroll-view
    refresher-enabled
    :refresher-triggered="refresherStatus"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <!--轮播图-->
    <XtxSwiper :list="bannerList" />
    <!--分类-->
    <CategoryPanel :list="categoryList" />
    <!--热门推荐-->
    <HotPanel :list="hotList" />
    <!--猜你喜欢-->
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
