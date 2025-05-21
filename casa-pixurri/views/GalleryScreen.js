// views/GalleryScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const screenWidth = Dimensions.get('window').width;

export default function GalleryScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>¡Pulsa en la época que te gustaría venir!</Text>

      {/* Imágenes */}
      <View style={styles.grid}>
        <Image source={require('../assets/casapixurri10.jpg')} style={styles.media} />
        <Image source={require('../assets/casapixurri11.jpg')} style={styles.media} />
        <Image source={require('../assets/casapixurri12.jpg')} style={styles.media} />
        <Image source={require('../assets/casapixurri14.jpg')} style={styles.media} />
        <Image source={require('../assets/casapixurri15.jpg')} style={styles.media} />
        <Image source={require('../assets/casapixurri16.jpg')} style={styles.media} />
        <Image source={require('../assets/2.jpg')} style={styles.media} />
        <Image source={require('../assets/lanuza.jpg')} style={styles.media} />
        <Image source={require('../assets/midi.jpg')} style={styles.media} />
        <Image source={require('../assets/ski2.jpg')} style={styles.media} />
        <Image source={require('../assets/terraza.jpg')} style={styles.media} />
        <Image source={require('../assets/terraza2.jpg')} style={styles.media} />
        <Image source={require('../assets/cuat.jpg')} style={styles.media} />
      </View>

      {/* Videos */}
      <View style={styles.grid}>
        <Video
          source={require('../assets/videos/casapixurri.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted
          resizeMode="cover"
          useNativeControls={false}
          shouldPlay
          isLooping
          style={styles.media}
        />
        <Video
          source={require('../assets/videos/otono.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted
          resizeMode="cover"
          useNativeControls={false}
          shouldPlay
          isLooping
          style={styles.media}
        />
        <Video
          source={require('../assets/videos/casapixurri2.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted
          resizeMode="cover"
          useNativeControls={false}
          shouldPlay
          isLooping
          style={styles.media}
        />
        <Video
          source={require('../assets/videos/ski.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted
          resizeMode="cover"
          useNativeControls={false}
          shouldPlay
          isLooping
          style={styles.media}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c2c2c',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ccc',
    marginVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  media: {
    width: screenWidth / 2 - 20,
    height: 180,
    margin: 10,
    borderRadius: 10,
  },
});
