from pydantic import BaseModel
from typing import List
from app.schemas.product import ProductResponse

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int

class OrderItemCreate(OrderItemBase):
    price_at_purchase: float

class OrderItemResponse(OrderItemBase):
    id: int
    price_at_purchase: float
    product: ProductResponse

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    items: List[OrderItemBase]

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_price: float
    status: str
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True
