import {getSession} from "next-auth/client"
import {canEdit} from "../../../../lib/session"
import {updateLibrary} from "../../../../lib/db/libraries"

export default async function apiEditLibraryOrder(req, res) {
    const session = await getSession({req})
    if (canEdit(session)) {
        const d = req.body
        if (Array.isArray(d.libraries)) {
            await Promise.all(
                d.libraries.map(
                    async (t, i) => await updateLibrary(typeof t === "string" ? t : t._id, {order: i})
                )
            )

            res.status(200).send("Ok")
        } else {
            res.status(400).send("Missing libraries")
        }
    } else {
        // Not Signed in
        res.status(401).send("Not logged in or edits are not permitted")
    }
    res.end()
}