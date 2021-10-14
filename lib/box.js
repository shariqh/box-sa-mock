import {client} from "./utils/initBox"

export const getCurrentUser = async () => {
  return client.users.get(client.CURRENT_USER_ID)
}

export const getFilesInFolder = async () => {
  return client.folders.getItems("147738975211")
}

