import os
from app.db.database import SessionLocal, engine
from app.db import models

def seed():
    # Drop all tables to reset the database
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    products = [
        {"title": "Sony WH-1000XM5 Wireless Noise Canceling Headphones", "price": 348.00, "description": "Industry leading noise canceling", "image_url": "https://m.media-amazon.com/images/I/41JkNG3N1jL._AC_SX466_.jpg", "rating": 4.6, "rating_count": 8734},
        {"title": "Apple 2023 MacBook Air M2 Chip", "price": 999.00, "description": "13.6-inch Liquid Retina Display, 8GB RAM", "image_url": "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX466_.jpg", "rating": 4.8, "rating_count": 2130},
        {"title": "Echo Dot (5th Gen, 2022 release)", "price": 49.99, "description": "Bigger vibrant sound, helpful routines", "image_url": "https://m.media-amazon.com/images/I/71C3lbbeLsL._AC_SX466_.jpg", "rating": 4.7, "rating_count": 45123},
        {"title": "All-new Kindle Paperwhite (16 GB)", "price": 149.99, "description": "Now with a 6.8\" display and adjustable warm light", "image_url": "https://m.media-amazon.com/images/I/711FkIV-SBL._AC_SX466_.jpg", "rating": 4.7, "rating_count": 18230},
        {"title": "Logitech MX Master 3S - Wireless Performance Mouse", "price": 99.99, "description": "Ultra-fast scrolling, zero noise", "image_url": "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SX466_.jpg", "rating": 4.8, "rating_count": 12543},
        {"title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor", "price": 899.99, "description": "Super Ultrawide Screen QLED", "image_url": "https://m.media-amazon.com/images/I/81Zt42DRSJL._AC_SX466_.jpg", "rating": 4.5, "rating_count": 8902},
        {"title": "PlayStation 5 Console (PS5)", "price": 499.00, "description": "Next generation gaming console", "image_url": "https://m.media-amazon.com/images/I/51rPtaA6iPL._AC_SX466_.jpg", "rating": 4.9, "rating_count": 89123},
        {"title": "Nintendo Switch with Neon Blue and Neon Red Joy‑Con", "price": 299.00, "description": "Play at home or on the go", "image_url": "https://m.media-amazon.com/images/I/61-PblYntsL._AC_SX466_.jpg", "rating": 4.8, "rating_count": 102455},
        {"title": "Bose QuietComfort Earbuds II", "price": 279.00, "description": "Wireless, Bluetooth, World's Best Noise Cancelling In-Ear Headphones", "image_url": "https://m.media-amazon.com/images/I/5112Gv8G2KL._AC_SX466_.jpg", "rating": 4.4, "rating_count": 6732},
        {"title": "Anker 737 Power Bank (PowerCore 24K)", "price": 149.99, "description": "24,000mAh 3-Port Portable Charger with 140W Output", "image_url": "https://m.media-amazon.com/images/I/61x0yN7+j-L._AC_SX466_.jpg", "rating": 4.7, "rating_count": 3412},
        {"title": "Razer BlackWidow V3 Mechanical Gaming Keyboard", "price": 99.99, "description": "Green Mechanical Switches - Tactile & Clicky", "image_url": "https://m.media-amazon.com/images/I/71N14w6yU6L._AC_SX466_.jpg", "rating": 4.6, "rating_count": 15423},
        {"title": "Dyson V15 Detect Cordless Vacuum Cleaner", "price": 749.99, "description": "Laser reveals microscopic dust", "image_url": "https://m.media-amazon.com/images/I/611Zz4+yECL._AC_SX466_.jpg", "rating": 4.5, "rating_count": 4832}
    ]
    for p in products:
        db.add(models.Product(**p))
    db.commit()
    print(f"Database reset and seeded with {len(products)} products!")

if __name__ == "__main__":
    seed()
