# GitHub Pages 依赖管理文件
source "https://rubygems.org"

# GitHub Pages 兼容的 Jekyll 版本
gem "github-pages", group: :jekyll_plugins

# 插件
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"

# 本地开发
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows 不支持
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# 性能优化
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# 锁定版本
gem "webrick", "~> 1.7"


