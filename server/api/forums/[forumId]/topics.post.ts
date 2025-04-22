import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
    const forumId = Number(event.context.params?.forumId);
    const { title, content, author } = await readBody(event); 

    if (!forumId || !title || !content || !author) {
        throw createError({ statusCode: 400, message: 'Champs manquants' });
    }

    const db = event.context.mysql;
    const creationDate = new Date();

    try {
    
        const [subjectResult] = await db.execute(
        'INSERT INTO subjects (id_forum, title, content, creation_date, id_author) VALUES (?, ?, ?, ?, ?)',
        [forumId, title, content, creationDate, author]
        );
        const subjectId = (subjectResult as any).insertId;

    
        await db.execute(
        'INSERT INTO messages (id_subject, content, creation_date, id_author) VALUES (?, ?, ?, ?)',
        [subjectId, content, creationDate, author]
    );

    const newTopic = {
        id: subjectId,
        id_forum: forumId,
        title,
        content,
        id_author: author,
        creation_date: creationDate
    };

    const { wsServer } = useRuntimeConfig().public;

    if (wsServer?.clients) {
        for (const client of wsServer.clients) {
            if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'NEW_TOPIC',
                data: newTopic
            }));
        }
        }
    }

    return {
        success: true,
        topic: newTopic,
        message: 'Sujet créé avec succès'
    };
    } catch (error) {
        console.error('Erreur création sujet :', error);
        throw createError({ statusCode: 500, message: 'Erreur serveur' });
    }
});
