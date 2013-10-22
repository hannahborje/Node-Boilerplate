#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
TDP013: PROJEKT
Linköpings universitet
Programmeringsklubben

progclub_client.py

Hannah Börjesson & Per Jonsson IP2
hanbo174           perjo927

Definierar funktioner för vad som ska testas på webbplatsen
med Selenium(2) 

OBS!
För att installera Selenium: $ pip install -U selenium
Exekveringen förutsätter att Firefox också finns installerat

Skrivet för Python v.2.7.3
"""

from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC 
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys

import logging

class ProgclubClient:
    """ Funktioner för automatiserad testning med Selenium i Firefox """

    def __init__(self, url, port):
        # Skapa en instans av Seleniums Firefox driver
        self.browser = webdriver.Firefox()
        self.browser.implicitly_wait(10) # seconds
        self.org_url = url 
        self.port = port
        self.org_url += "{0}/".format(self.port)
        self.new_url = ""

    def get_url(self, path):
        # Öppna önskad URL
        self.new_url = self.org_url + path
        logging.debug("Försöker öppna: {0} ".format(self.new_url))

        # Onödigt att ladda om sidan om det inte behövs (gör refresh() isf)
        if not self.browser.current_url == self.new_url:
            self.browser.get(self.new_url)
        else:
            logging.debug("{0} var redan öppen".format(self.new_url))
       
    
    def assert_title(self, title):   
        # Kolla att sidan har laddats genom att se om titeln är vår egen
        logging.debug("Kollar sidans titel: {0} ".format(self.browser.title))
        logging.debug("Jämför med väntad titel: {0} ".format(title))
        if not title == self.browser.title:
            logging.error("Stämde inte överens")
        else:
            logging.debug("Stämde överens")

    def refresh(self):
        self.browser.refresh()

    def quit(self):
        self.browser.quit()

    def logout(self, button_id):
        button = self.browser.find_element_by_id(button_id)
        button.click()

        
    def find_error_msg(self, error_id):
        # Felmeddelande genererat om detta element hittas
        logging.info("Letar efter felmeddelande i trädet")
        return self.browser.find_element_by_id(error_id)

    def find_error_msg_class(self, error_id):
        # Felmeddelande genererat om detta element hittas
        logging.info("Letar efter felmeddelande i trädet")
        return self.browser.find_element_by_class_name(error_id)
        
    def test_bad_login(self, elements, path, error_id, credentials):
        self.get_url(path)

        # fyll i credentials i input-fälten
        logging.info("Försöker logga in med felaktiga uppgifter")
        for i in range(len(elements)):
            input_element = self.browser.find_element_by_name(elements[i])
            input_element.send_keys(credentials[i])
        input_element.submit()
        
        # Hitta felmeddelande
        found_msg = self.find_error_msg(error_id).id == error_id
        if not found_msg:
            logging.error("Hittade inget felmeddelande")
        else:
            logging.debug("Hittade felmeddelande")

    def test_good_login(self, elements, path,  credentials):
        self.get_url(path)

        # fyll i credentials i input-fälten
        logging.info("Försöker logga in med bra uppgifter")
        for i in range(len(elements)):
            input_element = self.browser.find_element_by_name(elements[i])
            input_element.send_keys(credentials[i])
        input_element.submit()

    def test_bad_register(self, elements, path, error_id, credentials):
        self.get_url(path)

        # fyll i credentials i input-fälten
        logging.info("Försöker registrera med felaktiga uppgifter")
        for i in range(len(elements)):
            input_element = self.browser.find_element_by_name(elements[i])
            input_element.send_keys(credentials[i])
        input_element.submit()
        
        # Hitta felmeddelande
        found_msg = self.find_error_msg_class(error_id)
        if not found_msg:
            logging.error("Hittade inget felmeddelande")
        else:
            logging.debug("Hittade felmeddelande")

    def test_good_register(self, elements, path, credentials):
        self.get_url(path)

        # fyll i credentials i input-fälten
        logging.info("Försöker registrera ny användare")
        for i in range(len(elements)):
            input_element = self.browser.find_element_by_name(elements[i])
            input_element.send_keys(credentials[i])
        input_element.submit()


    def test_search(self, search_string, search_form_id, button_id):
        input_element = self.browser.find_element_by_id(search_form_id)
        input_element.send_keys(search_string)
        input_element.submit()

    def test_add_friend(self, button_ids):
        for bid in button_ids:
            button = self.browser.find_element_by_id(bid)
            button.click()

    def test_find_friend(self, link_text):
        link = self.browser.find_element_by_link_text(link_text)
        link.click()

    def test_post_wall(self, toggle_popup_id, textarea_id, submit_id, msg):
        msg_btn = self.browser.find_element_by_id(toggle_popup_id)
        msg_btn.click()
        logging.info("Försöker skriva meddelande")
        textarea = self.browser.find_element_by_id(textarea_id)
        #textarea.click()
        textarea.send_keys(msg)
        logging.debug("Har skickat text")
        send_btn = self.browser.find_element_by_id(submit_id)
        send_btn.click()
        logging.info("Har klickat på skicka meddelande-knappen")

    def test_find_msg_on_wall(self, msg, msg_id):
        logging.info("Försöker lokalisera meddelande på vägg")
        msg_text = self.browser.find_element_by_id(msg_id)
        msg_text = msg_text.text
        msg_text.encode("utf-8")
        if (msg in msg_text):
            logging.debug("Meddelande hittat på vägg")
        else:
            logging.error("Meddelande ej hittat")







