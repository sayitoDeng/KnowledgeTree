import React, { Component } from 'react';
import {observer,inject} from 'mobx-react';

@inject("store")
@observer

export default class Hello extends Component {
    render() {
        return (
            <h1>
                Hello,{this.props.store.appname}
            </h1>
        )
    }
}
