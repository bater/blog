---
layout: post
title:  Seed file is earlier than model
date:   2017-09-22 00:00:00 +1100
categories: ruby
comments: true
---
I wrote some default data in seed file and have a task called `rebuild`

```rb
# lib/tasks/start.rake
desc 'rebuid db'
task :rebuild => ["db:drop", "db:create", "db:migrate", "db:seed"]
```

And my seeds file

```rb
# db/seeds.rb
UserType.create(title: "customer")
```

When I move this to model as a constant.

```rb
class UserType < ApplicationRecord
  CUSTOMER = find_or_create_by(title: "customer")
end
```

I can't find `UserType::CUSTOMER` in seed file because seed file are running before model. So we can find `UserType::CUSTOMER` in rails console but not in seed file.

Btw, it's better to use enum for type.