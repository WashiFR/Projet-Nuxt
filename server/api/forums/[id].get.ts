import { defineWrappedResponseHandler } from '~/server/utils/mysql'

export default defineWrappedResponseHandler(async (event) => {
    const id = Number(event.context.params?.id)

    if (!id || isNaN(id)) {
        throw createError({
            statusCode: 400,
            message: 'ID de forum invalide'
        })
    }

    const db = event.context.mysql

    try {
        // Récupère le forum
        const [forumRows] = await db.execute('SELECT * FROM forums WHERE id = ?', [id])

        const forum = (forumRows as any[])[0]

        if (!forum) {
            throw createError({
                statusCode: 404,
                message: 'Forum non trouvé'
            })
        }

        // Nombre de sujets liés
        const [subjectCountRows] = await db.execute(
            'SELECT COUNT(*) AS subjectCount FROM subjects WHERE id_forum = ?',
            [id]
        )

        const subjectCount = (subjectCountRows as any[])[0]?.subjectCount || 0

        const forumData = {
            ...forum,
            subjectCount
        }

        // 🔄 WebSocket broadcast : FORUM_VIEWED
        const { wsServer } = useRuntimeConfig().public

        if (wsServer && wsServer.clients) {
            for (const client of wsServer.clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(
                        JSON.stringify({
                            type: 'FORUM_VIEWED',
                            data: forumData
                        })
                    )
                }
            }
        }

        return forumData
    } catch (error) {
        console.error('Erreur récupération forum :', error)
        throw createError({
            statusCode: 500,
            message: 'Erreur lors de la récupération du forum'
        })
    }
})
