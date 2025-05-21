import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const ApartmentDetailScreen = ({ route }) => {
  const { apartment } = route.params;
  const [disabledDates, setDisabledDates] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState({ start: null, end: null });

  // Datos del cliente
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const markDateRange = (start, end) => {
    const marked = {};
    let current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0];
      marked[dateStr] = { color: '#70d7c7', textColor: 'white' };
      current.setDate(current.getDate() + 1);
    }
    marked[start] = { startingDay: true, color: '#4caf50', textColor: 'white' };
    marked[end] = { endingDay: true, color: '#4caf50', textColor: 'white' };
    return marked;
  };

  const handleDayPress = (day) => {
    const dateStr = day.dateString;
    if (disabledDates[dateStr]) {
      Alert.alert("Fecha no disponible", "Selecciona otra fecha.");
      return;
    }
    if (!range.start || (range.start && range.end)) {
      setRange({ start: dateStr, end: null });
      setSelectedDates({
        [dateStr]: { startingDay: true, endingDay: true, color: '#4caf50', textColor: 'white' }
      });
    } else {
      const startDate = new Date(range.start);
      const endDate = new Date(dateStr);
      if (endDate < startDate) {
        Alert.alert("Rango inválido", "La fecha final no puede ser anterior a la inicial.");
        return;
      }
      let current = new Date(startDate);
      while (current <= endDate) {
        const checkDate = current.toISOString().split('T')[0];
        if (disabledDates[checkDate]) {
          Alert.alert("Rango inválido", "Hay fechas ocupadas en el rango seleccionado.");
          return;
        }
        current.setDate(current.getDate() + 1);
      }
      setRange({ start: range.start, end: dateStr });
      setSelectedDates(markDateRange(range.start, dateStr));
    }
  };

  const handleReserva = async () => {
    try {
      const response = await fetch('https://2f1cc87cc5f5.ngrok.app/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomId: apartment.room_id,
          fechas: `${range.start} to ${range.end}`,
          nombre,
          apellido,
          email,
          telefono,
        })
      });

      const text = await response.text();
      console.log("🧾 Respuesta cruda:", text);

      try {
        const data = JSON.parse(text);
        if (data.url) {
          Linking.openURL(data.url);
        } else {
          Alert.alert("Error", "No se pudo iniciar el pago.");
        }
      } catch (parseErr) {
        console.error("❌ Error al parsear JSON:", text);
        Alert.alert("Error inesperado", "El servidor no devolvió un JSON válido.");
      }

    } catch (err) {
      console.error("Error en reserva:", err);
      Alert.alert("Error", "Hubo un problema al intentar reservar.");
    }
  };

  useEffect(() => {
    const fetchDisponibilidad = async () => {
      try {
        const response = await fetch(`https://2f1cc87cc5f5.ngrok.app/disponibilidad/${apartment.room_id}`);
        const raw = await response.text();
        let data = {};
        try {
          data = JSON.parse(raw);
        } catch (e) {
          console.warn("Error al parsear JSON:", raw);
          return;
        }

        const fechas = {};
        if (data && data[apartment.room_id]) {
          for (const fecha in data[apartment.room_id]) {
            if (data[apartment.room_id][fecha].availability === 0) {
              fechas[fecha] = { disabled: true, disableTouchEvent: true };
            }
          }
        }

        setDisabledDates(fechas);
      } catch (err) {
        console.error("Error al obtener disponibilidad:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDisponibilidad();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{apartment.nombre}</Text>
      <Image source={apartment.imagen} style={styles.mainImage} />

      <View style={styles.infoBox}>
        <Text style={styles.text}><Text style={styles.label}>Habitaciones:</Text> {apartment.habitaciones}</Text>
        <Text style={styles.text}><Text style={styles.label}>Baños:</Text> {apartment.banos}</Text>
        {apartment.duplex && (
          <Text style={styles.text}><Text style={styles.label}>Tipo:</Text> Dúplex</Text>
        )}
        <Text style={styles.text}><Text style={styles.label}>Capacidad:</Text> {apartment.capacidad} personas</Text>
      </View>

      <Text style={styles.subTitle}>Selecciona tu estancia</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ff5a5f" />
      ) : (
        <Calendar
          markingType={'period'}
          markedDates={{ ...disabledDates, ...selectedDates }}
          minDate={new Date().toISOString().split('T')[0]}
          onDayPress={handleDayPress}
        />
      )}

      {range.start && range.end && (
        <>
          <View style={styles.resumen}>
            <Text style={styles.resumenTexto}>
              Estancia seleccionada: {range.start} → {range.end}
            </Text>
          </View>

          <TextInput placeholder="Nombre" style={styles.input} value={nombre} onChangeText={setNombre} />
          <TextInput placeholder="Apellido" style={styles.input} value={apellido} onChangeText={setApellido} />
          <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput placeholder="Teléfono" style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

          <TouchableOpacity style={styles.reserveButton} onPress={handleReserva}>
            <Text style={styles.reserveButtonText}>Reservar y Pagar</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  mainImage: { width: width - 40, height: 250, borderRadius: 10, marginBottom: 20, resizeMode: 'cover' },
  infoBox: {
    backgroundColor: '#fff', padding: 20, borderRadius: 10,
    shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, marginBottom: 20,
  },
  text: { fontSize: 16, marginBottom: 10 },
  label: { fontWeight: 'bold' },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  resumen: { marginTop: 20, backgroundColor: '#d1f7e2', padding: 15, borderRadius: 10 },
  resumenTexto: { fontSize: 16, color: '#333' },
  input: {
    backgroundColor: '#fff', padding: 12, borderRadius: 10,
    marginVertical: 5, borderWidth: 1, borderColor: '#ccc'
  },
  reserveButton: {
    backgroundColor: '#ff5a5f', padding: 15,
    borderRadius: 10, alignItems: 'center', marginTop: 20,
  },
  reserveButtonText: {
    color: '#fff', fontSize: 16, fontWeight: 'bold',
  },
});

export default ApartmentDetailScreen;
