import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
    const topicId = Number(event.context.params?.topicId);
    const query = getQuery(event);
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const offset = (page - 1) * limit;

    if (!topicId || isNaN(topicId)) {
        throw createError({ statusCode: 400, message: 'Topic ID invalide' });
    }

    const db = event.context.mysql;

    try {
        const [rows] = await db.execute(
            `
            SELECT 
                m.id,
                m.content,
                m.creation_date,
                m.id_subject,
                m.id_author,
                u.username AS author_username,
                u.avatar AS author_avatar
            FROM messages m
            JOIN users u ON m.id_author = u.id
            WHERE m.id_subject = ?
            ORDER BY m.creation_date ASC
            LIMIT ${limit}
            OFFSET ${offset}
            `,
            [topicId]
        );

        const { wsServer } = useRuntimeConfig().public;

        if (wsServer?.clients) {
            for (const client of wsServer.clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        type: 'MESSAGE_LIST',
                        topicId,
                        data: rows
                    }));
                }
            }
        }
        return rows;
    } catch (error) {
        console.error('Erreur récupération messages :', error);
        throw createError({ statusCode: 500, message: 'Erreur serveur' });
    }
});