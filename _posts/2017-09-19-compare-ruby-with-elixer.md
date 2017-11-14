---
layout: post
title:  Compare Ruby with Elixir
date:   2017-09-19 00:00:00 +1100
categories: elixir
comments: true
---
Elixir is much similar to Ruby, so I try to list some difference between this two.

## **Atoms**, synonymous with Symbols
Almost the same in Elixir but different name.

## unique arithmetic method
integer division `div`or the division remainder`rem` method.

```ex
iex> div(6, 3)
2
iex> rem(10, 3)
1
```

## String concat operator
Not like use plus mark in ruby or js, here we have `<>`
```ex
iex> "a" <> "b"
"ab"
```

## List is array in ruby
Add new object to list.
```ex
iex> list = ["I", 0, true]
["I", 0, true]
iex> [:new] ++ list
[:new, "I", 0, true]
```
List has head and tail method
```ex
iex> hd list
"I"
iex> tl list
[0, true]
```
## Tuples
Ruby didn't have this type of data, it's just like array.
```ex
{1, :anything, false}
```

## Keyword List
Obviously, it's list with keyword, but not a hash.
```ex
iex> a = [key: "world", foo: "bar"]
[key: "world", foo: "bar"]
iex> a[:foo]
"bar"
```

## Map is hash
A difference here is Map start percentage.
```ex
iex> map = %{foo: "bar", aaa: "bbb", "sting":  12}
%{foo: "bar", aaa: "bbb", string: 12}
iex> map[:aaa]
"bbb"
iex> map.foo
"bar"
```

[Source](https://elixirschool.com/en/)
