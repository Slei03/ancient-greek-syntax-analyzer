## Ancient Greek Syntax Analyzer

This repo is a migration of the Ancient Greek Syntax Analyzer at https://huggingface.co/spaces/Jacobo/syntax to Flask+React.

To run locally:
1. Download/Clone repository
2. Open repo folder in terminal
3. Start flask server
    1. Navigate to `service` folder
    2. Run `pip install -r requirements.txt` to install needed libraries
    3. Set the 'FLASK_APP' enviornment variable:
        - For Linux or Mac:
            `export FLASK_APP=app.py`
        - For Windows:
            `setx FLASK_APP "app.py"`
    4. Run Flask App with `flask run`
        - A web address something of the form 'http://127.0.0.1:5000' should appear in the terminal in a bit. (The address may differ for you.) Copy and paste the address into a browser.
4. Run react web app
    1. In a new terminal, navigate to `frontend` folder
        - Note: The previous terminal should still have the flask app running
    2. If web address that appears in step 3.4 differs from 'http://127.0.0.1:5000', open `package.json` and set `"proxy"` to be the web address that appears in step 3.4
        - Note: localhost is the same as 127.0.0.1
    3. Run `npm install` to install needed dependencies
    4. Run `npm start` to start react app.
