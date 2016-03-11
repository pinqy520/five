/* @flow */

import React, { View, Text, Image } from 'react-native'

export default function Loading (props) {
    if (!props.show) {
        return null
    }
    return (
        <View style={props.style}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
                <Image style={{width: 200, height: 150, resizeMode: 'contain'}} source={require('../assets/loading.gif')} />
                <Text>{props.text}</Text>
            </View>
        </View>
    )
}

Loading.defaultProps = {
    style: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: 'loading...'
}
