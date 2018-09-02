/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 23:27:25 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-02 23:57:20
 */

import {observable, action} from 'mobx'

export default class App {
    @observable
    count = 0

    @action
    updateCount(num){
        this.count = this.count + num
    }
}