FROM ubuntu:14.04

MAINTAINER Chris Guthrie

RUN apt-get update && apt-get install -y nodejs npm openssl && apt-get clean

ADD image_root /
