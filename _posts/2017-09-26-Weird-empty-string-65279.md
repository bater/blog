---
layout: post
title:  To see is not always to believe. Weird empty string 65279
date:   2017-09-26 00:00:00 +1100
tags: ruby
comments: true
---
One day I got a situation like this:
```rb
> a
""
> a == ""
false
> a.length
1
> a.empty?
false
```
WTF? So I try to find out what the empty string really is.
```rb
> a.ord
65279
> "".ord
*** ArgumentError Exception: empty string
```
Hmmm, so it's not a real empty string, it's a weird string looks like empty.

And if you want get string from code, you can use `chr` method for integer:
```rb
> 72.chr
"H"
> 65279.chr
""
```
Remove it from string:
```rb
> a = "Hell#{65279.chr}o world"
"Hello world"
> a == "Hello world"
false
> a.gsub!(65279.chr, "")
"Hello world"
> a == "Hello world"
true
```
Here is a string method to check every point of code:
```rb
> "Hello world".codepoints
[72, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]
> "Hello world".codepoints
[72, 101, 108, 65279, 108, 111, 32, 65279, 119, 111, 114, 65279, 108, 100]
```

Last thing is that if you want to try it in irb, you will get error message below:
```rb
> 65279.chr
RangeError: 65279 out of char range
        from (irb):1:in `chr'
        from (irb):1
        from /Users/Chenbater/.rvm/rubies/ruby-2.3.1/bin/irb:11:in `<main>'
```