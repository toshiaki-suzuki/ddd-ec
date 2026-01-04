ECサイト MVP 要件定義書

1. 目的

本ドキュメントは、ドメイン駆動設計（DDD）を用いたアプリケーション実装の練習台として構築する EC サイト（MVP）の要件を定義するものである。

本 MVP では以下を主目的とする。
	•	DDD に基づくモジュール分割（擬似的な Bounded Context）を実践する
	•	集約・値オブジェクト・ユースケースの責務を明確に分離する
	•	注文を中心とした典型的な EC ドメインモデルを実装する

2. スコープ

2.1 対象範囲（MVP）
	•	商品閲覧（Catalog）
	•	カート操作および注文作成（Sales）

2.2 対象外（将来拡張）
	•	在庫管理（Inventory）
	•	決済処理（Payment）
	•	配送管理（Shipping）
	•	クーポン、ポイント、レビュー、検索高度化

3. システム構成（前提）
	•	単一アプリケーション（モノリス）として実装する
	•	内部構造はモジュール単位で分離し、DDD の Bounded Context を模倣する
	•	API + Web/SPA いずれでも可（UI 技術は要件外）
	•	データストアは 1 つ（RDB 前提、実装依存）

4. モジュール構成

4.1 Catalog モジュール

商品情報の参照専用コンテキスト。

責務:
	•	商品一覧の取得
	•	商品詳細の取得

4.2 Sales モジュール

カートおよび注文を扱う中心コンテキスト。

責務:
	•	カート操作
	•	注文作成（Checkout）
	•	注文履歴の参照

4.3 Shared モジュール

複数コンテキストで共有される最小限の概念のみを配置する。

例:
	•	Money
	•	Quantity
	•	Address

5. 機能要件

5.1 商品閲覧機能（Catalog）
	•	商品一覧を取得できる
	•	商品詳細を取得できる
	•	非アクティブな商品は購入不可とする

5.2 カート機能（Sales）
	•	商品をカートに追加できる
	•	カート内商品の数量を変更できる
	•	カート内商品を削除できる

制約:
	•	数量は 1〜99 の範囲
	•	商品が非アクティブの場合は追加不可

5.3 注文作成機能（Checkout）
	•	カートの内容から注文を作成できる
	•	注文作成時に以下の情報を入力する
	•	配送先住所
	•	受取人名
	•	メールアドレス
	•	電話番号

制約:
	•	注文確定後、注文内容（商品・単価・数量）は変更不可
	•	注文は作成時点の価格スナップショットを保持する

5.4 注文参照機能
	•	注文履歴を取得できる
	•	注文詳細を取得できる

5.5 注文キャンセル機能
	•	Pending 状態の注文のみキャンセル可能とする

6. ドメインモデル概要

6.1 集約

Product（Catalog）
	•	productId
	•	name
	•	price: Money
	•	status: Active | Inactive

Cart（Sales）
	•	cartId
	•	items: CartItem[]

Order（Sales）
	•	orderId
	•	orderNumber
	•	lines: OrderLine[]
	•	shippingAddress: Address
	•	buyer
	•	status
	•	totalAmount: Money

6.2 値オブジェクト
	•	Money（JPY 固定、0以上）
	•	Quantity（1〜99）
	•	Address
	•	Email
	•	PhoneNumber

7. 状態遷移

Order.status
	•	Pending
	•	Confirmed
	•	Cancelled

遷移ルール:
	•	Pending → Confirmed（Checkout 完了）
	•	Pending → Cancelled（ユーザー操作）
	•	Confirmed → Cancelled（不可）

8. ユースケース一覧

Catalog
	•	ListProducts
	•	GetProductDetail

Sales
	•	AddItemToCart
	•	ChangeCartItemQuantity
	•	RemoveItemFromCart
	•	Checkout
	•	GetCart
	•	GetOrders
	•	GetOrderDetail
	•	CancelOrder

9. ドメインイベント（MVP）
	•	CartItemAdded
	•	OrderPlaced

※ 副作用（通知・ログ等）はイベントハンドラで処理する

10. API 一覧（参考）
	•	GET /products
	•	GET /products/{id}
	•	GET /cart
	•	POST /cart/items
	•	PATCH /cart/items/{productId}
	•	DELETE /cart/items/{productId}
	•	POST /orders
	•	GET /orders
	•	GET /orders/{id}
	•	POST /orders/{id}/cancel

11. 非機能要件（最低限）
	•	ドメイン層はフレームワーク非依存とする
	•	ユースケース単位でテスト可能な構造とする
	•	モジュール間の依存方向を明示的に制御する

12. 今後の拡張予定
	•	Inventory モジュール追加（在庫引当）
	•	Payment モジュール追加（疑似決済）
	•	Shipping モジュール追加（出荷管理）