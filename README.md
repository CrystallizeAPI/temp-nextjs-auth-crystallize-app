# Crystallize Example for Next JS + Auth Crystallize App

This is a Crystallize App example for Next JS

## What does it do

The example app:

- checks the signature if the SIGNING SECRET is set in the environment variables.
- provide an example of running behing HTTPs with Caddy for local development

## Local development with HTTPs

Crystallize apps MUST run on top of HTTPS for security reasons.

To work locally, the application must there be behind HTTPs, you can use `ngrok` (or similar) to proxy it.

The simplest is to create a `.local` domain name that can be used with Caddy

### Using /etc/hosts

```
127.0.0.1 nextjsauth.crystallize.app.local
```

### Using dnsmasq

```bash
brew install dnsmasq
echo "address=/.crystallize.app.local/127.0.0.1" >> /opt/homebrew/etc/dnsmasq.conf
sudo mkdir -p /etc/resolver && echo "nameserver 127.0.0.1" > /etc/resolver/local
sudo brew services restart dnsmasq
```

### Running the project

```bash
make serve
```
