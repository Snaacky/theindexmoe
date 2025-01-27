import { auth } from '../../../auth'
import { canEdit } from '../../../lib/session'
import { addCollection, updateCollection } from '../../../lib/db/collections'
import { updateAllCache } from '../../../lib/db/cache'
import { Types } from '../../../types/Components'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function apiEditCollection(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await auth(req, res)
  if (canEdit(session)) {
    const d = req.body
    if (d.urlId === '_new') {
      res.status(400).send('Illegal url id: "_new" is forbidden!')
    } else {
      let id = d._id
      if (typeof d._id === 'undefined') {
        id = await addCollection(
          d.urlId,
          d.img,
          d.name,
          d.nsfw,
          d.description,
          d.items
        )
      } else {
        await updateCollection(d._id, d)
        await updateAllCache(Types.collection)
      }
      res.status(200).send(id)
    }
  } else {
    // Not Signed in
    res.status(401).send('Not logged in or edits are not permitted')
  }
  res.end()
}
