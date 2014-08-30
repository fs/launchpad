set :js_dir,       'assets/javascripts'
set :css_dir,      'assets/stylesheets'
set :images_dir,   'assets/images'
set :partials_dir, 'partials'

configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
  activate :relative_assets

  # Only Including Tracking Code in Builds
  activate :google_analytics do |ga|
    ga.tracking_id = 'UA-XXXXXXX-X'
  end
end

activate :deploy do |deploy|
  deploy.method = :git
end

# Silence I18n warning, http://stackoverflow.com/a/20381730
I18n.config.enforce_available_locales = false
