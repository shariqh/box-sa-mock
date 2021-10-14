import {client} from "../../lib/utils/initBox"

export default async (req, res) => {
  console.log((req.body))

  const body = JSON.parse(req.body)
  console.log(body)

  const response = await client.collaborations.createWithUserEmail(
    body.email,
    body.itemID,
    body.role
  )

  console.log(response)

  return res.status(200).json({ response })
}
