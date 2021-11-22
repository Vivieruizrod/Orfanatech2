# -*- coding: utf-8 -*-
"""
Created on Thu Nov 18 20:47:14 2021

@author: Jairo
"""

from flask import Flask;
from flask import request
import os;
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


app = Flask(__name__);

@app.route("/")

def inicio():
    prueba = os.environ.get("prueba");
    return prueba;

@app.route("/sms")
def sms():
    try:
    
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido = request.args.get("mensaje")
        destino = request.args.get("destino")
        
        message = client.messages \
                        .create(
                             body=contenido,
                             from_='+14632239893',
                             to='+57'+destino
                             )
                        
        print(message.sid)
        return "enviado"
    except Exception as e :
        return 'Error: '
    
@app.route('/email')
def email():
    remitente = 'jairocabarcas@gmail.com'
    destino = request.args.get("destino")
    asunto = request.args.get("asunto")
    contenido = request.args.get("contenido")
    message = Mail(
        from_email=remitente,
        to_emails=destino,
        subject=asunto,
        html_content=contenido)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return 'enviado'
    except Exception as e:
        print(e.message)
        return 'enviado'

    
                         
if __name__ == '__main__': 
    app.run();