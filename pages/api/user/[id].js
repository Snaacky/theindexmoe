import {getUser} from "../../../lib/db/users"

export default async function handler(req, res) {
    res.status(200).json(await getUser(req.query.id))
}