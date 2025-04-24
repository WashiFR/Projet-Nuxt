import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
    const forumId = Number(event.context.params?.forumId);
    const query = getQuery(event);
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const offset = (page - 1) * limit;

    if (!forumId || isNaN(forumId)) {
        throw createError({ statusCode: 400, message: 'Forum ID invalide' });
    }

    const db = event.context.mysql;

    try {
        const [rows] = await db.execute(
        `
        SELECT 
            s.id,
            s.title,
            s.content,
            s.creation_date,
            s.is_locked,
            s.id_forum,
            s.id_author,
            u.username AS author_username,
            u.avatar AS author_avatar
        FROM subjects s
        JOIN users u ON s.id_author = u.id
        WHERE s.id_forum = ?
        ORDER BY s.creation_date DESC
        LIMIT ${limit}
        OFFSET ${offset}
        `,
        [forumId]
    );

    const { wsServer } = useRuntimeConfig().public;

    if (wsServer?.clients) {
        for (const client of wsServer.clients) {
            if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'TOPIC_LIST',
                forumId,
                data: rows
            }));
            }
        }
    }

    return rows;
    } catch (error) {
        console.error('Erreur récupération des sujets :', error);
        throw createError({ statusCode: 500, message: 'Erreur serveur' });
    }
});
