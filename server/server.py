import asyncio
import websockets

async def server(websocket, path):
    print('Client connected')
    try:
        async for message in websocket:
            print(f"Received: {message}")
            await websocket.send(f"You sent: {message}")
    except websockets.exceptions.ConnectionClosed:
        print('Client disconnected')

start_server = websockets.serve(server, "localhost", 5000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()