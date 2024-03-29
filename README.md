[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">community-numbers</h1>

> Microservice to cache and expose community numbers for use throughout [oceanprotocol.com](https://oceanprotocol.com).

[![Build Status](https://travis-ci.com/oceanprotocol/community-numbers.svg?branch=main)](https://travis-ci.com/oceanprotocol/community-numbers)
[![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol)
<img src="http://forthebadge.com/images/badges/powered-by-electricity.svg" height="20"/>
<img src="http://forthebadge.com/images/badges/as-seen-on-tv.svg" height="20"/>
<img src="http://forthebadge.com/images/badges/uses-badges.svg" height="20"/>

## API

Endpoint: [`https://oceanprotocol-community.now.sh`](https://oceanprotocol-community.now.sh)

### `GET /`

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
    "open": 1000,
    "total": 1000
  },
  "twitter": {
    "followers": 1000
  },
  "telegram": {
    "community": 1000,
    "news": 1000
  },
  "discord": {
    "members": 1000
  }
}
```

## Development

Install dependencies:

```bash
npm install -g vercel
npm install
```

And run the server in dev mode:

```bash
npm start
```

Then either open up `http://localhost:3000` in a browser or do in another Terminal:

```
curl http://localhost:3000
```

## Test

Run the tests:

```bash
npm test
```

## Deployment

Every branch is automatically deployed to [Vercel](https://vercel.com) with their GitHub integration. A link to a deployment will appear under each Pull Request.

The latest deployment of the `main` branch is automatically aliased to `oceanprotocol-community.now.sh`.

### Manual Deployment

If needed, app can be deployed manually. Make sure to switch to Ocean Protocol org before deploying:

```bash
# first run
vercel login
vercel switch

# deploy
vercel
# switch alias to new deployment
vercel alias
```

## License

```text
Copyright 2022 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
