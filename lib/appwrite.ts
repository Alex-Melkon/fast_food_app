import {Client} from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform:"com.jsm.foodordering",
    databaseId:'68830050001f9df0e86c',
    userCollectionId:'688300780004e4bcb873',
}

export const client= new Client();