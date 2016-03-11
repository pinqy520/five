/* @flow */

import React, { View, Component, StyleSheet, Text, Image, TouchableWithoutFeedback } from 'react-native'
import Dimensions from 'Dimensions'

import Tag from './tag.js'

export default class ArticleCard extends Component {
    render () {
        return (
            <View style={[styles.card, this.props.style]}>
                <TouchableWithoutFeedback onPress={this.props.onPress} style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <View style={styles.fromInfo}>
                            <Image style={styles.fromImage} source={{uri: this.props.data.fromImage}} />
                            <View style={styles.from}>
                                <View>
                                    <Text style={styles.authorText}>{this.props.data.fromAuthor}</Text>
                                </View>
                                <View>
                                    <Text style={styles.fromText}>from: {this.props.data.fromSite}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.articleImageArea}>
                            <Image style={styles.articleImage} source={{uri: this.props.data.image}} />
                        </View>
                        <View style={styles.articleInfo}>
                            <Text style={styles.articleTitleText} numberOfLines={2}>{this.props.data.title}</Text>
                            <Text style={styles.articleDescText} numberOfLines={descLines}>{this.props.data.desc}</Text>
                            <View style={styles.tags}>
                            {
                                this.props.data.tags.map((v, i) => <Tag style={styles.tag} label={v} key={i}/>)
                            }
                            </View>
                            <Text style={styles.entry}>点击阅读</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

ArticleCard.defaultProps = {
    onPress() {}
}

const windowHeight = Dimensions.get('window').height
const fromImageSize = windowHeight > 500 ? 50 : 40
const imageAreaHeight = (windowHeight - 180) / 2
const descLines = Math.floor((windowHeight - 80 - fromImageSize - 20 - imageAreaHeight - 50 - 52 - 60) / 22)

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 2.5,
        shadowOffset: {
            height: 0.5,
        },
    },
    fromInfo: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fromImage: {
        width: fromImageSize,
        height: fromImageSize,
        borderRadius: fromImageSize / 2,
        borderColor: '#ddd',
        marginRight: 10,
    },
    from: {
        flexDirection: 'column',
    },
    authorText: {
        fontSize: 16,
    },
    fromText: {
        fontSize: 12,
        color: '#aaa'
    },
    articleImageArea: {
        height: imageAreaHeight,
    },
    articleImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    articleInfo: {
        flex: 1,
        padding: 10,
    },
    articleTitleText: {
        fontSize: 20,
        lineHeight: 26,
        marginBottom: 5,
    },
    articleDescText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 22,
        overflow: 'hidden',
        color: '#999',
        marginBottom: 30,
    },
    tags: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        left: 10,
        right: 50,
        bottom: 10,
    },
    tag: {
        marginRight: 5,
    },
    entry: {
        position: 'absolute',
        right: 12,
        bottom: 14,
        color: '#ee6e73',
    }
})
