import sys
import unittest
from project import app

sys.path.append("/usr/src/app")  # Add the parent directory to the Python path


class TestApp(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()

    def test_index_route(self):
        rv = self.app.get('/')
        self.assertEqual(rv.status_code, 200)
        # self.assertIn(b'Accessing the index route.', rv.data)

    def test_receive_alert_route(self):
        # You can modify this test for your receive_alert route as needed
        data = {'key': 'value'}  # Replace with your request data if needed
        rv = self.app.post('/receive_alert', data=data)
        self.assertEqual(rv.status_code, 200)
        self.assertEqual(rv.data, b'Alert received!')

    def test_create_db_command(self):
        runner = app.test_cli_runner()
        result = runner.invoke(args=["create_db"])
        self.assertEqual(result.exit_code, 0)

    def test_seed_db_command(self):
        runner = app.test_cli_runner()
        result = runner.invoke(args=["seed_db"])
        self.assertEqual(result.exit_code, 0)

if __name__ == '__main__':
    unittest.main()