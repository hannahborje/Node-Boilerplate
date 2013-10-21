#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
TDP013: PROJEKT
Linköpings universitet
Programmeringsklubben

test_progclub.py

Hannah Börjesson & Per Jonsson IP2
hanbo174           perjo927

Testning med Selenium(2) av Programmeringsklubben

För att installera Selenium: $ pip install -U selenium
För att köra på localhost: använd modulen SimpleHTTPServer
Starta testservern med: $ python -m SimpleHTTPServer XXXX
Exekvera med: $ python test_progclub.py XXXX
(XXXX = portnummer, t.ex. 8000)

Skrivet för Python v.2.7.3
"""

from progclub_client import ProgclubClient # se progclub_client.py
from testserver import Server # se testserver.py

import logging
LOG_FILE = 'progclub.log'
logging.basicConfig(filename=LOG_FILE, level=logging.DEBUG)

if __name__ == '__main__':
    """
    # Ladda in  tweets att testa, från fil
    with open(".txt", "r") as x:
        y = x.readlines()
    
    # Samt felmeddelande
    with open("errormsg.txt", "r") as error_source:
        error_msg = error_source.readlines()
    
    """
    server = Server() 
    title = "Programmeringsklubben"  # Fönstertitel
    client = ProgclubClient("http://0.0.0.0:", server.port) # Testverktyget  
    
    try:
       # Försök starta Firefox + ladda sidan
       client.get_url("")
       client.assert_title(title)
        
       
       try:
           msg = "Startar testning"
           logging.info(msg)
           print(msg)        

           
           # Nu är vi på startsidan, har redan assertat det
           # Nu vill vi testa att felaktigt fylla i inloggingsformuläret
           # Först fyller vi bara i ett fält

          
           client.test_incomplete_login([], "")
           #client.test_faulty_login([], "start")
           """
           
           """
           
       except (KeyboardInterrupt, SystemExit):
           logging.error("Program avslutades av användaren")
       except AssertionError as e:
           logging.error("Fel vid assert: {0}".format(e))
       except UnicodeDecodeError as e:
           logging.error("Unicode-fel: {0}".format(e))
       except Exception as e:
           logging.error("Fel uppstod vid testning: ".format(e))
           """ """
                      
       # Om inga fel uppstått under testning    
       else:
           msg = "Testning genomförd (OK)"
           logging.info(msg)
           print(msg)

    # Uppstartsfel
    except Exception as e:
        logging.error("Fel uppstod vid laddning av sida: {0}".format(e))       

    # Oavsett om fel uppstått under uppstart - gör följande
    finally:
        msg = "Slut på testning, stänger webbläsare"
        logging.info(msg)
        print(msg)
        #client.quit() 
       
