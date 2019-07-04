import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
#from sqlalchemy import Table, MetaData

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

############ Otro Método

engine = create_engine("mysql://root:Toker1995#@127.0.0.1:3307/fifadb?charset=utf8mb4")

# # reflect an existing database into a new model
Base = automap_base()
# # reflect the tables
Base.prepare(engine, reflect=True)
session = Session(engine)

# # Save references to each table
fifa = Base.classes.fifa



app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/fifa")
def player():
    stmt = session.query(fifa).statement
    df = pd.read_sql_query(stmt, session.bind)
    data = {
        "id": df.player_id.values.tolist(),
        "Name": df.player_name.values.tolist(),
        "Age": df.age.values.tolist(),
        "Nationality": df.nationality.values.tolist(),
        "Overall": df.overall.values.tolist(),
        "Potencial": df.potencial.values.tolist(),
        "Club": df.club.values.tolist(),
        "Value": df.player_value.values.tolist(),
        "Wage": df.wage.values.tolist(),
        "Relase_clause": df.relase_clause.values.tolist()
    }
    
    return jsonify(data)

@app.route("/names")
def teamn():
    #stmt = session.query(fifa).statement
    df = pd.read_sql_query("SELECT DISTINCT club FROM fifa", session.bind)
    #data = {"club":df.club.values.tolist()} 
    club = []
    for index, row in df.iterrows():
        t = {'club':row['club']}
        club.append(t)
    return jsonify(club)

@app.route("/names/<value>")
def theteam(value):
    df = pd.read_sql_query(f"SELECT player_name FROM fifa WHERE club = '{value}'", session.bind)
    #data = {"club":df.club.values.tolist()} 
    club = []
    for index, row in df.iterrows():
        t = {'player_name':row['player_name']}
        club.append(t)
    return jsonify(club)



if __name__ == "__main__":
    app.run()
