import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const topicId = Number(event.context.params?.topicId);
  const { content, authorId } = await readBody(event);

  if (!topicId || !content || !authorId) {
    throw createError({ statusCode: 400, message: 'Champs manquants' });
  }

  const db = event.context.mysql;
  const creationDate = new Date();

  try {
    const [result] = await db.execute(
      'INSERT INTO messages (content, creation_date, id_subject, id_author) VALUES (?, ?, ?, ?)',
      [content, creationDate, topicId, authorId]
    );

    const messageId = (result as any).insertId;

    const newMessage = {
      id: messageId,
      content,
      creation_date: creationDate,
      id_subject: topicId,
      id_author: authorId
    };

    const { wsServer } = useRuntimeConfig().public;
    if (wsServer?.clients) {
      for (const client of wsServer.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'NEW_MESSAGE',
            topicId,
            data: newMessage
          }));
        }
      }
    }

    return {
      success: true,
      message: newMessage,
      status: 201
    };
  } catch (error) {
    console.error('Erreur ajout message :', error);
    throw createError({ statusCode: 500, message: 'Erreur serveur' });
  }
});
