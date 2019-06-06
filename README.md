[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">community-numbers</h1>

> Microservice to cache and expose community numbers for use throughout [oceanprotocol.com](https://oceanprotocol.com).

[![Build Status](https://travis-ci.com/oceanprotocol/community-numbers.svg?branch=master)](https://travis-ci.com/oceanprotocol/community-numbers)
[![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol)
[![Greenkeeper badge](https://badges.greenkeeper.io/oceanprotocol/community-numbers.svg)](https://greenkeeper.io/)
<img src="http://forthebadge.com/images/badges/powered-by-electricity.svg" height="20"/>
<img src="http://forthebadge.com/images/badges/as-seen-on-tv.svg" height="20"/>
<img src="http://forthebadge.com/images/badges/uses-badges.svg" height="20"/>

## API

Endpoint: [`https://oceanprotocol-community.now.sh`](https://oceanprotocol-community.now.sh)

### GET /

**200**: Returns a list of network numbers as follows:

```json
{
    "github": {
        "stars": 1000,
        "repos": 1000
    },
    "medium": {
        "followers": 1000
    },
    "bounties": {
        "gitcoin": 1000,
        "bountiesNetwork": 1000,
        "total": 1000
    },
    "twitter": {
        "followers": 1000
    }
}
```

## Development

Install dependencies:

```bash
npm install -g now
npm install
```

And run the server in dev mode:

```bash
npm start
```

## Test

Run the tests:

```bash
npm test
```

## Deployment

Deploy to [now](https://zeit.co/now), make sure to switch to Ocean Protocol org before deploying:

```bash
# first run
now login
now switch

# deploy
now
# switch alias to new deployment
now alias
```

## Authors

- Matthias Kretschmann ([@kremalicious](https://github.com/kremalicious)) - [Ocean Protocol](https://oceanprotocol.com)
