# Day 2. Code Smells > Bloaters 臃腫怪

Created: July 23, 2023 7:30 AM
Tags: bloaters

The first category of code smells we will discuss is called Bloaters. It is one of the most common signs of code smells that can be found in any code branch. Bloaters exactly go against the top secret of Clean Code, mentioned in Sandi Metz's other talk "All the Little Things" at RailsConf 2014.

> Make Smaller Things. - Sandi Metz, 2014
> 

When people ask Sandi what the best way to write better object-oriented code is, one of the best pieces of advice is to **make smaller things**. Make smaller classes, make smaller methods, and let them know as little about each other as possible.

Size can be evil, and this limitation comes from the human brain. Code is not only meant for computers to execute but also for developers to read. The amount of information and concepts humans can process at once is strictly limited. Unlike servers that can run multiple threads, developers cannot do the same mentally. That's why it is recommended to follow guidelines for the length of each file and line of code.

Bloaters make software difficult to work with. They represent pieces of code that have grown so large that they become hard to read and maintain.

Typically, bloaters don’t happen right away but accumulate long-term as your code base grows. This is usually a slow process. Code starts out small and well-isolated, but grows excessively over a long time as new functionality is added and code is made more general marking it difficult to work with. Particularly when no developer has made an effort to point out the potential issue.

Dealing with these code smells, like most refactoring, is usually best done one small step at a time.

The good news is that if you can identify any of the smells below in your components you can make your code cleaner with the same kind of gradual changes that caused the problems in the first place.

Let's take a look at some common code smells in the Bloaters catalog:

### Long Method

Generally, any method longer than ten lines are considered too long. It may be responsible for more tasks than it should be.

### Large Class

A class contains too many fields, methods, and lines of code.

### Primitive Obsession

Primitive Obsession is the excessive use of basic data types to represent concepts or entities in code.

### Long Parameter List

When a function or method has a large number of parameters.

### Data Clumps

Groups of variables that always appear together should be turned into their own object.

### Reference

All the Little Things, Sandi Metz [https://youtu.be/8bZh5LMaSmE](https://youtu.be/8bZh5LMaSmE)

[https://medium.com/@joshsaintjacque/reacting-to-code-smells-bloaters-3e452d0c01b](https://medium.com/@joshsaintjacque/reacting-to-code-smells-bloaters-3e452d0c01b)

[https://medium.com/testvagrant/refactoring-101-code-smells-bloaters-f80984859340](https://medium.com/testvagrant/refactoring-101-code-smells-bloaters-f80984859340)

[https://bytelanguage.com/2018/02/19/code-smells-bloaters-long-methods-long-class/](https://bytelanguage.com/2018/02/19/code-smells-bloaters-long-methods-long-class/)

[https://www.jobsity.com/blog/how-to-identify-code-smells](https://www.jobsity.com/blog/how-to-identify-code-smells)

[https://code-smells.com/](https://code-smells.com/)