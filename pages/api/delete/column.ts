import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { canEdit } from '../../../lib/session'
import { deleteColumn } from '../../../lib/db/columns'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function apiDeleteColumn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  if (canEdit(session)) {
    const d = req.body
    if (d._id !== '') {
      await deleteColumn(d._id)

      res.status(200).send('Deleted')
    } else {
      res.status(400).send('Missing _id')
    }
  } else {
    // Not Signed in
    res.status(401).send('Not logged in or edits are not permitted')
  }
  res.end()
}
