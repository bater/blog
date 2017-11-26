---
layout: post
title:  Ruby Iterator and which one is faster
date:   2017-11-27 00:10:00 +1100
categories: ruby
comments: true
---
Sometimes I notice that in somewhere, loop wrote like this just like what we do in Javascript or another language:

## while and until
```rb
i = 0
until i > 10
  puts i
  i += 1
end
# or
while i < 0 do
  puts i
  i += 1
end
```

It works fine but I thought we don't need a variable `i` to decide when to stop. There are many different way to do the same thing. (Anyway, in the end of article, I changed my mind.)

## for
```rb
for i in 0..10
  puts i
end
```
## each
```rb
(0..10).each do |i|
  puts i
end
```
## times
```rb
10.times do |i|
  puts i
end
```
## downto and upto
```rb
10.downto(0) do |i|
  puts i
end
# or
1.upto(10) do |i|
  puts i
end
```
## step
```rb
# Increment
0.step(10, 2) do |v|
    puts v
end
# Decrement
10.step(1, -1) do |i|
  puts i
end
```

Now the question is , which one is fastest? So I use benchmark as below:
```
                                     user     system      total        real
until                           12.500000   0.030000  12.530000 ( 12.670690)
while                           12.630000   0.020000  12.650000 ( 12.798242)
for                             29.200000   0.060000  29.260000 ( 29.560039)
each                            29.830000   0.080000  29.910000 ( 30.409305)
times                           30.600000   0.090000  30.690000 ( 31.240563)
downto                          30.250000   0.080000  30.330000 ( 30.812961)
upto                            28.770000   0.060000  28.830000 ( 29.204389)
step                            28.090000   0.050000  28.140000 ( 28.464556)
```
The result is surprised me that `until` and `while` are 2 times faster than the rest of iterator, and it hard to rank because each time when I run the benchmark were different.

Here is my benchmark code, you can try and prove it.
```rb
require "benchmark"

TIMES = 100_000
MAX = 1_000

Benchmark.bm(30) do |b|

  b.report "until" do
    TIMES.times do
      i = 0
      until i > MAX
        i += 1
      end
    end
  end

  b.report "while" do
    TIMES.times do
      i = 0
      while i < MAX
        i += 1
      end
    end
  end

  b.report "for" do
    TIMES.times do
      for i in 0..MAX
      end
    end
  end

  b.report "each" do
    TIMES.times do
      (0..MAX).each do
      end
    end
  end

  b.report "times" do
    TIMES.times do
      MAX.times do
      end
    end
  end

  b.report "downto" do
    TIMES.times do
      MAX.downto(0) do
      end
    end
  end

  b.report "upto" do
    TIMES.times do
      0.upto(MAX) do
      end
    end
  end

  b.report "step" do
    TIMES.times do
      MAX.step(1, -1) do |i|
      end
    end
  end
end
```

Reference link:
[Ruby benchmark: Array#each vs for x in array](https://gist.github.com/jodosha/229951)