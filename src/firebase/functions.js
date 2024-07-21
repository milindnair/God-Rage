import { app, db } from './config';
import { collection, getDocs } from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore";

import { addDoc } from "firebase/firestore";

export async function getDocument() {
    const docRef = doc(db, "yourCollectionName", "documentId");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}



export async function uploadDocument(title, messages, documents, model) {
  console.log("Uploading document...", title, messages, documents, model);

  // Extract file names from the documents array
  const fileNames = documents.map(doc => doc.fileName);

  try {
    const docRef = await addDoc(collection(db, "Chat History"), {
      title: title,
      chats: messages,
      fileNames: fileNames, // Uploading only the file names
      model: model
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}





export async function getAllDocuments() {
    const querySnapshot = await getDocs(collection(db, "Chat History"));
    const chatsArray = []; // Initialize an array to hold chat objects

    querySnapshot.forEach((doc) => {
        // For each document, push the 'chats' object into the array
        chatsArray.push(doc.data());
    });

    return chatsArray; // Return the array of chat objects
}



