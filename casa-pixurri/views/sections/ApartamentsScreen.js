// views/ApartmentsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const apartments = [
  {
    id: 1,
    nombre: 'Apartamento 1',
    habitaciones: 3,
    banos: 2,
    duplex: true,
    capacidad: 8,
    imagen: require('../../assets/apartamento1.1.avif'),
    playa: false,
    room_id: 574275, // 👈 AÑADIDO
  },
  {
    id: 2,
    nombre: 'Apartamento 2',
    habitaciones: 3,
    banos: 2,
    duplex: false,
    capacidad: 6,
    imagen: require('../../assets/apartamento2.0.avif'),
    playa: false,
    room_id: 574271,
  },
  {
    id: 3,
    nombre: 'Apartamento 3',
    habitaciones: 2,
    banos: 1,
    duplex: false,
    capacidad: 4,
    imagen: require('../../assets/apartamento3.0.avif'),
    playa: false,
    room_id: 574272,
  },
  {
    id: 4,
    nombre: 'Apartamento 4',
    habitaciones: 3,
    banos: 2,
    duplex: true,
    capacidad: 7,
    imagen: require('../../assets/apartamento4.0.avif'),
    playa: false,
    room_id: 574273,
  },
  {
    id: 5,
    nombre: 'Apartamento 5',
    habitaciones: 3,
    banos: 2,
    duplex: false,
    capacidad: 7,
    imagen: require('../../assets/apartamento5.0.avif'),
    playa: false,
    room_id: 574274,
  },
  {
    id: 6,
    nombre: 'Apartamento Playa de Xeraco',
    habitaciones: 3,
    banos: 2,
    duplex: false,
    capacidad: 7,
    imagen: require('../../assets/apartamento_playa.avif'),
    playa: true,
    room_id: 574270,
  },
];

const ApartmentsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Descubre Nuestros Apartamentos en CasaPixurri 🏡</Text>

      <View style={styles.cardsContainer}>
        {apartments.filter(a => !a.playa).map(apto => (
          <View key={apto.id} style={styles.card}>
            <Image source={apto.imagen} style={styles.image} />
            <Text style={styles.cardTitle}>{apto.nombre}</Text>
            <Text style={styles.description}>
              {apto.habitaciones} habitaciones, {apto.banos} baños
              {apto.duplex ? ' - Dúplex' : ''}{'\n'}
              Capacidad: {apto.capacidad} personas
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ApartmentDetail', { apartment: apto })}
            >
              <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Text style={styles.playaMessage}>También tenemos playa! 🌊</Text>

      <View style={styles.cardsContainer}>
        {apartments.filter(a => a.playa).map(apto => (
          <View key={apto.id} style={[styles.card, styles.xeraco]}>
            <Image source={apto.imagen} style={styles.image} />
            <Text style={[styles.cardTitle, styles.xeracoTitle]}>{apto.nombre}</Text>
            <Text style={styles.description}>
              {apto.habitaciones} habitaciones, {apto.banos} baños
              {apto.duplex ? ' - Dúplex' : ''}{'\n'}
              Capacidad: {apto.capacidad} personas
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.xeracoButton]}
              onPress={() => navigation.navigate('ApartmentDetail', { apartment: apto })}
            >
              <Text style={styles.buttonText}>Ver más</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#b1be9e' },
  title: {
    fontSize: 26,
    color: '#666',
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#b6c4b0',
    width: 260,
    height: 380,
    margin: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#849e7f',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  xeraco: {
    backgroundColor: '#fff',
  },
  xeracoTitle: {
    color: '#d3ce8d',
  },
  xeracoButton: {
    backgroundColor: '#d3ce8d',
  },
  playaMessage: {
    fontSize: 18,
    color: '#504e36',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
});

export default ApartmentsScreen;
