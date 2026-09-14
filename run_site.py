"""
Ember & Spice — Local Development Server
Serves the site at http://127.0.0.1:8000
"""

import os
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


def main():
    os.chdir(os.path.dirname(__file__))

    host = "127.0.0.1"
    port = 8000
    address = (host, port)

    with ThreadingHTTPServer(address, SimpleHTTPRequestHandler) as server:
        url = f"http://{host}:{port}"
        print(f"Ember & Spice running at {url}")

        webbrowser.open(url)
        server.serve_forever()


if __name__ == "__main__":
    main()
