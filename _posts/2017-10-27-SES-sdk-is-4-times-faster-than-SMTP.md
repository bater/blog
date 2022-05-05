---
layout: post
title: Aws SES sdk is 4 times faster than SMTP endpoint for sending email
date: 2017-10-27 00:10:00 +1100
tags: ruby
comments: true
---
[Smtp](https://www.sitepoint.com/deliver-the-mail-with-amazon-ses-and-rails/) is probably most common way to send the email in ruby on rails project, but in some case it's not good enough for us.

According to [Increasing Throughput with Amazon SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/throughput-problems.html):
> Consider using the Amazon SES query API instead of the SMTP endpoint—Using the Amazon SES query API enables you to submit the email send request using a single network call, whereas interfacing with the SMTP endpoint involves an SMTP conversation which consists of multiple network requests (for example, EHLO, MAIL FROM, RCPT TO, DATA, QUIT). For more information about the Amazon SES query API, see Using the Amazon SES API to Send Email.


In my case, I tried [aws-sdk-rails](https://github.com/aws/aws-sdk-rails) and it just easy to use, we don't need to change a lot of code for it. First, install the gem.

```rb
  gem 'aws-sdk-rails'
```
`bundle install` it, and create a file call `config/initializers/ses.rb`, and put your aws key and secret inside the `config/application.yml`.

```rb
creds = Aws::Credentials.new(ENV["AWS_ACCESS_KEY_ID"], ENV["AWS_SECRET_ACCESS_KEY"])
Aws::Rails.add_action_mailer_delivery_method(:aws_sdk, credentials: creds, region: 'us-east-1')
```
In my personal experience, `us-east-1` is faster than `us-west-2`, maybe you can try different region, but I believe it depend on your location.

Last step, change your delivery_method from `:smtp` to `:aws_sdk`
```
config.action_mailer.delivery_method = :aws_sdk
```

That's it, now you send your email by aws sdk under the ActionMailer, you don't need to change your mailer method but it's 4 times faster. You should try.

BTW, notice that Credentials for Aws SES sdk and SMTP are different, so you might need to apply a new one or add more permission. For more information you can see [here](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/using-credentials.html).