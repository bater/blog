---
layout: post
title: Top 10 Essential Ruby Interview Questions
date: 2018-2-3 00:00:00 +1100
categories: ruby
comments: true
---
I look through all of ruby on rails interview questions on the internet, and find the top 10 most common questions with answers. If now you only have 30 minutes before your interview, this is just for you, good luck!

1. [What is class?](#what-is-class)
1. [How does a Class differ from Module?](#how-does-a-class-differ-from-module)
1. [Name the three levels of access control for Ruby methods.](#name-the-three-levels-of-access-control-for-ruby-methods)
1. [What's difference between symbol and string?](#whats-difference-between-symbol-and-string)
1. [What's difference between include and extend?](#whats-difference-between-include-and-extend)
1. [What's difference between blocks, procs and lambdas?](#whats-difference-between-blocks-procs-and-lambdas)
1. [What does `self` mean?](#what-does-self-mean)
1. [What's difference between string `+=` and `concat`?](#whats-difference-between-string--and-concat)
1. [Explain this ruby idiom: `a ||= b`](#explain-this-ruby-idiom-a--b)
1. [Can you explain how Ruby looks up a method to invoke?](#can-you-explain-how-ruby-looks-up-a-method-to-invoke)

---
## What is class?
Classes hold data, have methods that interact with that data, and are used to instantiate objects.

## How does a Class differ from Module?
Modules are a way of grouping together methods, classes, and constants. For short, modules provide as a mechanism for multiple inheritance via mix-ins and cannot be instantiated like classes can.

More comparison:

Difference|Class|Module
---|:-:|:-:
instantiation| can be instantiated| can **NOT** be instantiated
superclass| Module| Object
inheritance| inherits behaviour and can be base for inheritance| No inheritance
inclusion| cannot be included| can be included in classes
extension| can not extend| can extend instance by using extend command

## Name the three levels of access control for Ruby methods
In Ruby, methods may either be public, protected, or private.
* Public methods can be called by anyone.
* Protected methods are only accessible within their defining class and its subclasses.
* Private methods can only be accessed and viewed within their defining class.

But you can use `:send` to call private method outside of class:
```rb
class MyClass
  private
  def some_class
    p "foo"
  end
end
```
```
> MyClass.new.some_class
=> MethodNotFound Error
> MyClass.new.send(:some_class)
"foo"
```
Not really so private, hmm.

## What's difference between symbol and string?
String is mutable but a Symbol is immutable. This means that using symbols can potentially save a good bit of memory depending on the application. It is also faster to compare symbols for equality since they are the same object, comparing identical strings is much slower since the string values need to be compared instead of just the object ids.

```
> :test.object_id
=> 81234
> :test.object_id
=> 81234
> :test.object_id
=> 81234 # same object
```

```
> "test".object_id
=> 82312
> "test".object_id
=> 87631
> "test".object_id
=> 86232 # different object
```

## What's difference between include and extend?
* `extend` mixes in specified module methods as class methods in the target class.
* `include` mixes in specified module methods as instance methods in the target class.

Let's see some example code:

```rb
module Printable
  def self.class_method_x
    p 'class_method_x'
  end

  def instance_method_y
    p 'instance_method_y'
  end
end
```

```rb
class ExtendDocument
  extend Printable
end
```

```rb
class IncludeDocument
  include Printable
end
```

Class method inside module never works:
```
ExtendDocument.class_method_x
# => NoMethodError: undefined method `class_method_x' for ExtendDocument:Class
ExtendDocument.new.class_method_x
# => NoMethodError: undefined method `class_method_x' for #<ExtendDocument:0x007fe9e308ac08>
IncludeDocument.class_method_x
# => NoMethodError: undefined method `class_method_x' for IncludeDocument:Class
IncludeDocument.new.class_method_x
# => NoMethodError: undefined method `class_method_x' for #<IncludeDocument:0x007fe9e3056480>
```
Instance method inside module become class method when `extend`:
```
ExtendDocument.instance_method_y
# => "instance_method_y"
ExtendDocument.new.instance_method_y
# => NoMethodError: undefined method `instance_method_y' for #<ExtendDocument:0x007fe9e3080370>
```
Instance method inside module become instance method when `include`:
```
IncludeDocument.instance_method_y
# => NoMethodError: undefined method `instance_method_y' for IncludeDocument:Class
IncludeDocument.new.instance_method_y
# => "instance_method_y"
```

## What's difference between blocks, procs and lambdas?
Block, Proc & Lambda are the three different ways of grouping the code.

Procs are objects, blocks are not. At most one block can appear in an argument list. In contrast, you can pass multiple procs to methods.

Lambdas and Procs are both Proc objects, but Lambdas check the number of arguments, while procs do not. Last thing is that Lambdas and procs treat the ‘return’ keyword differently.

```rb
def lambda_test
  lam = lambda { return }
  lam.call
  puts "Hello world"
end

lambda_test # calling lambda_test prints 'Hello World'
```

```rb
def proc_test
  proc = Proc.new { return }
  proc.call
  puts "Hello world"
end

proc_test # calling proc_test prints nothing
```
### Summary Differences:

#### Block
* Is in between the curly braces and in between do and end.
* No issue with number of arguments.
* Blocks are basically a proc without a name

#### Proc
* Similar behaviour as Block
* Can be stored in a variable and move around.
* No issue with number of arguments.
* Return within the proc would exit the method from where it is called.

#### Lambda
* Same as Proc, but closer to a method.
* Strict regarding the arguments it gets and it needs.
* Return within a lambda would exit it from the lambda and the method would continue executing.

## What does `self` mean?
`self` always refers to the current object. But this question is more difficult than it seems because Classes are also objects in ruby.
* at the class level, self is current class.
* at the instance level, self is the instance in context.

## What's difference between string `+=` and `concat`?
The `+=` operator re-initializes the variable with a new value, so `a += b` is equivalent to `a = a + b`. But `concat` effect on the same object. Let's see some example:
```
> x = "foo"
=> "foo"
> x.object_id
=> 70167981457960
> x.concat " bar"
"foo bar"
> x.object_id
=> 70167981457960  # same object id

> x += " la"
=> "foo bar la"
> x.object_id
=> 70230261894300  # new object
```

## Explain this ruby idiom: `a ||= b`
It means `a` equal to `b` when `a` is nil or false, otherwise `a` remains unchanged.

```rb
a = 1
b = 2
a ||= b #=> a = 1
```

```rb
a = nil
b = 2
a ||= b #=> a = 2
```

```rb
a = false
b = 2
a ||= b #=> a = 2
```

## Can you explain how Ruby looks up a method to invoke?
The first place that Ruby looks for a method is in the object’s metaclass or eigenclass—the class that contains methods directly defined on the object.

If the method cannot be found in an object’s metaclass, Ruby will then search for the method in the ancestors of an object’s class. The list of ancestors for any class starts with the class of the object itself, and climbs parent classes until it reaches the Object, Kernel, and BasicObject classes at the top of the Ruby class hierarchy.

If Ruby cannot find the method, it will internally send another method aptly called “method_missing?” to the object class. Ruby will repeat another search for this method, and will at least find it in the object class, provided the programmer did not see fit to define the “method_missing?” class earlier in the ancestry of the object.

---
# Refference

* [How We Interview Ruby on Rails Developers](https://rubyroidlabs.com/blog/2016/12/how-we-interview-ruby/)
* [How to Interview Your Ruby on Rails Developer](https://rubygarage.org/blog/how-to-interview-your-ruby-on-rails-developer)
* [21 Essential Ruby Interview Questions](https://www.toptal.com/ruby/interview-questions)
* [15 Questions to Ask During a Ruby Interview](https://gist.github.com/ryansobol/5252653)
* [Difference between a class and a module](https://stackoverflow.com/a/9778021/4426280)
* [What Is the Difference Between a Block, a Proc, and a Lambda in Ruby?](http://awaxman11.github.io/blog/2013/08/05/what-is-the-difference-between-a-block/)
* [Lambda vs Proc Vs Blocks](https://blog.redpanthers.co/lambda-vs-proc-vs-blocks/)
* [What's the difference between a string and a symbol in Ruby?](https://stackoverflow.com/a/255099/4426280)
* [Ruby on Rails developer interview questions](https://www.gitbook.com/book/unayung/ruby-on-rails-developer-interview-questions/details)
* [Top 53 Ruby on Rails Interview Questions & Answers](https://career.guru99.com/top-34-ruby-on-rail-interview-questions/)
* [10 Ruby interview questions and answers](https://www.upwork.com/i/interview-questions/ruby/)
* [Include vs Extend in Ruby](https://devblast.com/b/include-vs-extend-ruby)