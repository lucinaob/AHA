

# -*- coding: utf-8 -*-
import logging
from functools import partial
import json
import os
from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler
from django.http import HttpResponse
from django.shortcuts import render
from aha.models import Session, Topic, Geolocation,Institution
import json
from django.template import loader

LOGGER = logging.getLogger('django')


class SessionSummary(APIView):
    logger = LOGGER

    def get(self,request):
       
        sessions = Session.objects.all()
        output = []
        for session in sessions:
            session_data={
                'id': session.id,
                'year':session.year,
                'type':session.type,
                'title':session.title,
                'paper':session.paper,
                'topic':session.topic,
                'affiliated_societies': session.affiliated_societies
            }
            output.append(session_data)
        return Response(output)

