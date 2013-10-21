#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
TDP013: PROJEKT
Linköpings universitet
Programmeringsklubben

testserver.py

Hannah Börjesson & Per Jonsson IP2
hanbo174           perjo927

Används för testning med Selenium(2) av webbplatsen Programmeringsklubben
 
"""
import sys

class Server:
    """ Anger portnumret till localhost-servern"""
    def __init__(self):
        # Försök hämta portnummer från kommandoraden 
        if sys.argv[1:]:
            self.port = int(sys.argv[1])
        else:
            self.port = 8082
            
        # För att starta servern på angiven port (för lata typer)
        #subprocess.Popen("python -m SimpleHTTPServer {0}".format(PORT), shell=True)
