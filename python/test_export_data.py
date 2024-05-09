import os
import pytest
from unittest.mock import patch, MagicMock, mock_open
import json
import script as export_data

@pytest.fixture
def mock_env():
    """Fixture to set up environment variables."""
    os.environ['DB_HOST'] = 'localhost'
    os.environ['DB_DATABASE'] = 'template_db'
    os.environ['DB_USER'] = 'user'
    os.environ['DB_PASSWORD'] = 'password'

@pytest.fixture
def mock_db_connection():
    """Mock the database connection and cursor."""
    mock_conn = MagicMock()
    mock_cursor = MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    return mock_conn, mock_cursor

def test_connect_to_db(mock_env):
    """Test database connection with environment variables."""
    with patch('mysql.connector.connect', MagicMock()) as mock_connect:
        export_data.connect_to_db()
        mock_connect.assert_called_once_with(host='localhost', database='template_db', user='user', password='password')

