Title: EZ CA: the easy, RESTful Certificate Authority
Author: Chris Guthrie

=============================================================

EZCA exposes a REST interface to a certificate authority (CA) with a minimal set of endpoints whose purpose is to sign certificate signing requests (CSRs) 
for clients including lower level CAs. EZCA may run as a root CA or as a sub-CA. 

To create a root CA, the syntax to start the container is 
docker run -dp :80 -e "ROOT=true" -v /path/to/config/file:/app/openssl.cnf ezca /start.sh

otherwise, the command to run a container is 
docker run -dp :80 -v /path/to/config/file:/app/openssl.cnf ezca /start.sh

A config file is a correctly formatted openssl.cnf file. A boilerplate file is provided.

Note: If you would like to manually assign a port for ther service to run, change :80 to [desired_port]:80

General Usage: 
Clients create a POST request to the /sign endpoint with a CSR on the given port. EZCA will
validate the request, sign the certificate, and send the certificate as a crt file back to the user over HTTP.
If the EZCA container is a root CA, it will only sign CSRs for other CAs. This is so certificate revocation lists
may function properly. The payload for a POST request is a file.

The public certificate for the CA can be retrieved by a GET request to /

On failure, an HTTP 400 status code will be sent back detailing the error.

------------------------------------------------------------

API endpoints:

------------------------------------------------------------

POST /sign -- Sign a CSR

GET / -- retrieve the CA's public certificate

