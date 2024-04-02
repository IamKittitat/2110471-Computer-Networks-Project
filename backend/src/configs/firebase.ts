import admin from "firebase-admin"
import { environment } from "./environment"

const firebaseConfig: admin.ServiceAccount = {
  projectId: environment.firebase.projectId,
  privateKey: environment.firebase.privateKey,
  clientEmail: environment.firebase.clientEmail
}

const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig)
})
const bucket = app.storage().bucket(environment.firebase.bucket)

export default bucket
