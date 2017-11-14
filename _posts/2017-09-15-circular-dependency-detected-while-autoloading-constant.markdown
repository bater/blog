---
layout: post
title:  "Circular dependency detected while autoloading constant"
date:   2017-09-15 00:00:00 +1100
categories: ruby bug-log
comments: true
---
In my case, my code likes like:

    #models/user.rb
    class User < ApplicationRecord
      include User::AuditLog
    end

and

    #model/concern/user/audit_log.rb
    module User::AuditLog
      extend ActiveSupport::Concern
    end

It works fine in development environment, but in production it got error as title. When I change to this it works fine for me. Rename the folder name in concern if it has the same name with models.

    #models/user.rb
    class User < ApplicationRecord
      include Users::AuditLog
    end

and

    #model/concern/users/audit_log.rb
    module Users::AuditLog
      extend ActiveSupport::Concern
    end


[link here](https://stackoverflow.com/a/46210833/4426280)