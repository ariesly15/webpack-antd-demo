/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-04 13:58:42 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-06 19:58:17
 */

export const NAVIGATOR_DATA = [
    {
        name: 'Home',
        // icon: 'icon-test1',
        link: '/',
        key: 'c244'
    },
    {
        name: 'Login',
        // icon: 'icon-test2',
        link: '/login',
        key: 'c144'
    },
    {
        name: 'Test',
        // icon: 'icon-test3',
        key: 'b234',
        children: [
            {
                name: 'TestApi',
                link: '/app/testapi',
                key: 'c234'
            },
            {
                name: 'TestRouter',
                link: '/app/router',
                key: 'd234'
            },
            {
                name: 'TestAntd',
                link: '/app/antd',
                key: 'd234'
            },
            {
                name: 'TestI18N',
                link: '/app/i18n',
                key: 'd234'
            },
            {
                name: 'Hello',
                link: '/app/hello',
                key: 'd234'
            }
        ]
    }
]