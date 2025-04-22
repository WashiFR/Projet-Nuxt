import { WebSocket } from 'ws'

const clients = new Set<WebSocket>()

export default defineWebSocketHandler({
    open(peer) {
        console.log('[ws] Nouvelle connexion')
        clients.add(peer)
    },
    message(peer, message) {
        console.log('[ws] Message reçu:', message.text())
        try {
            const data = JSON.parse(message.text())
            if (data.type === 'PING') {
                peer.send(JSON.stringify({ type: 'PONG' }))
            }
        } catch (e) {
            console.error('Erreur de parsing JSON:', e)
        }
    },

    close(peer) {
        console.log('[ws] Connexion fermée')
        clients.delete(peer)
    },

    error(peer, error) {
        console.error('[ws] Erreur:', error)
        clients.delete(peer)
    }
})

export const wsServer = { clients }
