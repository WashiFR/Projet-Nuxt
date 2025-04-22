import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
    const id = Number(event.context.params?.id);
    if (!id || isNaN(id)) {
        throw createError({ statusCode: 400, message: 'ID de sujet invalide' });
    }

    const db = event.context.mysql;

    try {
        const [rows] = await db.execute('SELECT * FROM subjects WHERE id = ?', [id]);
        const topic = (rows as any[])[0];

        if (!topic) {
            throw createError({ statusCode: 404, message: 'Sujet non trouvé' });
        }

    const { wsServer } = useRuntimeConfig().public;

    if (wsServer?.clients) {
        for (const client of wsServer.clients) {
            if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'TOPIC_VIEWED',
                data: topic
            }));
            }
        }
    }

    return topic;
    } catch (error) {
        console.error('Erreur récupération sujet :', error);
        throw createError({ statusCode: 500, message: 'Erreur serveur' });
    }
});
