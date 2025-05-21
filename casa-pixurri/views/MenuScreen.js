import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';

const { width } = Dimensions.get('window');

const images = [
  require('../assets/casapixurri2.jpg'),
  require('../assets/lanuza2.jpg'),
];

export default function MenuScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([]); // ahora cada mensaje es { role, content }
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef();
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (query.trim()) {
      const newMessages = [...chatMessages, { role: 'user', content: query }];
      setChatMessages(newMessages);

      try {
        const response = await fetch(
          'https://primary-production-f8baf.up.railway.app/webhook-test/aec53179-75f9-45cf-a835-4c571bbd415c',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ history: newMessages }) // Enviar historial como 'history'
          }
        );

        const data = await response.json();
        const reply = data.reply || 'No se recibió respuesta.';

        const updatedMessages = [...newMessages, { role: 'assistant', content: reply }];
        setChatMessages(updatedMessages);
      } catch (error) {
        console.error('❌ Error al conectar con el webhook:', error);
        setChatMessages(prev => [...prev, { role: 'assistant', content: 'Error al conectar con el asistente.' }]);
      }

      setQuery('');
    }
  };

  const scrollTo = (key) => {
    if (key === 'fotos') {
      navigation.navigate('Gallery');
    } else if (positions[key] !== undefined) {
      scrollRef.current.scrollTo({ y: positions[key], animated: true });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll}>
          {/* Menú superior */}
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => scrollTo('inicio')}>
              <Text style={styles.navLink}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
              <Text style={styles.navLink}>Fotos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Apartments')}>
              <Text style={styles.navLink}>Apartamentos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
              <Text style={styles.navLink}>Contacto</Text>
            </TouchableOpacity>
          </View>

          {/* Inicio */}
          <View
            onLayout={(e) => {
              const y = e.nativeEvent.layout.y;
              setPositions(prev => ({ ...prev, inicio: y }));
            }}
            style={styles.section}
          >
            <Text style={styles.welcome}>Bienvenido a Casa Pixurri</Text>
            <Text style={styles.subtitle}>Descubre un lugar único lleno de experiencias inolvidables.</Text>
          </View>

          {/* Chat con IA */}
          <View
            onLayout={(e) => {
              const y = e.nativeEvent.layout.y;
              setPositions(prev => ({ ...prev, apartamento: y }));
            }}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Buscador IA</Text>
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Escribe tu pregunta..."
                value={query}
                onChangeText={setQuery}
                style={styles.input}
                placeholderTextColor="gray"
              />
              <Button title="Enviar" onPress={handleSend} />
            </View>

            <View style={styles.chat}>
              {chatMessages.map((msg, i) => (
                <Text key={i} style={msg.role === 'user' ? styles.userMsg : styles.botMsg}>
                  {msg.content}
                </Text>
              ))}
            </View>
          </View>

          {/* Descripción */}
          <View
            onLayout={(e) => {
              const y = e.nativeEvent.layout.y;
              setPositions(prev => ({ ...prev, contacto: y }));
            }}
            style={styles.description}
          >
            <Text style={styles.sectionTitle}>Sobre Casa Pixurri</Text>
            <Text style={styles.text}>
              Casa Pixurri consta de 5 apartamentos en el Pirineo Aragonés, junto a Sallent de Gállego.
              Está situada entre Formigal y Panticosa y es ideal tanto en invierno como en verano.
              Lanuza ofrece paz y arquitectura tradicional rodeada de naturaleza.
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2c2c2c' },
  scroll: { padding: 20 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
    marginBottom: 20,
    marginTop: 25,
  },
  navLink: { color: 'white', fontSize: 16 },
  welcome: { fontSize: 24, color: 'limegreen', textAlign: 'center', marginVertical: 10 },
  subtitle: { color: 'white', fontSize: 16, textAlign: 'center', marginBottom: 20 },
  section: { marginBottom: 30 },
  searchContainer: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  input: { flex: 1, backgroundColor: 'white', padding: 10, borderRadius: 5, marginRight: 10 },
  chat: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginBottom: 20 },
  userMsg: { textAlign: 'right', color: 'green', marginVertical: 2 },
  botMsg: { textAlign: 'left', color: 'black', marginVertical: 2 },
  description: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 10 },
  sectionTitle: { color: 'limegreen', fontSize: 18, marginBottom: 10 },
  text: { color: 'white', fontSize: 15 },
});
