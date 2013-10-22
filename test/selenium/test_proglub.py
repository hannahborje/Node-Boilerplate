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

    Krav som ska testas:
    Front-end ska testas med Selenium.
    Användare skall kunna registrera sig, logga in på en
    personlig sida samt logga ut.
    Användare skall kunna söka efter andra användare. 
    Användare skall kunna lägga till andra användare som vänner. 
    Användare skall kunna se en lista över sina vänner. 
    Användare skall kunna se sina vänners sidor. 
    Användare skall kunna posta meddelanden på sina vänners sidor. 
    Alla formulär skall valideras på klienten
"""

from progclub_client import ProgclubClient # se progclub_client.py
from testserver import Server # se testserver.py

import string
import random

import logging
LOG_FILE = 'progclub.log'
logging.basicConfig(filename=LOG_FILE, level=logging.DEBUG)

if __name__ == '__main__':

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

           
           # Nu är vi på startsidan,
           # Nu vill vi testa att felaktigt fylla i inloggingsformuläret
           login_elements = ["email", "password"]
           path = ""
           error_id = "signin-error"
           credentials = ["bad@email.com", "badpass"] 
           client.test_bad_login(login_elements, path, error_id, credentials)

           # Hämta URL:er vi kan komma åt som icke-inloggade
           client.get_url("about")
           client.assert_title("Om Programmeringsklubbena")
           client.get_url("explore")
           client.assert_title("Programmeringsklubben: Utforska")
           client.get_url("register")
           client.assert_title("Registrera dig hos Programmeringsklubben")

           # Nu är vi på registreringssidan
           # Nu vill vi testa att felaktigt fylla i inloggingsformuläret
           register_elements = ["firstname", "lastname", "email",
                                "password", "confirm"]
           path = "register"
           error_id = "error"
           credentials = ["x", "x", "x", "x", "x"] 
           client.test_bad_register(register_elements, path, error_id, credentials)

           # rensa fälten
           client.refresh()
           
           # Nu vill vi testa att registrera en användare som redan finns
           error_id = "result"
           credentials = ["Per", "Jonsson", "perjo927@student.liu.se",
                          "perj", "perj"] 
           client.test_bad_register(register_elements, path, error_id, credentials)

           client.refresh()   

           # Skapa random användare
           random_user = ""
           for i in range (10):
               random_user += random.choice(string.letters)
           random_email = random_user + "@email.com"

           credentials = [random_user, "XX", random_email,
                          "xxxx", "xxxx"] 
           
           # Registrera hen
           client.test_good_register(register_elements, path, credentials)

           # Vi ska nu tas till inloggningssidan
           client.assert_title("Logga in hos Programmeringsklubben")
           # Vi ska nu kunna logga in med samma uppgifter
           login_elements = ["email", "password"]
           path = "signin"
           credentials = [random_email, "xxxx"] 
           client.test_good_login(login_elements, path,  credentials)
           
           # Vi ska nu stå i vår kontrollpanel
           client.assert_title("Programmeringsklubben: " + random_user + " XX")
           
           # Vi ska nu kunna söka efter användare
           search_form_id = "search"
           button_id = "search-submit"
           search_string = "Per Jonsson" 
           client.test_search(search_string, search_form_id, button_id)
           # tryck på sökknapp, validera att vi är på rätt sida
           client.assert_title("Programmeringsklubben: Per Jonsson")
           # Lägg till vän
           button_ids = ["submit-request","friend-request"]
           client.test_add_friend(button_ids)
           # Validera genom att kolla i vänlista => klicka på länk där
           client.get_url("dash")
           client.assert_title("Programmeringsklubben: " + random_user + " XX")
           link_text = "Per Jonsson"
           client.test_find_friend(link_text)
           # Nu ska vi vara på vännens sida igen
           client.assert_title("Programmeringsklubben: Per Jonsson")
           
           # Posta ett meddelande på min väns sida
           toggle_popup_id = "msg-toggle"
           textarea_id = "send-msg"
           submit_id = "write-msg"
           msg = "Tjena Perra"
           msg_id = "msg-text"
           client.test_post_wall(toggle_popup_id, textarea_id, submit_id, msg)
           #  refresha
           client.refresh()
           # Hitta meddelande
           client.test_find_msg_on_wall(msg, msg_id)
           
           # ALla krav tillgodosedda , ogga ut
           client.logout("logout")
           # tillbaka på startsidan nu?
           client.assert_title(title)
           
           
       except (KeyboardInterrupt, SystemExit):
           logging.error("Program avslutades av användaren")
       except UnicodeDecodeError as e:
           logging.error("Unicode-fel: {0}".format(e))
       except Exception as e:
           logging.error("Fel uppstod vid testning: ".format(e))

                      
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
        client.quit() 
       
