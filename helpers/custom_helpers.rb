module CustomHelpers
  def coach(key, span = 3)
    coach = data.coaches[key]
    image, name, description = coach['image'], coach['name'], coach['description']

    alt = "#{name} - #{description}"

    '<span class="span%s">' % span +
      image_tag(image, alt: alt) +
      '<em>%s</em><br>%s' % [name, description] +
    '</span>'
  end
end