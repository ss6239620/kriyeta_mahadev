import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function ArticleCard({ title, desc, image }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1, flexDirection: 'row', margin: 15 }}>
        {image ?
          <Image source={{ uri: image }} style={styles.image} />
          :
          <Image source={require('../assets/img/health.jpg')} style={styles.image} />
        }
        <View
          style={{ flex: 1, flexDirection: 'column' }}
        >
          <Text numberOfLines={2} style={[styles.boldText, { flexShrink: 1, fontSize: 15 }]}>{title}</Text>
          <Text numberOfLines={3} style={[styles.grayText, { flexShrink: 1, fontSize: 12 }]}>
            {desc}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  grayText: {
    fontSize: 17,
    fontWeight: '700',
    color: "gray"
  },
  boldText: {
    fontSize: 17,
    fontWeight: '700',
    color: "black"
  },
  smallText: {
    fontSize: 12,
    fontWeight: '500',
    color: "black"
  },
  post: {
    width: '90%',
    marginBottom: 24,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 3
  },
  image: {
    width: '40%',
    height: '100%',
    marginRight: 5,
    borderRadius:10
  },
})