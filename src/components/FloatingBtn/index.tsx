import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

type PropTypes = {
   onPress: () => void;
};
const FloatingBtn = ({ onPress }: PropTypes) => <FAB icon="refresh" style={styles.fab} onPress={onPress} />;

const styles = StyleSheet.create({
   fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
   },
});

export default FloatingBtn;
