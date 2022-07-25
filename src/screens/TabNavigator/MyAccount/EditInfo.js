import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Formik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import { Colors, Images, Icons } from '../../../CommonConfig/CommonConfig';
import { async } from '@firebase/util';
import EditInfoValidationSchema from '../../../Schema/EditInfoValidationSchema';
import { postRequest } from '../../../Helper/ApiHelper';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditInfoScreen = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState({})

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            // dispatch(AuthAction.addImage(image))
            setImage(image)
            setModalVisible(!modalVisible)
        });
    };

    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            // dispatch(AuthAction.addImage(image))
            setImage(image)
            console.log(image);
            setModalVisible(!modalVisible)
        });
    };

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        setUser(JSON.parse(await AsyncStorage.getItem("userInfo")))
    }

    const onPressEdit = async (values) => {
        const updateData = new FormData()

        updateData.append('name', values.name)
        updateData.append('phone', values.phone)
        updateData.append("image", {
            uri: image.path,
            type: image.mime,
            name: "image",
        })
        console.log("UPDATE\n", updateData);

        const res = await fetch('https://thank-greens-city.herokuapp.com/update-profile',
            {
                method: 'POST',
                body: updateData,
                headers: {
                    'content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + (await AsyncStorage.getItem('token'))
                }
            })
        const response = await res.json()
        console.log(response);

        await AsyncStorage.setItem('userInfo', JSON.stringify(response.user))

        Toast.show("Profile Update Successfully")
        props.navigation.goBack()
    }

    return (
        // Home Screen
        <View style={styles.main} >
            <StatusBar backgroundColor={Colors.primary} />

            {/* Header */}

            <View style={styles.header} >
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Ionicons name={Icons.BACK_ARROW} size={24} color={Colors.white} style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.titleFruit} >Edit Information</Text>
            </View>
            {/* Body  */}
            <View style={styles.mainWrapper}>
                <Formik
                    initialValues={{
                        name: user.name,
                        phone: user.phone,
                    }}
                    onSubmit={values => { onPressEdit(values) }}
                    validationSchema={EditInfoValidationSchema}
                >
                    {({ values, errors, setFieldTouched, touched, handleChange, setFieldValue, isValid, handleSubmit }) => (

                        <View style={styles.wrapper} >

                            <View style={styles.profile} >
                                <View
                                    style={styles.avatarContainer}
                                >
                                    {image && <Image
                                        source={{ uri: image.path }}
                                        style={styles.avatar}
                                    />}
                                    {!image &&
                                        <Image source={Images.userPic0} style={styles.avatar} />
                                    }
                                </View>
                            </View>

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>

                                        <Text style={styles.modalText}>Choose From</Text>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={choosePhotoFromLibrary}
                                        >
                                            <Text style={styles.textStyle}>Gallery</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={takePhotoFromCamera}
                                        >
                                            <Text style={styles.textStyle}>Camera</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => { setModalVisible(false) }}
                                        >
                                            <Text style={styles.textStyle}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>


                            <TouchableOpacity
                                style={styles.camera}
                                onPress={() => setModalVisible(true)}
                            >
                                <Ionicons name='camera' color={Colors.primary} size={24} />
                            </TouchableOpacity>


                            {/* Name */}
                            <View>
                                <Text style={styles.text}>Full Name</Text>
                                <TextInput
                                    value={values.name}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter your name"
                                    placeholderTextColor={Colors.grey}
                                    style={styles.edit}
                                />
                                {touched.name && errors.name &&
                                    <Text style={styles.error}>{errors.name}</Text>
                                }
                                <View style={styles.line} />

                                {/* Country Code & Phone */}

                                <Text style={styles.text} >Contact Number</Text>
                                <TextInput
                                    value={values.phone}
                                    onBlur={() => setFieldTouched('phone')}
                                    onChangeText={handleChange('phone')}
                                    keyboardType='numeric'
                                    placeholder="enter your phone number"
                                    placeholderTextColor={Colors.grey}
                                    maxLength={10}
                                    style={styles.edit}
                                />
                                {touched.phone && errors.phone &&
                                    <Text style={styles.error}>{errors.phone}</Text>
                                }

                                <View style={styles.line} />
                            </View>

                            <View style={{ alignItems: 'center', }} >
                                <TouchableOpacity onPress={handleSubmit}>
                                    <Text style={styles.signin} >APPLY</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    )}
                </Formik>
            </View>

        </View>
    )
}

export default EditInfoScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    header: {
        flex: 0.6,
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        padding: 10,
        paddingHorizontal: 10
    },
    titleFruit: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white
    },
    mainWrapper: {
        flex: 3,
        padding: 20,
        //  justifyContent: 'space-between',
    },
    line: {
        height: 0,
        borderColor: Colors.grey,
        borderWidth: 0.5,
        width: '100%',
        flexDirection: 'row',
    },
    wrapper: {
        paddingHorizontal: 10,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    edit: {
        paddingVertical: 10
    },
    text: {
        paddingVertical: 10
    },
    error: {
        fontSize: 12,
        color: Colors.red
    },
    signin: {
        width: 280,
        backgroundColor: Colors.primary,
        textAlign: 'center',
        color: Colors.white,
        fontSize: 23,
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.green,
        overflow: 'hidden',
        marginTop: 150,
    },
    back: {
        marginTop: 25
    },
    profile: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 50
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 10
    },
    camera: {
        position: 'absolute',
        right: Dimensions.get('window').width * 0.300,
        top: Dimensions.get('window').width * 0.25,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: Colors.primary,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: Colors.white,
        height: 50,
        width: 50,
        justifyContent: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: Colors.white,
        borderRadius: 40,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        height: 280,
        width: 270,
    },
    button: {
        borderRadius: 50,
        padding: 10,
        elevation: 2,
        marginTop: 20,
        width: 150
    },
    buttonOpen: {
        backgroundColor: Colors.primary,
    },
    buttonClose: {
        backgroundColor: Colors.primary,
        justifyContent: 'center'
    },
    textStyle: {
        color: Colors.white,
        fontWeight: "bold",
        textAlign: "center",
        padding: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20
    },
})