/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-04 14:27:50 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-04 14:46:38
 */

import lscache from 'lscache'
import {LOCAL_LANGUAGE} from '../common/constants'
import I18N from 'i18n-js'
import en_US from './en_US'
import zh_CN from './zh_CN'

I18N.fallbacks = true
I18N.translations = {
    en_US,
    zh_CN
}
I18N.defaultLocale = 'zh_CN'
/**
 * 存放在 localstorage 中, 默认 'zh_CN'
 * 设置是只需要 lscache.set(LOCAL_LANGUAGE, 'en_US'), 并刷新页面
 */
const local = lscache.get(LOCAL_LANGUAGE)
I18N.locale = local ? local : 'zh_CN'

export default I18N