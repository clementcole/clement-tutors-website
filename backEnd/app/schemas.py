from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class ProfileBase(BaseModel):
    name: str
    title: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    teams_link: Optional[str] = None
    calendly_link: Optional[str] = None

class Profile(ProfileBase):
    id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    bio: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    teams_link: Optional[str] = None
    calendly_link: Optional[str] = None

class SubjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    level: Optional[str] = None
    hourly_rate: Optional[int] = None

class Subject(SubjectBase):
    id: int
    
    class Config:
        from_attributes = True

class AvailabilityBase(BaseModel):
    day_of_week: int
    start_time: str
    end_time: str
    is_available: bool = True

class Availability(AvailabilityBase):
    id: int
    
    class Config:
        from_attributes = True

class AvailabilityCreate(AvailabilityBase):
    pass

class AppointmentBase(BaseModel):
    student_name: str
    student_email: Optional[EmailStr] = None
    subject: str
    scheduled_time: datetime
    duration: int = 60

class Appointment(AppointmentBase):
    id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class AppointmentCreate(AppointmentBase):
    pass