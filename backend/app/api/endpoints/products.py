from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.dependencies import get_db
from app.db import models
from app.schemas import product as product_schema

router = APIRouter()

@router.get("/", response_model=List[product_schema.ProductResponse])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(models.Product).offset(skip).limit(limit).all()
    return products

@router.get("/{product_id}", response_model=product_schema.ProductResponse)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=product_schema.ProductResponse)
def create_product(product: product_schema.ProductCreate, db: Session = Depends(get_db)):
    # In a real app, only admins could do this
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
