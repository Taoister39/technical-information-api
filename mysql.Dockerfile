FROM mysql:8
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes
COPY technical-information.sql /docker-entrypoint-initdb.d/
# RUN mysqld
