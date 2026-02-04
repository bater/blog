---
sidebar_position: 9
title: 古怪解法
---

# 古怪解法

「古怪解法」是當一個問題在整個系統中以一種方式解決，但在某個特定的地方卻以完全不同的方式解決。這是讓開發者困惑的不一致性。

如果十次中有九次你使用 `HttpClient` 來發送請求，但有一個類別透過命令列使用 `curl`，那就是古怪解法。如果大家都使用 `Log4j` 但有一個開發者決定使用 `System.out.println` 或他們自己的自定義引用，那就是古怪。

## 氣味的跡象

- 不一致的函式庫（例如，使用兩個不同的 JSON 解析器）。
- 不一致的命名慣例。
- 以兩種都算有效但不同的方式解決同一個問題（例如，日期格式化）。

## 氣味的原因

**缺乏溝通**：不同的團隊或開發者解決同一個問題而沒有檢查現有的解決方案。
**從網路複製貼上**：從使用與專案不同風格的部落格複製解決方案。

## 重構配方

- 替換演算法
- 統一介面

### 替換演算法

用其他地方使用的標準解決方案替換古怪的程式碼。

**之前：**
```java
// 專案中的標準方式：
List<String> userNames = users.stream().map(User::getName).collect(Collectors.toList());

// 某個特定類別中的古怪方式：
List<String> adminNames = new ArrayList<>();
for (int i=0; i<admins.size(); i++) {
    adminNames.add(admins.get(i).getName());
}
```

**之後：**
```java
// 一致使用 Streams
List<String> adminNames = admins.stream().map(Admin::getName).collect(Collectors.toList());
```

### 用轉接器統一介面

如果你必須使用兩個不同的函式庫，用一個共同的轉接器介面包裝它們，這樣應用程式的其他部分就看不到差異。

## 參考資料

- [Refactoring - Oddball Solution](https://sourcemaking.com/refactoring/smells/oddball-solution)
