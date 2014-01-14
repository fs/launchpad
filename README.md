# Source code for school.flatstack.com

## Prepare development environment

```bash
  git clone git@github.com:fs/school.git
  script/bootstrap
```
## Development process

1. Start server with `bin/middleman server`
2. Make changes in the `source` folder
3. Checkout results in the browser on `http://localhost:4567`

### Couches

All data for couches stored in the `data/couches.yml` file.

Please use

    <%= couch('oleg') %>

if you need to render html part with it's image, name, etc.

    <div class="span3">
      <img src="img/oleg.png" alt="Олег Курносов - Тренер из FlatSoft">
      <em>Олег Курносов</em><br>Тренер из FlatSoft
    </div>

## Deploy

Run `script/deploy`
