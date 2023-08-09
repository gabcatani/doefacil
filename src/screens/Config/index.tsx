import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Config = () => {
  const navigation = useNavigation<any>();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPopUps, setShowPopUps] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [brightnessControl, setBrightnessControl] = useState(true);
  const [refreshRate, setRefreshRate] = useState('60Hz');
  const [accountManagement, setAccountManagement] = useState(true);
  const [batteryOptimization, setBatteryOptimization] = useState(false);
  
  const toggleSwitch = (setStateFunc: (state: boolean) => void) => {
    setStateFunc(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.row}>
        <Text style={styles.setting}>Modo Escuro:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setIsDarkMode)}
          value={isDarkMode}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Idioma:</Text>
        <TouchableOpacity onPress={() => setLanguage('English')}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('Portuguese')}>
          <Text style={styles.buttonText}>Português</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Notificações:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setNotificationsEnabled)}
          value={notificationsEnabled}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Modo Privado:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setPrivacyMode)}
          value={privacyMode}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Som:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setSoundEnabled)}
          value={soundEnabled}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Exibir Pop-ups:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setShowPopUps)}
          value={showPopUps}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Modo Offline:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setOfflineMode)}
          value={offlineMode}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Atualização Automática:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setAutoUpdate)}
          value={autoUpdate}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Controle de Brilho:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setBrightnessControl)}
          value={brightnessControl}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Taxa de Atualização:</Text>
        <TouchableOpacity onPress={() => setRefreshRate('60Hz')}>
          <Text style={styles.buttonText}>60Hz</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRefreshRate('120Hz')}>
          <Text style={styles.buttonText}>120Hz</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Gerenciamento de Conta:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setAccountManagement)}
          value={accountManagement}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.setting}>Otimização de Bateria:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#98FB98" }}
          thumbColor="#f4f3f4"
          onValueChange={() => toggleSwitch(setBatteryOptimization)}
          value={batteryOptimization}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 60
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  setting: {
    fontSize: 18,
  },
});

export default Config;
