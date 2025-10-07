from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import os
from dotenv import load_dotenv

from . import models, schemas, database

load_dotenv()

app = FastAPI(title="Tutorial Website API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # Both possible React ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
models.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Tutorial Website API"}

@app.get("/profile", response_model=schemas.Profile)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(models.Profile).first()
    if not profile:
        # Create default profile
        profile = models.Profile(
            name="Your Name",
            title="Tutor & Educator",
            bio="Experienced tutor specializing in various subjects...",
            email="your.email@example.com",
            phone="+1234567890",
            teams_link=os.getenv("DEFAULT_TEAMS_LINK", ""),
            calendly_link=os.getenv("DEFAULT_CALENDLY_LINK", "")
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@app.put("/profile", response_model=schemas.Profile)
def update_profile(profile_update: schemas.ProfileUpdate, db: Session = Depends(get_db)):
    profile = db.query(models.Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    for key, value in profile_update.dict(exclude_unset=True).items():
        setattr(profile, key, value)
    
    db.commit()
    db.refresh(profile)
    return profile

@app.get("/availability", response_model=List[schemas.Availability])
def get_availability(db: Session = Depends(get_db)):
    return db.query(models.Availability).all()

@app.post("/availability", response_model=schemas.Availability)
def create_availability(availability: schemas.AvailabilityCreate, db: Session = Depends(get_db)):
    db_availability = models.Availability(**availability.dict())
    db.add(db_availability)
    db.commit()
    db.refresh(db_availability)
    return db_availability

@app.get("/subjects", response_model=List[schemas.Subject])
def get_subjects(db: Session = Depends(get_db)):
    return db.query(models.Subject).all()

@app.post("/appointments", response_model=schemas.Appointment)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = models.Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment