import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import Custombutton from "@/components/Custombutton";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name:'' ,email: '', password: ''});

    const submit = async () => {
        if(!form.name || !form.email || !form.password) return Alert.alert('Error' , 'Please enter valid email address & password');

        setIsSubmitting(true)

        try {
            // Call Appwrite Sign Up Function

            Alert.alert('Success.', 'User Sign Up Successfully');
            router.replace('/')
        } catch (error: any) {
            Alert.alert('Error', error.message);

        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
            <CustomInput
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text) => setForm((prev) =>({...prev ,name:  text} ))}
                label="Full name"
            />
            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text) => setForm((prev) =>({...prev ,email:  text} ))}
                label="Email"
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text) => setForm((prev) =>({...prev ,password:  text} ))}
                label="Password"
                secureTextEntry={true}
            />


            <Custombutton
                title="Sign-Up"
                isLoading={isSubmitting}
                onPress={submit}
            />

            <View className='flex justify-center mt-5 flex-row gap-2'>
                <Text className='base-regular text-gray-100'>Already have a account?</Text>
                <Link href="/sign-in" className='base-bold text-primary'>
                    Sign In
                </Link>
            </View>
        </View>

    )
}
export default SignUp
