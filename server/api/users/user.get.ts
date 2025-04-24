import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const { id } = getQuery(event)
    if (!id) {
        throw createError({
            statusCode: 400,
            message: 'ID de user invalide'
        })
    }

    const db = event.context.mysql

    try {
        // Récupère le user
        const [userRows] = await db.execute('SELECT * FROM users WHERE id = ?', [id])

        const user = (userRows as any[])[0]

        if (!user) {
            throw createError({
                statusCode: 404,
                message: 'user non trouvé'
            })
        }



        const userData = {
            ...user
        }

        const { wsServer } = useRuntimeConfig().public

        if (wsServer && wsServer.clients) {
            for (const client of wsServer.clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(
                        JSON.stringify({
                            type: 'USER_VIEWED',
                            data: userData
                        })
                    )
                }
            }
        }

        return userData
    } catch (error) {
        console.error('Erreur récupération user :', error)
        throw createError({
            statusCode: 500,
            message: 'Erreur lors de la récupération du user'
        })
    }
})
