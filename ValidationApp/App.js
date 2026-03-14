import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import ValidationForm from './components/ValidationForm';
import HtmlValidationForm from "./components/HTMLTagValidation";

const App = () => {
  return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

          {/*<ValidationForm />*/}
        <HtmlValidationForm />

        </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { padding: 15, justifyContent: 'center', flexGrow: 1 }
});

export default App;
