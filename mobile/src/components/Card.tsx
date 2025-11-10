import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: number;
}

const Card: React.FC<CardProps> = ({ children, style, elevation = 2 }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow,
          elevation,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default Card;
