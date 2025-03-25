from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Delivery API",
    description="Una API en memoria que simula plataforma online de Delivery básica",
    version="1.0"
)

# Modelo para validar la entrada del endpoint check_order
class OrderRequest(BaseModel):
    id: int

# Endpoint para verificar el estado de la API
@app.get("/isAlive", summary="Verificar estado de la API", description="Devuelve un mensaje indicando que la API está en funcionamiento.")
def is_alive():
    return {"status": "alive"}

# Endpoint para obtener la versión de la API
@app.get("/version", summary="Obtener la versión de la API", description="Devuelve la versión actual de la API.")
def get_version():
    return {"version": app.version}

# Ruta POST en /check/order
@app.post("/check/order", summary="Verificar estado de una orden", description="Recibe un ID de orden y devuelve su estado.")
async def check_order(order: OrderRequest):
    return {"status": "success", "order_id": order.id}

# Ejecutar solo si se llama directamente
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000, reload=True)
