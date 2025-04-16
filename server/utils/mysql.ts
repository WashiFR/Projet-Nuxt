// server/utils/mysql.ts
import bluebird from 'bluebird';
import type { EventHandler, EventHandlerRequest } from 'h3';
import mysql from 'mysql2/promise';

const config = {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    user: process.env.MYSQL_USER || 'user',
    password: process.env.MYSQL_ROOT_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'projet'
};

export const defineWrappedResponseHandler = <T extends EventHandlerRequest, D>(
    handler: EventHandler<T, D>
): EventHandler<T, D> =>
    defineEventHandler<T>(async event => {
        try {
            const connection = await mysql.createConnection({
            ...config,
            Promise: bluebird,
        });
        event.context.mysql = connection;
        const response = await handler(event);
        await event.context.mysql.end();
        return response;
    } catch (err) {
        console.error('MySQL error:', err);
        return { error: 'Database error', message: (err as Error).message };
    }
});