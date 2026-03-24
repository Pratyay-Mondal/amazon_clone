from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    image_url: Optional[str] = None
    rating: float = 0.0
    rating_count: int = 0

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int

    class Config:
        from_attributes = True
