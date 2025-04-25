import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const db = event.context.mysql

    try {
        // Récupère le user
        const [userRows] = await db.execute('SELECT * FROM users')

        const users = userRows as any[]

        if (!users) {
            throw createError({
                statusCode: 404,
                message: 'users non trouvé'
            })
        }
        const { wsServer } = useRuntimeConfig().public

        if (wsServer && wsServer.clients) {
            for (const client of wsServer.clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(
                        JSON.stringify({
                            type: 'USER_VIEWED',
                            data: users
                        })
                    )
                }
            }
        }

        return users
    } catch (error) {
        console.error('Erreur récupération users :', error)
        throw createError({
            statusCode: 500,
            message: 'Erreur lors de la récupération des users'
        })
    }
})
