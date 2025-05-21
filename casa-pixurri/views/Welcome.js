// Welcome.js
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Welcome({ navigation }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handlePress = () => {
    navigation.navigate('Menu'); // ✅ Navega a la pantalla "Menu"
  };

  return (
    <ImageBackground
      source={require('../assets/14.png')}
      style={styles.background}
    >
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>
          ¡Pulsa en el cubo para ver lo que nos espera!
        </Text>

        <TouchableOpacity onPress={handlePress}>
          <Animated.View style={[styles.cube, { transform: [{ rotateY: rotation }] }]}>
            <Image source={require('../assets/casapixurri.png')} style={styles.cubeFace} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    gap: 20,
  },
  mainTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cube: {
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
  },
  cubeFace: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
