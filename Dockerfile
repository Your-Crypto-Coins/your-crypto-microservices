FROM postgres:14.5

WORKDIR /

COPY ./db-docker/* /db-docker/