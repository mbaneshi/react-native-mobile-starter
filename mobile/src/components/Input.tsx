import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  touched,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  style,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showError = touched && error;

  const getBorderColor = () => {
    if (showError) return theme.colors.error;
    if (isFocused) return theme.colors.primary;
    return theme.colors.outline;
  };

  const handleSecureToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.colors.onSurface }]}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={theme.colors.onSurfaceVariant}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            { color: theme.colors.onSurface },
            leftIcon ? styles.inputWithLeftIcon : undefined,
            (rightIcon || secureTextEntry) ? styles.inputWithRightIcon : undefined,
            style,
          ]}
          placeholderTextColor={theme.colors.onSurfaceDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={handleSecureToggle} style={styles.rightIcon}>
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Icon name={rightIcon} size={20} color={theme.colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
      </View>
      {showError && <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
    padding: 4,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
