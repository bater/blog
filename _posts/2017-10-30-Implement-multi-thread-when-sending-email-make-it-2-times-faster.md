---
layout: post
title:  Implement multi-thread when sending email make it 2 times faster
date:   2017-10-30 00:10:00 +1100
categories: ruby
comments: true
---
It's common situation to send massive email at once, so the efficiency is the main issue. I found out that multi-thread is a good idea to improve email efficiency.

According to [Increasing Throughput with Amazon SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/throughput-problems.html):
> **Consider using multiple threads** —When an application uses a single thread, the application code calls the Amazon SES API and then synchronously waits for an API response. Sending emails is typically an I/O-bound operation, and doing the work from multiple threads provides better throughput. You can send concurrently using as many threads of execution as you wish.

Here is some example code:
```rb
class UserMailer < ApplicationMailer
  def test_mail email
    mail to: email
  end
end
```
```rb
class TestTool
  def self.mail_speed
    start = Time.now.to_i
    pool = []
    User.find_in_batches(batch_size: 30) do |batch|
      pool << Thread.new do
        batch.each do |user|
          UserMailer.test_mail("success@simulator.amazonses.com").deliver!
        end
      end
    end
    pool.each(&:join)
    Time.now.to_i - start
  end
end
```
For the collection, you can consider using like `100.times do ... end`, but you might need the user instance for the email view, at least for the user first name. So before you run the test, make sure you have more than 100 user inside you local database, if not, you can run `FactoryGirl.create_list(:user, 100)` after you install and set up the gem [factory_girl_rails](https://github.com/thoughtbot/factory_bot_rails).

Notice that my mail address `success@simulator.amazonses.com`. It's the best choice for email sending if you are using aws as your email server (include SMTP and SES sdk), see [Testing Amazon SES Email Sending](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/mailbox-simulator.html), it will not  affecting your sending quota or your bounce and complaint metrics.

Then you can test your mailer speed by running:
```rb
> TestTool.mail_speed
# Here will show some logs like below
  Rendering user_mailer/test_mail.html.erb within layouts/mailer
  Rendered user_mailer/test_mail.html.erb within layouts/mailer (0.5ms)
  Rendering user_mailer/test_mail.text.erb within layouts/mailer
  Rendered user_mailer/test_mail.text.erb within layouts/mailer (0.4ms)
UserMailer#test_mail: processed outbound mail in 324.8ms
# How many second it cost
60
```
Now you can modify the batch size to find the best thread setting for you. In my case:

size | second
---: | ---:
100 | 130
50 | 70
33 | 66
**30** | **60**
25 | 67

So batch size 30 is my best solution, but it might different in your environment.