/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-03 11:19:55 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-03 14:20:23
 */

import axios from 'axios'

export default {
    testGet(){
        return axios.get('/api/testGet', {loading: true})
    },
    testPost(params){
        return axios.post('/api/testPost', params, {loading: true})
    },
    testDelete(params){
        return axios.delete('/api/testDelete', {data: params})
    }
}