from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    title = Column(String(200))
    bio = Column(Text)
    email = Column(String(100))
    phone = Column(String(20))
    teams_link = Column(String(500))
    calendly_link = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Subject(Base):
    __tablename__ = "subjects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    level = Column(String(50))  # Beginner, Intermediate, Advanced
    hourly_rate = Column(Integer)

class Availability(Base):
    __tablename__ = "availability"
    
    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(Integer)  # 0-6 (Monday-Sunday)
    start_time = Column(String(10))  # "09:00"
    end_time = Column(String(10))    # "17:00"
    is_available = Column(Boolean, default=True)

class Appointment(Base):
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String(100), nullable=False)
    student_email = Column(String(100))
    subject = Column(String(100))
    scheduled_time = Column(DateTime, nullable=False)
    duration = Column(Integer)  # in minutes
    status = Column(String(20), default="scheduled")  # scheduled, completed, cancelled
    created_at = Column(DateTime, default=datetime.utcnow)