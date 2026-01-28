# 実装計画（MVP）

作成日: 2026-01-29

## 現状
- Shared の値オブジェクト: Money, ItemQuantity, Address を実装済み
- 上記のユニットテストを実装済み

## 実装方針
- DDD を意識し、ドメイン層はフレームワーク非依存
- ユースケース単位でテスト可能な構造
- 依存方向は Shared → Catalog/Sales → App（外側）

---

## フェーズ1: Shared の追加値オブジェクト
1. Email 値オブジェクト
2. PhoneNumber 値オブジェクト

目的: 注文作成時の buyer 情報を表現できるようにする

---

## フェーズ2: Catalog モジュール（商品閲覧）
3. Product 集約
   - ProductId 値オブジェクト
   - Product エンティティ（id, name, price, status）
   - ProductStatus（Active/Inactive）
4. リポジトリインターフェース
   - IProductRepository
5. ユースケース
   - ListProducts
   - GetProductDetail
6. API
   - GET /products
   - GET /products/{id}

---

## フェーズ3: Sales モジュール - Cart
7. Cart 集約
   - CartId 値オブジェクト
   - CartItem エンティティ
   - Cart 集約ルート（追加・変更・削除）
8. リポジトリインターフェース
   - ICartRepository
9. ユースケース
   - AddItemToCart
   - ChangeCartItemQuantity
   - RemoveItemFromCart
   - GetCart
10. API
   - GET /cart
   - POST /cart/items
   - PATCH /cart/items/{productId}
   - DELETE /cart/items/{productId}

---

## フェーズ4: Sales モジュール - Order
11. Order 集約
   - OrderId 値オブジェクト
   - OrderNumber 値オブジェクト
   - OrderLine エンティティ
   - OrderStatus（Pending/Confirmed/Cancelled）
   - Buyer 値オブジェクト（name, email, phone）
   - Order 集約ルート（作成・キャンセル）
12. リポジトリインターフェース
   - IOrderRepository
13. ユースケース
   - Checkout
   - GetOrders
   - GetOrderDetail
   - CancelOrder
14. API
   - POST /orders
   - GET /orders
   - GET /orders/{id}
   - POST /orders/{id}/cancel

---

## フェーズ5: ドメインイベント
15. イベント定義
   - CartItemAdded
   - OrderPlaced
16. イベントハンドラー
   - ログ出力などの副作用

---

## フェーズ6: インフラストラクチャ層
17. DB 設定（TypeORM or Prisma）
18. リポジトリ実装
   - ProductRepository
   - CartRepository
   - OrderRepository
19. 永続化テスト

---

## フェーズ7: E2E テスト
20. 主要フローの E2E テスト
   - 商品閲覧
   - カート操作
   - 注文作成・キャンセル
