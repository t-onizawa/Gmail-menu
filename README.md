# Gmail-menu

```HTML
<script src="js/sidemenu.js"></script>
<script>
 // スライドさせるアニメーション
	SIDE_MENU.METHOD({
 		mainId: 'container', // スライドするコンテンツを囲うコンテンツのID
 		slideCls: 'slide',   // スライドさせるコンテンツのclass
 		menuId: 'side',      // サイドメニューのID
 		btnId: 'btn'         // 開閉ボタンのID
 	});

 // サイドバーのメニュー用スクロール
 	SIDE_MENU.INNER_SCROLL({
 		scrollId: 'side-inner', // スクロールさせるコンテンツ
 		fixHeaderHeight: 50     // スクロールさせないヘッダー部分
 	});
</script>
```
