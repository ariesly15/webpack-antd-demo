/*
 * @Author: aweleey.li@qunar.com 
 * @Date: 2018-09-02 16:20:19 
 * @Last Modified by: aweleey.li@qunar.com
 * @Last Modified time: 2018-09-02 16:45:12
 */

import React, { Component } from "react";

export default class Loading extends Component {
    render() {
        const { isLoading, error } = this.props;

        // Handle the loading state
        if (isLoading) {
            return <div>Loading...</div>
        }
        // Handle the error state
        else if (error) {
            return <div>
                Sorry, there was a problem loading the page.
                <div>{JSON.stringify(error, null, 4)}</div>
            </div>
        } else {
            return null
        }
    }
}
