import {client} from "../../lib/utils/initBox"

const patientFormsFolder = "147827125315"

export default async (req, res) => {
  const response = await client.folders.create(patientFormsFolder, req.body)

  return res.status(200).json({ id: response.id })
}
