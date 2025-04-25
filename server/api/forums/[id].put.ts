import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
  const forumId = event.context.params?.id
  const body = await readBody(event)
  const { name, description } = body

  if (!forumId) {
    throw createError({
      statusCode: 400,
      message: 'ID du forum requis'
    })
  }

  if (!name || !description) {
    throw createError({
      statusCode: 400,
      message: 'Le nom et la description sont requis'
    })
  }

  const db = event.context.mysql

  try {
    const [result] = await db.execute(
      'UPDATE forums SET name = ?, description = ? WHERE id = ?',
      [name, description, forumId]
    )

    const affectedRows = (result as any).affectedRows

    if (affectedRows === 0) {
      throw createError({
        statusCode: 404,
        message: 'Forum non trouvé ou aucune modification effectuée'
      })
    }

    const { wsServer } = useRuntimeConfig().public

    if (wsServer && wsServer.clients) {
      for (const client of wsServer.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: 'FORUM_UPDATED',
              data: {
                id: forumId,
                name,
                description
              }
            })
          )
        }
      }
    }

    return {
      success: true,
      message: 'Forum mis à jour avec succès'
    }
  } catch (error) {
    console.error('Erreur modification forum :', error)
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la mise à jour du forum'
    })
  }
})
