import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
  const db = event.context.mysql;

  try {
    const [forumRows] = await db.execute('SELECT * FROM forums');
    const forums = forumRows as any[];

    const forumIds = forums.map(f => f.id);

    let subjectCounts: Record<number, number> = {};

    if (forumIds.length > 0) {
      const [countRows] = await db.execute(
        `SELECT id_forum, COUNT(*) AS subjectCount 
         FROM subjects 
         WHERE id_forum IN (${forumIds.map(() => '?').join(',')}) 
         GROUP BY id_forum`,
        forumIds
      );

      for (const row of countRows as any[]) {
        subjectCounts[row.id_forum] = row.subjectCount;
      }
    }

    const forumsWithCounts = forums.map(forum => ({
      ...forum,
      subjectCount: subjectCounts[forum.id] || 0
    }));

    const { wsServer } = useRuntimeConfig().public;

    if (wsServer && wsServer.clients) {
      for (const client of wsServer.clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'FORUM_LIST',
            data: forumsWithCounts
          }));
        }
      }
    }

    return forumsWithCounts;
  } catch (error) {
    console.error('Erreur récupération forums :', error);
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la récupération des forums'
    });
  }
});
