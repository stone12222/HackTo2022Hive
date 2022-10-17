import http.server
import socketserver
# makes sure the user only access the page that we want the user to
class RequestsHandler(http.server.SimpleHTTPRequestHandler):
  """
  Handles http requests
  """
  def do_GET(self):
    if self.path == '/':
      self.path = 'index.html'
    return http.server.SimpleHTTPRequestHandler.do_GET(self)
# Create object of above class
handler_object = RequestsHandler
PORT = 8211
my_server = socketserver.TCPServer(("", PORT), handler_object)
# Start the server
print("Server started at localhost:" + str(PORT))
my_server.serve_forever()