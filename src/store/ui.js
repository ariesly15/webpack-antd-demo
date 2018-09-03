/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-03 13:50:28 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-03 14:10:39
 */

 /**
  * UI Store中常见存储的信息有：
  * Session 信息
  * 不会再后端存储的信息
  * 会全局影响UI的信息：
  *   Window尺寸
  *   提示消息
  *   当前语言
  *   当前主题
  * 更多可能存储的组件信息：
  *   当前选择
  *   工具条显示隐藏状态
  */

import {observable, action} from 'mobx'

export default class UiStore {
    // 表示在一时间段内请求的个数, 可用做全局 loading
    @observable reqCount = 0


    @action
    updateReqCount(num = 0){
        this.reqCount = this.reqCount + num
        console.log('updateReqCount:', this.reqCount, 'args num:', num)
    }
}