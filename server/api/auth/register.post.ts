import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { defineWrappedResponseHandler } from '~/server/utils/mysql';

export default defineWrappedResponseHandler(async (event) => {
    const body = await readBody(event);
    const { username, email, password } = body;

    if (!username || !email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Les champs username, email et password sont requis'
        });
    }

    const db = event.context.mysql;

    try {
    const [existingUsers] = await db.execute(
      'SELECT * FROM users WHERE username = ? OR email = ?', 
        [username, email]
    );
    
    if ((existingUsers as any[]).length > 0) {
        throw createError({
            statusCode: 409,
            message: 'Ce nom d\'utilisateur ou cet email est déjà utilisé'
    });
    }
        
    const userId = uuidv4();
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const role = 0;
    
    await db.execute(
        'INSERT INTO users (id, role, username, email, password) VALUES (?, ?, ?, ?, ?)',
        [userId, role, username, email, hashedPassword]
    );
    
    const { wsServer } = useRuntimeConfig().public;
    
    if (wsServer && wsServer.clients) {
        for (const client of wsServer.clients) {
            if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'NEW_USER',
                data: {
                    username,
                    userId
                }
            }));
            }
        }
    }
    return {
        success: true,
        message: 'Utilisateur créé avec succès',
        userId
    };
} catch (error) {
    if ((error as any).statusCode) {
        throw error;
    }
    console.error('Erreur lors de l\'inscription:', error);
    throw createError({
        statusCode: 500,
        message: 'Erreur lors de la création de l\'utilisateur'
    });
}
});