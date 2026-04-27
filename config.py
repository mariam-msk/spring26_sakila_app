# Name: Abdul Raffay Qasim
# Name: Team Member
# Date: 2026-04-23
# Minor improvement after PR review
# Added after review feedback
import os

class Config:
    """Base configuration class for the Sakila Flask application.
    Handles database connection strings and system timeouts.
    """
    MYSQL_HOST = os.environ.get('MYSQL_HOST', 'sakila-db-server')
    MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', 'admin')
    MYSQL_DB = os.environ.get('MYSQL_DB', 'sakila')

    CONNECTION_TIMEOUT = int(os.environ.get('CONNECTION_TIMEOUT', '30'))
    HEALTH_CHECK_INTERVAL = int(os.environ.get('HEALTH_CHECK_INTERVAL', '10'))

    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here-change-this-in-production')
#Author:Urwah Taj
#Date: 2026-04-23
# Purpose: Database configuration for Sakila Flask Application

# Author: Team Member = Aliyah Cheema
# Date: 2026-04-23
# Purpose: Health check configuration merged from feature/add-healthcheck


import os

MYSQL_HOST = os.environ.get('MYSQL_HOST', 'sakila-db-server')
MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', '')
MYSQL_DB = os.environ.get('MYSQL_DB', 'sakila')

try:
    CONNECTION_TIMEOUT = int(os.environ.get('CONNECTION_TIMEOUT', '30'))
except ValueError:
    CONNECTION_TIMEOUT = 30

try:
    HEALTH_CHECK_INTERVAL = int(os.environ.get('HEALTH_CHECK_INTERVAL', '10'))
except ValueError:
    HEALTH_CHECK_INTERVAL = 10



# ============================================================
# config.py
# Author: Mariam Saghir
# Name: Mariam
# Date: 2026-04-27
# Description: Application configuration for Sakila Flask App(Task 2 in A1) 
# ============================================================
# config.py
# Name: Mariam
# Date: 2026-04-27
# Description: Health check configuration also added
# ============================================================

import os

MYSQL_HOST = os.environ.get('MYSQL_HOST', 'sakila-db-server') 
MYSQL_USER = os.environ.get('MYSQL_USER', 'root')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', '')
MYSQL_DB = os.environ.get('MYSQL_DB', 'sakila')

# New variable added
CONNECTION_TIMEOUT = int(os.environ.get('CONNECTION_TIMEOUT', '30'))
# New variable added (different from branch 1)
HEALTH_CHECK_INTERVAL = int(os.environ.get('HEALTH_CHECK_INTERVAL', '10'))

