from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.dependencies import get_db, get_current_user
from app.db import models
from app.schemas import order as order_schema

router = APIRouter()

@router.post("/", response_model=order_schema.OrderResponse)
def create_order(
    order_in: order_schema.OrderCreate, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    total_price = sum(item.price_at_purchase * item.quantity for item in order_in.items)
    
    db_order = models.Order(
        user_id=current_user.id,
        total_price=total_price,
        status="Processing"
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in order_in.items:
        db_item = models.OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price_at_purchase=item.price_at_purchase
        )
        db.add(db_item)
    
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/me", response_model=List[order_schema.OrderResponse])
def read_user_orders(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return current_user.orders
