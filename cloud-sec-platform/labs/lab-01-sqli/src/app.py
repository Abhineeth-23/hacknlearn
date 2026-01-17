from flask import Flask, request, render_template_string
import sqlite3

app = Flask(__name__)

# Initialize database
def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY, username TEXT, password TEXT)''')
    c.execute("INSERT OR IGNORE INTO users (username, password) VALUES ('admin', 'secret')")
    c.execute("INSERT OR IGNORE INTO users (username, password) VALUES ('user', 'password')")
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def index():
    return render_template_string('''
    <h1>Login</h1>
    <form method="POST" action="/login">
        Username: <input type="text" name="username"><br>
        Password: <input type="password" name="password"><br>
        <input type="submit" value="Login">
    </form>
    ''')

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    # VULNERABLE TO SQL INJECTION
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    c.execute(query)
    user = c.fetchone()
    conn.close()

    if user:
        return f"Welcome {user[1]}!"
    else:
        return "Invalid credentials"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)