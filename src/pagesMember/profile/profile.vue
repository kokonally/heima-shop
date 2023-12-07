<script setup lang="ts">
// 获取屏幕边界到安全区域距离
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { Gender, ProfileDetail } from '@/types/memebr/member'
import { useMemberStore } from '@/stores'

const { safeAreaInsets } = uni.getSystemInfoSync()

const profile = ref<ProfileDetail>({} as ProfileDetail)

//获取个人信息
async function getMemberProfileData() {
  const resp = await getMemberProfileAPI()
  profile.value = resp.result
}

onLoad(() => {
  getMemberProfileData()
})

const memberStore = useMemberStore()

//修改头像
function onAvatarChange() {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (resp) => {
      //本地路径
      const { tempFilePath } = resp.tempFiles[0]
      //文件上传
      uni.uploadFile({
        url: '/member/profile/avatar',
        name: 'file',
        filePath: tempFilePath,
        success: (resp) => {
          if (resp.statusCode === 200) {
            const avatar = JSON.parse(resp.data).result.avatar
            profile.value!.avatar = avatar
            memberStore.profile!.avatar = avatar
            uni.showToast({
              icon: 'success',
              title: '头像修改成功',
            })
          } else {
            uni.showToast({
              icon: 'error',
              title: '头像修改失败',
            })
          }
        },
      })
    },
  })
}

//点击保存，提交表单
async function onSubmit() {
  const { nickname, gender, birthday, profession } = profile.value
  const resp = await putMemberProfileAPI({
    nickname,
    gender,
    birthday,
    provinceCode: fullLocationCode[0],
    cityCode: fullLocationCode[1],
    countyCode: fullLocationCode[2],
    profession,
  })

  //更新store
  memberStore.profile!.nickname = resp.result?.nickname

  uni.showToast({
    icon: 'success',
    title: '保存成功',
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}

//修改性别
function onGenderChange(event: UniHelper.RadioGroupOnChangeEvent) {
  profile.value.gender = event.detail.value as Gender
}

//修改生日时触发
function onBirthdayChange(event: UniHelper.DatePickerOnChangeEvent) {
  profile.value.birthday = event.detail.value
}

let fullLocationCode: [string, string, string] = ['', '', ''] //地区代码

//修改城市
function onFullLocationChange(event: UniHelper.RegionPickerOnChangeEvent) {
  profile.value.fullLocation = event.detail.value.join(' ')
  fullLocationCode = event.detail.code!
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view @tap="onAvatarChange" class="avatar-content">
        <image class="image" :src="profile.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profile.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input class="input" type="text" v-model="profile!.nickname" placeholder="请填写昵称" />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onGenderChange">
            <label class="radio">
              <radio value="男" color="#27ba9b" :checked="profile?.gender === '男'" />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profile?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">生日</text>
          <picker
            @change="onBirthdayChange"
            class="picker"
            mode="date"
            start="1900-01-01"
            :end="new Date()"
            :value="profile?.birthday"
          >
            <view v-if="profile?.birthday">{{ profile?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            @change="onFullLocationChange"
            class="picker"
            mode="region"
            :value="profile?.fullLocation?.split(' ')"
          >
            <view v-if="profile?.fullLocation">{{ profile?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input class="input" type="text" placeholder="请填写职业" v-model="profile!.profession" />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button class="form-button" @tap="onSubmit">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
