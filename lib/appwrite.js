import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';


export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '663a15ef000af1dac0e5',
  platform: 'com.PhoenixLogic.Aora',
  databaseId: '663a181a001fe9cd928f',
  userCollectionId: '663a184f0038d2e88b9b',
  videosCollectionId: '663a18a8003123ff5dcc',
  storageId: '663a1c5f003d991001d1'

}


// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
  ;




const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)


export const createUser = async (email, password, userName) => {
  try {
    const newAccount = await account.create(ID.unique(),
      email,
      password,
      userName)
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(userName);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username: userName,
        avatar: avatarUrl,

      }
    )
    await signIn(email, password);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw Error;
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}


export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal('accountId', currentAccount.$id)
      ]
    )
    if (!currentUser) throw Error;
    return currentUser;

  } catch (error) {
    console.log(error);
    throw new Error(error);

  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error)
    
  }
}


export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.orderDesc('$createdAt',Query.limit(7))]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error)

  }
}


export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.search('title',query)]
    )
    return posts.documents;
  } catch (error) {
    throw new Error(error)

  }
}