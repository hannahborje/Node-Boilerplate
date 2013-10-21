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
        self.browser.implicitly_wait(5) # seconds
        self.org_url = url 
        self.port = port
        self.org_url += "{0}/".format(self.port)
        self.new_url = ""

    def get_url(self, path):
        # Öppna önskad URL
        self.new_url = self.org_url + path
        logging.debug("Försöker öppna: {0} ".format(self.new_url))
        
        #if not self.current_url == self.org_url:
        self.browser.get(self.new_url)
       
    
    def assert_title(self, title):
        error = "Sidan du begärde gick inte att ladda. "        
        # Kolla att sidan har laddats genom att se om titeln är vår egen
        assert title == self.browser.title, error

    def refresh(self):
        self.browser.refresh()

    def quit(self):
        self.browser.quit()


        ###########################################
        
    def test_incomplete_login(self, forms, path):
        self.get_url(path)
        # göra grejer med form



    def test_faulty_login(self, forms, path):
        pass


        #################################3
        



        
    """
    def test_tweets(self, tweets, error_msg):
        
        # Hitta elementet där vi komponerar tweets + publicera-knapp
        textarea = self.browser.find_element_by_id("textarea")
        button = self.browser.find_element_by_id("button")
        
        logging.info("Skapar och publicerar tweets:")
        # lägg till default-tweeten som finns i textarean först
        tweets.insert(0, textarea.text) 

        # Skriv tweets + klicka på publicera
        for t in tweets:
            self.send_tweet(t, textarea, button)            
            # Kan vi hitta tweet:en i trädet? Leta felmeddelande annars
            caught_tweet = self.find_tweet()
            logging.info("Hittade tweeten i trädet")
            if not self.assert_tweet(t.strip(), caught_tweet.text.encode('utf-8')):
                self.assert_error_msg(t, error_msg)
            # Testa sedan kronologisk ordning

    def send_tweet(self, tweet, textarea, button):
        logging.debug("Skickar tweet: " + repr(tweet))
        t = tweet.decode('utf-8').strip() # för ÅÄÖ
        textarea.click() # fokus på textrutan          
        textarea.send_keys(t) 
        button.click() 

    def find_tweet(self):
        # find_element_by_id returnerar alltid det första/översta elementet
        # därmed kan vi testa att det översta elementet är det vi senast skickat
        return self.browser.find_element_by_id("tweetmsg")
    
    def find_tweets(self):
        return self.browser.find_elements_by_id("tweetmsg")

    def tweet_exceeds_limits(self, tweet):
        logging.info("Kollar längd på tweeten som skickades")
        length = len(tweet.strip())
        logging.debug("Tweeten som skickades var: " + repr(tweet) + " \n med längd: " + str(length))  
        return length < 1 or length > 140

    def assert_tweet(self, tweet1, tweet2):
        logging.debug("Testar matcha: " + repr(tweet1) + " mot: " + repr(tweet2))
        if tweet1 == tweet2:
            logging.debug("Lyckades")
            return True
        logging.error("Lyckades inte matcha")
        return False

    def find_error_msg(self):
        # Felmeddelande genereras enbart om tweet är < 0 || > 140 tecken
        logging.info("Letar efter felmeddelande i trädet")
        return self.browser.find_element_by_id("error")

    def assert_error_msg(self, tweet, error_msg):
         error_msg = error_msg.decode('utf-8').strip()
         caught_error_msg = self.find_error_msg().text
         
         if self.tweet_exceeds_limits(tweet):
             logging.warning("Otillåten längd på tweet")
             assert caught_error_msg == error_msg, "Hittade ingen tweet och inget felmeddelande"
             logging.warning("Hittade ett felmeddelande: " + caught_error_msg)
        
    def test_checkboxes(self):
        # Hur många bör vi hitta = antalet tweets
        checkboxes = self.find_checkboxes()
        num_boxes = len(checkboxes)
        logging.debug("Letar checkboxar, hittade: " + str(num_boxes))
        
        # klicka, så att de försvinner
        if num_boxes > 0:
            self.disable_textboxes(checkboxes)
            self.test_checkboxes() # Kolla att de försvunnit
        else:
            # Antal bör vara 0
            assert (num_boxes == 0), "Fel: Borde inte finnas checkboxar kvar nu"

    def find_checkboxes(self):
        return self.browser.find_elements_by_id("checkbox")
        
    def disable_textboxes(self, checkboxes):
        for c in checkboxes:
            c.click()


            
    def test_refresh(self):
        caught_tweets = self.find_tweets()
        num_tweets = len(caught_tweets)
        logging.info("Laddar om sidan")
        logging.info("Innan omladdning finns: " + str(num_tweets) + " antal tweets")
        self.refresh()
        self.assert_refresh()        

    def assert_refresh(self):
        # inga poster ska hittas
        caught_tweets = self.find_tweets()
        num_tweets = len(caught_tweets)
        assert (num_tweets ==  0), "Fel: Borde inte finnas tweets kvar"
        logging.debug("Efter omladdning hittades: " + str(len(caught_tweets)) + " antal tweets")
    """
    







