import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';

const donationOptions = [
  {
    title: 'Cadastre a localização',
    description:
      'Defina o local onde a doação será coletada. Use nosso mapa interativo para marcar exatamente onde você estará. Isso ajuda os doadores a encontrarem o ponto de coleta mais conveniente para eles.',
    action: 'More >>',
    lottieFile: require('../../../assets/animations/location.json'), // Substitua pelo caminho correto
  },
  {
    title: 'Escreva a descrição',
    description:
      'Descreva o item que você está doando com detalhes. Inclua informações como condição do item, tamanho, cor e qualquer outro detalhe relevante que ajudará os doadores a entenderem o que você está oferecendo.',
    action: 'More >>',
    lottieFile: require('../../../assets/animations/coments.json'), // Substitua pelo caminho correto
  },
  {
    title: 'Busque sua doação',
    description:
      'Após a doação ser oferecida, organize como ela será entregue. Você pode optar por entregar em pessoa ou usar serviços de transporte parceiros para facilitar o processo de doação.',
    action: 'More >>',
    lottieFile: require('../../../assets/animations/transport.json'), // Substitua pelo caminho correto
  },
];

const DonationScreen = (): any => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any): any => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const viewWidth = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.floor(contentOffsetX / viewWidth);
    setActiveIndex(newIndex);
  };

  const renderPagination = (): any => {
    return (
      <View style={styles.paginationWrapper}>
        {donationOptions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeIndex === index ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {donationOptions.map((option, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{option.title}</Text>
            <Text style={styles.description}>{option.description}</Text>
            <View style={styles.lottieContainer}>
              <LottieView
                source={option.lottieFile}
                autoPlay
                loop
                style={styles.lottie}
              />
            </View>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{option.action}</Text>
            </TouchableOpacity> */}
          </View>
        ))}
      </ScrollView>
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    width: Dimensions.get('window').width - 40,
    justifyContent: 'center', // Isso garantirá que o conteúdo esteja distribuído uniformemente
    alignItems: 'center',
    minHeight: 500, // Ajuste a altura conforme necessário
  },
  title: {
    fontSize: 20, // Tamanho menor do que 24 para aproximar da imagem
    fontWeight: '600', // 600 é semi-bold, pode não ser suportado em todas as plataformas
    color: '#333', // Cor mais escura para o título
    marginBottom: 4, // Espaçamento menor entre o título e a descrição
    textTransform: 'uppercase', // Torna todas as letras maiúsculas
    letterSpacing: 2, // Aumenta o espaçamento entre as letras
  },
  description: {
    fontSize: 14, // Tamanho menor do que 16 para aproximar da imagem
    color: '#666', // Mantém a mesma cor
    marginBottom: 16, // Mantém o mesmo espaçamento
    fontWeight: 'normal', // Peso normal para a descrição
  },
  lottieContainer: {
    height: 300, // Defina a altura conforme necessário para o Lottie
    width: '100%', // Lottie ocupará toda a largura do card
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#C0C0C0',
    marginHorizontal: 8,
  },
  paginationDotActive: {
    backgroundColor: '#4A8C79',
  },
});

export default DonationScreen;
