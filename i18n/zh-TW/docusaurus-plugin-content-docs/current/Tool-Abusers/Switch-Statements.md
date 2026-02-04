---
sidebar_position: 2
title: Switch 語句
---

# Switch 語句

你可能在想，「switch 語句有什麼問題？這是語言的基本功能！」你說得對。單一的 switch 語句是可以的。但當你開始看到*相同的* switch 語句散布在你的程式碼庫中——對相同的型別代碼或列舉進行切換——你就有氣味了。

如果你添加一個新型別（例如，一個新的 `EmployeeType`），你必須記得找到並更新每一個那些 switch 語句。如果你錯過一個，你就得到一個 bug。這違反了開放/封閉原則：你應該能夠添加新型別而不需要修改現有程式碼。

> 「大多數時候當你看到 switch 語句時，你應該考慮多型。」—— Martin Fowler

## 氣味的跡象

- 你在多個地方看到相同的 `switch` 或 `if-else` 鏈。
- switch 基於型別代碼（例如，`if (type == "MANAGER")`）。
- 每當你添加新型別時，你必須修改現有程式碼。

## 氣味的原因

**程序式思維**：只是寫一列指令很容易。用物件思考（多型）需要預先多付出一點努力，但在靈活性方面會得到回報。

## 重構配方

- 用多型替換條件式（大招！）
- 用狀態/策略替換型別代碼
- 用明確方法替換參數

### 用多型替換條件式

目標是將每個特定型別的邏輯移到它自己的類別中。

**之前：**
```java
class Bird {
    int type;
    double getSpeed() {
        switch (type) {
            case EUROPEAN:
                return getBaseSpeed();
            case AFRICAN:
                return getBaseSpeed() - getLoadFactor();
            case NORWEGIAN_BLUE:
                return (isNailed) ? 0 : getBaseSpeed();
        }
        throw new RuntimeException("不應該到達這裡");
    }
}
```

**之後：**
```java
abstract class Bird {
    abstract double getSpeed();
}

class EuropeanBird extends Bird {
    double getSpeed() { return getBaseSpeed(); }
}

class AfricanBird extends Bird {
    double getSpeed() { return getBaseSpeed() - getLoadFactor(); }
}

class NorwegianBlueBird extends Bird {
    double getSpeed() { return (isNailed) ? 0 : getBaseSpeed(); }
}
```
現在，添加一隻新鳥只需要創建一個新類別。不需要觸碰任何現有程式碼。

### 用明確方法替換參數

如果一個方法對參數進行切換來決定要做什麼，就把它拆分成兩個方法。

**之前：**
```java
void setValue(String name, int value) {
    if (name.equals("height")) {
        this.height = value;
    }
    if (name.equals("width")) {
        this.width = value;
    }
}
```

**之後：**
```java
void setHeight(int value) { this.height = value; }
void setWidth(int value) { this.width = value; }
```

## 參考資料

- [Refactoring Guru - Switch Statements](https://refactoring.guru/smells/switch-statements)
- [Martin Fowler - Replace Conditional with Polymorphism](https://refactoring.com/catalog/replaceConditionalWithPolymorphism.html)
