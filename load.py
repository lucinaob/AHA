
import pandas
import os
import django
import json
# Set the DJANGO_SETTINGS_MODULE environment variable to your project's settings module.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aha.settings')

# Initialize Django
django.setup()

# Now you can import your models and work with them.
from aha.models import Session, Geolocation, Topic


def load_conference_session():
    for year in range(2023,2024):
        file_name = 'AHA '+str(year) +'.xlsx'
        xlsx_path = os.path.join('2020s',file_name)
        print(xlsx_path)
        sheet = pandas.read_excel(xlsx_path, sheet_name='conferense session database')
        raw_sheet = sheet.to_dict()
        i =0

        while i in range(len(raw_sheet['Session Title'])):
            papers = []
            participants = []
    
            if isinstance(raw_sheet['Session Title'][i], str):
                session = Session.objects.create(
                    year = raw_sheet['Year'][i],
                    title = raw_sheet['Session Title'][i],
                    type = raw_sheet['Type'][i],
                    topic =raw_sheet['Topical Index Categories'][i],
                    affiliated_societies = raw_sheet['AHA Affiliated Societies'][i]
                )
                if isinstance(raw_sheet['Participant(s)'][i], str):
                    participants.append(raw_sheet['Participant(s)'][i])
                if isinstance(raw_sheet['Participant(s)'][i], str):
                    participants.append(raw_sheet['Participant(s)'][i])
                if isinstance(raw_sheet['Participant(s) Paper(s) (if applicable)'][i], str):
                    papers.append(raw_sheet['Participant(s) Paper(s) (if applicable)'][i])
                i+=1
            
            while isinstance(raw_sheet['Session Title'][i], str)==False:
                if isinstance(raw_sheet['Participant(s) Paper(s) (if applicable)'][i], str):
                    papers.append(raw_sheet['Participant(s) Paper(s) (if applicable)'][i])
                if isinstance(raw_sheet['Participant(s)'][i], str):
                    participants.append(raw_sheet['Participant(s)'][i])

                i+=1
                if i == len(raw_sheet['Session Title']):
                    break
            session.paper = json.dumps(papers)
            session.participants = json.dumps(participants)
            session.save()
        
def load_geolocation():
    sheet = pandas.read_excel('AHA 1906.xlsx', sheet_name='conferences & locations')
    raw_sheet = sheet.to_dict()
    
    for i in range(len(raw_sheet['City'])):
        print(raw_sheet['Year'][i])
        if pandas.isnull(raw_sheet['Year'][i]):
            raw_sheet['Year'][i] = raw_sheet['Year'][i-1]
        geolocation = Geolocation.objects.create(
            year = raw_sheet['Year'][i],
            city = raw_sheet['City'][i],
            state = raw_sheet['State'][i],
            region =raw_sheet['Region'][i],
            latitute = raw_sheet['Latitute'][i],
            longitude  = raw_sheet['Longitude'][i]
        )

def load_geolocation():
    sheet = pandas.read_excel('AHA 1906.xlsx', sheet_name='conferences & locations')
    raw_sheet = sheet.to_dict()
    
    for i in range(len(raw_sheet['City'])):
        print(raw_sheet['Year'][i])
        if pandas.isnull(raw_sheet['Year'][i]):
            raw_sheet['Year'][i] = raw_sheet['Year'][i-1]
        Geolocation.objects.create(
            year = raw_sheet['Year'][i],
            city = raw_sheet['City'][i],
            state = raw_sheet['State'][i],
            region =raw_sheet['Region'][i],
            latitute = raw_sheet['Latitute'][i],
            longitude  = raw_sheet['Longitude'][i]
        )
        
def load_topics():
    sheet = pandas.read_excel('AHA 2023.xlsx', sheet_name='topical index')
    raw_sheet = sheet.to_dict()
    
    for i in range(len(raw_sheet['Topics'])):
        Topic.objects.create(
            topic = raw_sheet['Topics'][i],
        ) 
if __name__ == "__main__":
    
    load_conference_session()
