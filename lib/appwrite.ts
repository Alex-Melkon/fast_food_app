import {Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";
import {CreateUserParams, GetMenuParams, SignInParams} from "@/type";
import {error} from "@expo/fingerprint/cli/build/utils/log";


export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform:"com.jsm.foodordering",
    databaseId:'68830050001f9df0e86c',
    bucketID:'688e5e1300305b64f1f7',
    userCollectionId:'688300780004e4bcb873',
    categoriesCollectionId:"688e59aa001a4d5da414",
    menuCollectionId:'688e5a39000f155c34dc',
    customizationsCollectionId:'688e5b72002a559fe10d',
    menuCustomizationsCollectionId:'688e5c42003c5f114125',
}

export const client= new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);


export const createUser= async ({ email, password, name } :CreateUserParams) => {
    try{
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw Error;

        await signIn({ email, password });

        const  avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl}
        );
    } catch (e) {
        throw new Error(e as string);
    }
        
}

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch(e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser= async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];

    }catch (e){
        console.log(error);
        throw new Error(e as string);
    }
}

export const  getMenu=async ({ category, query }): GetMenuParams =>{
    try {
        const queries: string[] = [];

        if(category) queries.push(Query.equal('category', category));
        if(query) queries.push(Query.name('name', query));

        const menus = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.menuCollectionId, queries);
        return menus.documents
    }catch (e) {
        throw new Error(e as string);
    }
}

export const getCategories = async () =>{
    try {
        const categories = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.categoriesCollectionId);
    } catch (e) {
        throw new Error(e as string);
    }
    
}