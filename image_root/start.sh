#!/bin/bash

# if [ ! -f app/openssl.cnf ]
# then
#   echo "Must supply a configuration file! Rerun docker run and mount the configuration as a volume"
#   echo "e.g. -v path/to/config/file:/app/openssl.cnf"
#   exit 1
# fi

# Init RSA generation
cd app 
openssl genrsa -out key.pem 2048

# Init CA cert
openssl req -x509 -new -config openssl.cnf -key key.pem -out ca.crt

echo "01" > ca.srl

# Install NodeJS and dependencies
npm install && nodejs app.js
exec /bin/bash
