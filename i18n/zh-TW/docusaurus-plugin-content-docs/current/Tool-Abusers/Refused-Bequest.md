---
sidebar_position: 3
title: 拒絕遺贈
---

# 拒絕遺贈

繼承很強大，但它經常被誤用。「拒絕遺贈」發生在子類別從父類別繼承，但實際上不想要或不使用它繼承的功能時。這就像一個孩子拒絕父母的遺產。

技術上，程式碼可以編譯。但概念上，這是錯誤的。如果一個 `Dog` 類別從 `Chair` 繼承只是為了重用 `getLegCount()` 方法，但對 `sit()` 拋出異常，那就是拒絕遺贈。這通常暗示層級結構是錯誤的。

## 氣味的跡象

- 子類別對繼承的方法拋出「不支援」異常。
- 子類別讓繼承的方法保持空白。
- 子類別的客戶端程式碼必須知道*不要*呼叫某些父類別方法。

## 氣味的原因

**重用優先於正確性**：你想重用父類別中的一些程式碼，所以你擴展了它，即使「是一個」關係（里氏替換原則）不成立。

## 重構配方

- 下移方法 / 欄位
- 用委派替換繼承

### 下移方法 / 欄位

如果父類別有只有*某些*子類別使用的邏輯，也許那個邏輯屬於那些特定的子類別，而不是父類別。

**之前：**
```java
class Animal {
    void fly() { ... } // 狗不會飛！
    void bark() { ... }
}

class Dog extends Animal {
    // 繼承了 fly() 這很奇怪
}
```

**之後：**
```java
class Animal {
    void bark() { ... }
}

class Bird extends Animal {
    void fly() { ... } // 下移到它屬於的地方
}

class Dog extends Animal {
    // 不再拒絕 'fly'
}
```

### 用委派替換繼承

如果你只需要使用一個類別的*一個*方法，不要繼承它。只要把那個類別的實例放在你的類別裡面並呼叫它。

**之前：**
```java
class MyList extends ArrayList {
    // 我只想用 'add' 和 'size'，但我繼承了 100 個其他方法！
}
```

**之後：**
```java
class MyList {
    private List list = new ArrayList(); // 委派

    public void add(Object o) {
        list.add(o);
    }
}
```

## 參考資料

- [Refactoring Guru - Refused Bequest](https://refactoring.guru/smells/refused-bequest)
- [C2 Wiki - Refused Bequest](https://wiki.c2.com/?RefusedBequest)
