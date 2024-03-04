# Project Documentation

## Overview

This documentation provides a comprehensive guide for future students to interface with the Django project, which incorporates an Angular frontend. The project focuses on visulizing the statistics of past AHA Conferences.
### Technologies Used

- Django: 4.2.6
- Angular: 17
- Database: MySQL

## Setup Instructions

### Prerequisites

Ensure that the following tools are installed on your machine:

- Python 3.11
- Node.js v20.5.0

### Backend Setup

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Navigate to the Django backend(aha) directory:

   ```bash
   cd aha
   ```

3. Apply migrations (when you change the structure of database):

   ```bash
   python manage.py migrate
   ```

4. Start the Django development server:

   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the Angular frontend directory:

   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Start the Angular development server:

   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200/` to access the Angular frontend.

## Dataset

### Description

The dataset comes from teh manually entered google sheet. Each xlsx file is consisted of several sheets including `yearly sessions`, `conferense session database`, `conferences & locations`, `all institutions`, `topical index`, and `panel unique words` for one year. `yearly sessions` counts the number of sessions in the specific year. `conferense session database` records the title of the sessions, the type, the chair and chair institution, participants and participants' paper (if applicable), the start time and day, the topics, and AHA affilicated societies.

### Dataset Integration

- Django Model is defined in `models.py`
  
  - **Geolocation Model:**
  
    *id*: Auto-incremented primary key.
    
    *year*: Integer field representing the year (nullable).
    
    *city*: Text field for the city.
    
    *state*: Text field for the state.
    
    *region*: Text field for the region.
    
    *latitude*: Float field for latitude.
    
    *longitude*: Float field for longitude.
    
   - **Institution Model:**
    
      _institution_: Auto-incremented primary key.
      
      _geolocation_: Foreign key relationship with the Geolocation model, allowing a link to a specific geolocation. This field is nullable, and the on_delete=models.CASCADE ensures that if a Geolocation record is deleted, the associated Institution records are also deleted. The related_name attribute is set to 'geolocation_id' for reverse lookups.
      
      _name_: Text field for the institution's name.
    
    - **Session Model:**
    
      _id_ : Auto-incremented primary key.
      
      _year_: Integer field representing the year.
      
      _type_: Text field for the session type.
      
      _title_: Text field for the session title.
      
      _paper_: Text field for the paper associated with the session.
      
      _topic_: Text field for the session topic.
    
      _affiliated_societies_: Text field for affiliated societies.
      
      _participants_: Text field for participants (nullable).
    
    - **Topic Model:**
    
      _id_: Auto-incremented primary key.
      
      _topic_: Text field for the topic.
    
- Data imported using `load.py`
  
  change `file_name` and `xlsx_path` to import different tables.

# Frontend

- src/index.html:
  
  Define the overall structure of the HTML document
  
- src/style.scss
  
  Define the styles for HTML elements, including layout, positioning, and sizing of elements, colors for text, backgrounds, and borders.

- src/app

  components under this directory.
  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Helpful links

Django: https://docs.djangoproject.com/en/5.0/

Angular: https://angular.io/docs, https://material.angular.io/components/categories
