# Aborting request from NGINX timeout

The point of this code is to test if a timeout thrown by nginx is propagated to node.js request and to see
if axios handle it correctly with the `AbortController`.

## Quick start

```
docker compose up --build
```

Then you can :

```
curl http://localhost/
```

There is 50% chance to have a timeout (nginx timeout is configured to `2500ms`), and you will see an NGINX `504 Timeout Error` with this error log :

```
nginx-test-nodeserver-1  | Request started, sleepTime: 5000 - Jesus McClure
nginx-test-nginx-1       | 2022/04/08 14:55:01 [error] 34#34: *1 upstream timed out (110: Connection timed out) while reading response header from upstream, client: 172.24.0.1, server: , request: "GET / HTTP/1.1", upstream: "http://172.24.0.2:4400/", host: "localhost"
nginx-test-nginx-1       | 172.24.0.1 - - [08/Apr/2022:14:55:01 +0000] "GET / HTTP/1.1" 504 569 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36" "-"
nginx-test-nodeserver-1  | Request abort catched - Jesus McClure canceled
```

Otherwise you will see a
response from the express serveur which look like this `Request OK - Mr. Gregg Walker` and the associated log :

```
nginx-test-nodeserver-1  | Request started, sleepTime: 1000 - Mr. Gregg Walker
nginx-test-nodeserver-1  | Request finished - Mr. Gregg Walker
nginx-test-nginx-1       | xxx.xx.x.x - - [08/Apr/2022:15:02:24 +0000] "GET / HTTP/1.1" 200 29 "-" "curl/7.77.0" "-"
```
