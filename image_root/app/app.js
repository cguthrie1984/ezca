"use strict";

var express = require("express");
var exec = require("child_process").exec;
var multer = require("multer");

var upload = multer({ "dest" : "/tmp/" });
var server = express();

function send_error( msg, res ){
  res.status(400).send(msg);
}

function is_valid_csr( file, validcb, invalidcb ){
}

server.get('/', function(req, res){
  res.sendFile(__dirname + '/ca.crt');
});

server.post( '/sign', upload.single('csr'), function(req, res, next){
  // Validate that object passed in is CSR
  // TODO: vulnerability with req.file.path?
  exec( 'openssl req -verify -in ' + req.file.path, function( err, stdout, stderr ){
    if( err ){
      send_error( "I/O error: " + err, res );
      return;
    }
    if( ! stderr.match( /verify OK/ ) ){
      send_error( "Invalid CSR", res );
      return;
    }
    // Now try signing it
    exec( 'openssl x509 -req -CA ca.crt -CAkey key.pem -in ' + req.file.path, function( err, stdout, stderr ){
      if( err ){
        send_error( "Signing error: " + err, res );
        return;
      }
      if( !stderr.match( /Signature ok/ ) ){
        send_error( "Could not sign certificate", res );
        return;
      }
      server.set('Content-Type', 'text/plain');
      res.send(stdout);
    })
  });
});

server.listen(80);
