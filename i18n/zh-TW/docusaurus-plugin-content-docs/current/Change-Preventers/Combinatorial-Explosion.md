---
sidebar_position: 5
title: 組合爆炸
---

# 組合爆炸

想像你正在開發一款賽車遊戲。你從一個 `Car` 類別開始。然後你決定支援 `Electric` 和 `Gas` 引擎。很簡單：`ElectricCar` 和 `GasCar`。但等等，你還需要支援 `Manual` 和 `Automatic` 變速箱。現在你有了 `ElectricManualCar`、`ElectricAutomaticCar`、`GasManualCar` 和 `GasAutomaticCar`。

然後你添加 `Convertible` 和 `Sedan` 車身類型。突然間，你的類別層級爆炸成數十個子類別，試圖涵蓋引擎、變速箱和車身類型的每種可能組合。這就是組合爆炸。當你使用繼承來處理應該獨立的組件變化時，就會發生這種情況。

## 氣味的跡象

- 你在層級中有大量的子類別。
- 添加一個新功能（如「混合動力引擎」）迫使你創建許多新的子類別（例如，`HybridManualCar`、`HybridAutomaticCar`）。
- 你發現這些子類別之間有重複的程式碼，因為 `ElectricManualCar` 和 `GasManualCar` 共享相同的手排變速箱邏輯。

## 氣味的原因

**過度使用繼承**：對所有東西使用繼承而不是組合。
**高複雜度**：變得無法導航類別樹。
**程式碼重複**：一個功能的邏輯散布在多個子類別中。

## 重構配方

- 用委派替換繼承（組合）
- 將裝飾移到裝飾器

### 用委派替換繼承

不要錯誤地使用繼承來共享程式碼，而是使用組合。將「引擎」和「變速箱」作為物件傳遞給 `Car`。

**之前：**
```java
abstract class Car { abstract void drive(); }

class ElectricManualCar extends Car {
    void drive() {
        System.out.println("電動聲音...");
        System.out.println("手動換檔...");
    }
}

class GasManualCar extends Car {
    void drive() {
        System.out.println("轟轟聲...");
        System.out.println("手動換檔..."); // 重複了！
    }
}
```

**之後：**
```java
class Car {
    private Engine engine;
    private Transmission transmission;

    public Car(Engine engine, Transmission transmission) {
        this.engine = engine;
        this.transmission = transmission;
    }

    void drive() {
        engine.start();
        transmission.shift();
    }
}

interface Engine { void start(); }
interface Transmission { void shift(); }

class ElectricEngine implements Engine {
    public void start() { System.out.println("電動聲音..."); }
}

class ManualTransmission implements Transmission {
    public void shift() { System.out.println("手動換檔..."); }
}
```

現在，添加一個 `HybridEngine` 只意味著創建一個新類別，而不是使類別總數倍增。

### 將裝飾移到裝飾器

如果你的物件由彼此包裝的層組成（如一個被緩衝和 GZip 壓縮的 InputStream），使用裝飾器模式。

**之後（裝飾器）：**
```java
// 使用：
DataSource source = new CompressionDecorator(
                        new EncryptionDecorator(
                            new FileDataSource("data.txt")));
source.writeData(salaryRecords);
```

這允許你在運行時動態地混合和匹配行為，而不需要為每種組合創建一個類別。

## 參考資料

- [Refactoring Guru - Combinatorial Explosion](https://refactoring.guru/smells/combinatorial-explosion)
- [Martin Fowler - Composition over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)
