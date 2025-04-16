import bcrypt from 'bcrypt';
import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Les champs email et password sont requis'
        });
    }

    const db = event.context.mysql;

    try {
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if ((users as any[]).length === 0) {
        throw createError({
            statusCode: 401,
            message: 'Aucun compte ne correspond à cet email'
        });
    }

    const user = (users as any[])[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw createError({
        statusCode: 401,
        message: 'Mot de passe incorrect'
        });
    }

    const { wsServer } = useRuntimeConfig().public;

    if (wsServer && wsServer.clients) {
        for (const client of wsServer.clients) {
            if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'USER_LOGGED_IN',
                data: {
                username: user.username,
                userId: user.id
                }
            }));
            }
        }
    }

    return {
        success: true,
        message: 'Connexion réussie',
        userId: user.id,
        username: user.username,
        role: user.role
    };

    } catch (error) {
    if ((error as any).statusCode) {
        throw error;
    }
    console.error('Erreur lors de la connexion :', error);
    throw createError({
        statusCode: 500,
        message: 'Erreur interne lors de la connexion'
    });
    }
});
