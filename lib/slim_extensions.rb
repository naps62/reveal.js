def render(partial)
  Slim::Template.new("slim/#{partial}.slim", {}).render(self)
end
