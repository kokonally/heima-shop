import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

/**
 * 猜你喜欢的组合式函数
 */
export const useGuessList = () => {
  //获取猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()

  //滚动触底事件
  function onSrolltoLower() {
    guessRef.value?.getMore() //下一页查询
  }

  return { guessRef, onSrolltoLower }
}
