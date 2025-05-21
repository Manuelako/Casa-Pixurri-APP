// views/sections/ContactScreen.js
import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, Dimensions, Image } from 'react-native';
import { Video } from 'expo-av';
import MapView, { Marker } from 'react-native-maps';

const ContactScreen = () => {
  const handleEmail = () => Linking.openURL('mailto:info@casapixurri.com');
  const handleWeb = () => Linking.openURL('https://www.casapixurri.com');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Contacto</Text>

      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 42.7556012,
            longitude: -0.3180123,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: 42.7556012, longitude: -0.3180123 }}
            title="Casa Pixurri"
            description="Juan de Lanuza, 4, 22640 Lanuza, Huesca"
          />
        </MapView>
      </View>

      <View style={styles.videos}>
        <Video
          source={require('../../assets/videos/ubi.mp4')}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay
          isMuted
        />
        <Video
          source={require('../../assets/videos/appCasapixurri2.mp4')}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay
          isMuted
        />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.title}>Casa Pixurri</Text>
        <Text style={styles.text}>Estamos en el Sur de los Pirineos, en Huesca, entre Panticosa y Formigal.</Text>
        <Text style={styles.text}><Text style={styles.bold}>Tel:</Text> 616 28 03 10</Text>
        <Text style={styles.link} onPress={handleEmail}>info@casapixurri.com</Text>
        <Text style={styles.text}>Juan de Lanuza, 4, 22640 Lanuza, Huesca</Text>
        <Text style={styles.link} onPress={handleWeb}>www.casapixurri.com</Text>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mapWrapper: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  videos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  video: {
    width: width * 0.45,
    height: 180,
    borderRadius: 10,
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginVertical: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    fontSize: 15,
    color: '#007bff',
    textDecorationLine: 'underline',
    marginVertical: 4,
  },
});

export default ContactScreen;
