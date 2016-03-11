/* @flow */

import React, { View, Component, StyleSheet, Text } from 'react-native'


export default class Tag extends Component {
    render() {
        return (
            <View style={[styles.tag, this.props.style]}>
                <Text style={styles.tagText}>{this.props.label}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tag: {
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e4e4e4',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    tagText: {
        fontSize: 10,
        color: '#777',
    }
})
