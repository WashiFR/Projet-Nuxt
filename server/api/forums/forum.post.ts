import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const body = await readBody(event);
  const { name, description, image } = body;

  if (!name) {
    throw createError({
      statusCode: 400,
      message: 'Le nom du forum est requis'
    });
  }

  const db = event.context.mysql;

  try {
    const creationDate = new Date();

    const [result] = await db.execute(
      'INSERT INTO forums (name, description, image, creation_date) VALUES (?, ?, ?, ?)',
      [name, description || null, image || null, creationDate]
    );

    const forumId = (result as any).insertId;

    const { wsServer } = useRuntimeConfig().public;

    if (wsServer && wsServer.clients) {
      for (const client of wsServer.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'NEW_FORUM',
            data: {
              id: forumId,
              name,
              description,
              image,
              creation_date: creationDate
            }
          }));
        }
      }
    }

    return {
      success: true,
      forumId,
      message: 'Forum créé avec succès'
    };
  } catch (error) {
    console.error('Erreur création forum :', error);
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la création du forum'
    });
  }
});
