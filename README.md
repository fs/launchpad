# Source code for launchpad.flatstack.com

## Prepare development environment

```bash
  git clone git@github.com:fs/launchpad.git sitename
  cd sitename
  bin/bootstrap
```
## Development process

1. Start server with `bin/server`
2. Make changes in the `source` folder
3. Checkout results in the browser on `http://localhost:4567`

## Deploy

Run `bin/deploy`

Make sure you have specified correct `source/CNAME`
