---
layout: post
title: How to stub method by Allow in Rspec
date: 2018-7-15 00:00:00 +0900
tags: [ruby, rspec]
comments: true
---
Last Friday I solved a bug relate as title. Someone mistakenly use "let" as method stub, and the method should return a value base on current month. So last month the spec runs perfectly because current month are just what we expect, but after one month it failed.

The mehtod and spec structure looks like below:
```rb
# method
class Time
  def self.current_month
    Time.now.strftime("%Y-%m")
  end
end
# spec
let(:current_month) { "2018-06" }
it "returns what we expect" do
  expect(Time.current_month).to eq("2018-06")
end
```
It works fine when `Time.now.strftime("%Y-%m")` reture `"2018-06"`, but in fact, `current_month` are executed by spec. As what I said before, `let` is not really a method stub. In this case, we should use `allow` instead.

```rb
# Best practice
allow(Time).to receive(:current_month).and_return("2018-06")
# It works, but not recommend
allow(Time).to receive(:current_month) {"2018-06"}
Time.stub(:current_month).and_return("2018-06")
Time.stub(:current_month) {"2018-06"}
```
So the spec will look like:
```rb
it "returns what we expect" do
  allow(Time).to receive(:current_month).and_return("2018-06")
  expect(Time.current_month).to eq("2018-06")
end
```

### Summary:
* use the #allow instead of #stub
* use #and_return instead of block, unless you need to return dynamically calculated value.

### Reference:
[Allow vs Stub, what's the difference?](https://stackoverflow.com/questions/18180389/allow-vs-stub-whats-the-difference)