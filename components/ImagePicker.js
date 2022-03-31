import React,{forwardRef} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import ImagePickerCropper from 'react-native-image-crop-picker';
//import ImageCropPicker from 'react-native-image-crop-picker';
import { Ionicons } from '@expo/vector-icons';

const ImagePicker = forwardRef(({onFileSelected}, ref) => {
    const options = [
        {
            name: 'Take from camera',
            icon:  <Ionicons name="camera" size={20} color='white' /> ,
            onPress: () => {
              ImagePickerCropper.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                freeStyleCropEnabled: true,
              })
                .then((images) => {
                  onFileSelected(images);
                })
                .catch((error) => {});
            },
          },
          {
            name: 'Choose from Gallery',
            icon: <Ionicons name="image" size={20} color='white' /> ,
             //<Icon name="image" color={colors.grey} size={21} />,
            onPress: () => {
              ImagePickerCropper.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                freeStyleCropEnabled: true,
              })
                .then((images) => {
                  onFileSelected(images);
                })
                .catch((error) => {});
            },
          },
        ];

        return (
            <View>
            {options.map(({name, onPress, icon}) => (
              <TouchableOpacity
                onPress={onPress}
                //style={styles.pickerOption}
                key={name}>
                {icon}
                <Text >{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
      );
    });

export default ImagePicker;    
