import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../store';
import { updateProfile, uploadAvatar } from '../store/slices/userSlice';
import { useTheme } from 'react-native-paper';
import Input from '../components/Input';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const theme = useTheme();
  const { user } = useSelector((state: RootState) => state.auth);
  const { profile, updating } = useSelector((state: RootState) => state.user);

  const currentUser = profile || user;

  const [name, setName] = useState(currentUser?.name || '');
  const [nameError, setNameError] = useState('');
  const [touched, setTouched] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  const validateName = (value: string) => {
    if (!value) {
      return 'Name is required';
    }
    if (value.length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (touched) {
      setNameError(validateName(value));
    }
  };

  const handleNameBlur = () => {
    setTouched(true);
    setNameError(validateName(name));
  };

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 500,
        maxHeight: 500,
      },
      (response) => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Failed to select image');
          return;
        }
        if (response.assets && response.assets[0]) {
          setSelectedImage(response.assets[0].uri || null);
        }
      }
    );
  };

  const handleSave = async () => {
    const nameErr = validateName(name);
    setNameError(nameErr);
    setTouched(true);

    if (nameErr) {
      return;
    }

    try {
      // Upload avatar if selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append('avatar', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        } as any);
        await dispatch(uploadAvatar(formData)).unwrap();
      }

      // Update profile
      await dispatch(updateProfile({ name })).unwrap();
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.error || 'Failed to update profile');
    }
  };

  const avatarUri = selectedImage || currentUser?.avatarUrl;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={handleSelectImage} style={styles.avatarContainer}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.primary }]}>
                <Icon name="account" size={60} color="#fff" />
              </View>
            )}
            <View style={[styles.editButton, { backgroundColor: theme.colors.primary }]}>
              <Icon name="camera" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.avatarHint, { color: theme.colors.onSurfaceVariant }]}>
            Tap to change photo
          </Text>
        </View>

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={handleNameChange}
          onBlur={handleNameBlur}
          autoCapitalize="words"
          leftIcon="account"
          error={nameError}
          touched={touched}
        />

        <Input
          label="Email"
          placeholder="Email address"
          value={currentUser?.email || ''}
          editable={false}
          leftIcon="email"
          style={styles.disabledInput}
        />

        <Button
          title="Save Changes"
          onPress={handleSave}
          loading={updating}
          disabled={updating}
          fullWidth
          style={styles.saveButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarHint: {
    fontSize: 14,
    marginTop: 8,
  },
  disabledInput: {
    opacity: 0.6,
  },
  saveButton: {
    marginTop: 16,
  },
});

export default EditProfileScreen;
