#!/bin/sh

rand="$(openssl rand -hex 10)"
secret='iptZK2UF7MYI4RhMsmXYjEejsXk3_g'
duration='permanent'
scope='read'

#curl -X POST -A 'User agent' -d "grant_type=client_credentials" --user "codecademy-rclient:iptZK2UF7MYI4RhMsmXYjEejsXk3_g" https://www.reddit.com/api/v1/access_token

curl -X POST -d A 'User agent' 'grant_type=password&username=ollynov14@password=myrealpassword' --user 'jRje7BA55aycvA:myrealsecret' https://www.reddit.com/api/v1/access_token
