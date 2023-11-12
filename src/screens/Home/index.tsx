import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const EcologyScreen = () => {
  const [newsData, setNewsData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`https://gnews.io/api/v4/search?q=natureza&apikey=c1ebe73ee55264415cce6a3292cd2794`);
  //       setNewsData(response.data.articles);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const NewsItem = ({ title, description }) => (
  //   <View style={styles.newsItem}>
  //     <Text style={styles.newsTitle}>{title}</Text>
  //     <Text>{description}</Text>
  //   </View>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Natureza & Mundo</Text>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Últimas Notícias</Text>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={newsData}
          keyExtractor={item => item.title}
          renderItem={({ item }) => <NewsItem title={item.title} description={item.description} />}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E7F9E9',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'black',
    marginTop: 40
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'black',
  },
  newsItem: {
    padding: 20,
    marginBottom: 12,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default EcologyScreen;
