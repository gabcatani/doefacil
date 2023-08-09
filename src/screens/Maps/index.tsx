import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import MapView, { Marker, Callout} from 'react-native-maps';

const MapScreen = () => {
  const mapRegion = {
    latitude: -26.724957,
    longitude: -53.515944,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [showMap, setShowMap] = useState(true);

  const toggleView = () => {
    setShowMap(!showMap);
  };

  return (
    <View style={styles.container}>
      {showMap ? ( 
         <MapView style={styles.map} initialRegion={mapRegion}>
         <Marker coordinate={mapRegion}>
            <Image
              source={{ uri: 'https://cdn.desapega.net/pictures/51/631e876c0528564560fc867de3631f1a701fda48cd81f548c47a7636a58495.jpg' }}
              style={styles.marker}
            />
            <Callout>
              <Text style={styles.calloutTitle}>Fogão a Gás</Text>
            </Callout>
          </Marker>
          <Marker coordinate={{ latitude: -26.73, longitude: -53.52 }}>
            <Image
              source={{ uri: 'data:image/jpeg;base64,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' }}
              style={styles.marker}
            />
            <Callout>
              <Text style={styles.calloutTitle}>Cadeira Couro</Text>
            </Callout>
          </Marker>
          <Marker coordinate={{ latitude: -26.75, longitude: -53.52 }}>
            <Image
              source={{ uri: 'https://img.olx.com.br/images/16/160394177272986.jpg' }}
              style={styles.marker}
            />
            <Callout>
              <Text style={styles.calloutTitle}>Micro Ondas</Text>
            </Callout>
          </Marker>
          <Marker coordinate={{ latitude: -26.83, longitude: -53.62 }}>
            <Image
              source={{ uri: 'https://receitasolidaria.org.br/wp-content/uploads/2021/02/noticia-doacao-de-sofa-1020.jpg' }}
              style={styles.marker}
            />
            <Callout>
              <Text style={styles.calloutTitle}>Título do Marcador 3</Text>
            </Callout>
          </Marker>
          <Marker coordinate={{ latitude: -26.74, longitude: -53.51 }}>
            <Image
              source={{ uri: 'https://receitasolidaria.org.br/wp-content/uploads/2021/02/noticia-doacao-de-sofa-1020.jpg' }}
              style={styles.marker}
            />
            <Callout>
              <Text style={styles.calloutTitle}>Sofá Usado</Text>
            </Callout>
          </Marker>
       </MapView>
      ) : (
        <View>
          {/* Renderizar a listagem de lugares aqui */}
          <Text style={styles.listingText}>Listagem de lugares</Text>
        </View>
      )}

      <View style={styles.overlay}>
        <Text style={styles.title}>Navegue pelo Mapa</Text>
        <Text style={styles.description}>Escolha os itens em destaque</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={showMap ? 'Lista De Itens' : 'Mostrar Mapa'}
          onPress={toggleView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 76,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  listingText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 16,
  },
  marker: {
    width: 60, // Aumente a largura do marcador
    height: 60, // Aumente a altura do marcador
    borderRadius: 30, // Deixa o marcador redondo
    borderWidth: 2, // Define a largura da borda
    borderColor: 'black', // Define a cor da borda
  },
   calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapScreen;
