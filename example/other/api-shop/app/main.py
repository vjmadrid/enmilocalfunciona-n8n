from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def get_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.post("/items/add/")
def add_cart():
    return {"item_id": "1", "status": "success"}