# React Hooks

# 1. フックの導入

フックとはステートフルなロジックを共有するための基本機能。ステートをもつロジックを抽出して単独でテストしたり再利用したりすることができる。コンポーネントの階層構造を変えずに再利用できることがポイント。

# 2. フック早わかり

## useState

### useStateの引数

`useState`の引数はステートの初期値。最初のレンダー時にのみ使用される。

### useStateの戻り値

`useState`は現在のステートの値とそれを更新するための関数をペアにして返す。これを配列の分割代入構文で受け取ることができる。

## useEffect

副作用のためのフック。`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`と同様の目的で使うものだが、ひとつのAPIに統合されている。

DOMへの更新を反映した後に`useEffect`で定義する副作用関数が実行される。関数を返却するとこれをクリーンアップとして指定できる。クリーンアップはコンポーネントがアンマウントされる時や副作用が再実行される時に実行される。

## フックのルール

- フックは関数のトップレベルでのみ呼び出す
- フックはReactの関数コンポーネントの内部でのみ呼び出す

## 独自フック

独自フックはステートを用いたロジックを再利用する。ステートそのものを再利用するのではない。従って、フックのそれぞれの呼び出しが独立したステートを持つ。

# 3. ステートフックの利用法

関数コンポーネントはステートレスコンポーネントでなくなる。フックがステートを利用できるようにするから。フックはクラスを書く代わりに使う。

関数コンポーネント内で`useState`を呼び出すことでステート変数を宣言する。戻り値は値と値を更新するための関数。分割代入でこれらを受け取ることができる。

## 所感

値と値を更新するための関数を**用途ごとで一緒**にできることがポイントか。

# 4. 副作用フックの利用法

データの取得/購読やDOMの手動変更などを副作用 (side-effect) あるいは単に作用 (effect) と呼ぶ。

副作用フック`useEffect`はReactライフサイクルの`componentDidMount`と`componentDidUpdate`と`componentWillUnmount`がまとまったもの。

## クリーンアップを必要としない副作用

`useEffect`はマウント後と更新後に呼ばれる。つまりレンダーの後に副作用は起こる。副作用が実行される時点でDOMが正しく更新され終わっていることを保証する。

Reactは再レンダーごとに違う副作用関数スケジュールする。副作用は特定の1回のレンダーと結びつく。なお`useEffect`は`componentDidMount`や`componentDidUpdate`と異なりブラウザによる画面更新をブロックしない。同期的に行う必要がある場合`useLayoutEffect`を利用する。

## クリーンアップを有する副作用

`props`で受け取る値を利用するとき、場合によって`componentDidUpdate`でクリーンアップする必要がある。この処理のし忘れがバグの原因になる。

副作用フックでは`useEffect`の引数にする関数の戻り値でクリーンアップを定義することができる。

### 副作用のスキップによるパフォーマンス改善

副作用のクリーンアップと適用をレンダーごとに繰り返すのはパフォーマンスの面で具合が悪い。これを回避するために、クラスでは`componentDidUpdate`の引数`prevProps`や`prevState`を利用して今回の値と前回の値を比較することができる。

副作用フックでは`useEffect`のふたつめの引数で比較対象を指定することができる。

## 所感

副作用のクリーンアップと適用を**ひとつの定義**にできることがやはりポイント。またこのことでマウント後と更新後を**一緒にしてレンダー後**としてしまえる。関心とコードをよりシームレスにできる気がする。

# 5. フックのルール

フックは関数のトップレベルでのみ呼び出す。これはレンダーごとの順番を常に同じにするため。条件付きで副作用を走らせたい場合は条件をフックの内部に入れることができる。

# 6. 独自フックの作成

カスタムフックはReactの機能というよりフックの設計から自然と導かれる慣習のようなもの。同じフックを使うコンポーネントであっても呼び出しが別なので独立したステートを得る。コンポーネントで直接`useState`や`useEffect`を呼び出すのと同じ。

# 7. フックAPIリファレンス

## 基本のフック

### useState

```
const [state, setState] = useState(initialState);
```

`initialState`は関数にすることができる。初期ステートを高価な計算をして求める場合、初回レンダー時のみ実行するようにできる。

また`setState()`に関数を渡すことができる。この関数は前回のステートの値を受け取り更新された値を返す。

### useEffect

```
useEffect(() => {
    const subscription = props.source.subscribe();
    return () => { 
        subscription.unsubscribe(); 
    };
}, [props.source]);
```

`useEffect`には副作用を起こす関数を渡す。この関数はクリーンアップするための関数を返却するようにできる。`useEffect`のふたつ目の引数に渡す配列の各値が同等のとき、クリーンアップと再度の副作用は実行されない。

### useContext

```
const contextType = useContext(MyContext);
```

上記は次と同等。ただし`static`ではなく`const`にできることに注意。

```
static contextType = MyContext;
```

コンテクストが「グローバル」であることに変わりはない。コンテクストをいつどのように使うかには気をつける。

### useReducer

```
const [state, dispatch] = useReducer(reducer, initialState);
```

または

```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

前者のとき`initialState`がステートの初期値になる。初期値は`props`に依存する可能性があるのでフックの呼び出し位置で指定する。

後者のとき`init(initialArg)`がステートの初期値になる。アクションに応じてステートをリセットする場合にも便利。

### useCallback

```
const handleClick = useCallback(() => { doSomething(a, b); }, [a, b]);
```

メモ化したコールバックを返す。依存している値の配列（`[a, b]`）要素のいずれかが変化したときに関数が変化する。

```
<SomeComponent onClick={handleClick} />
```

メモ化するコールバックを渡す先（`SomeComponent`）が参照の同一性を見るよう最適化されたコンポーネントでないと`useCallback`を使う意味はないか？（See: [PureComponent](https://ja.reactjs.org/docs/react-api.html#reactpurecomponent), [React.memo](https://ja.reactjs.org/docs/react-api.html#reactmemo)）

### useMemo

```
const value = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

メモ化した値を返す。レンダーごとに高価な計算が実行されることを避けることができる。

`useMemo`はパフォーマンスの最適化のためだけに使うことができる。Reactはメモ化した値を「忘れる」ようにする可能性がある。`useMemo`なしでも動作するコードを書くこと。

### useRef

```
const el = useRef<ElementType>(initialValue);
```

`.current`プロパティをもつミュータブルなオブジェクトを返す。

書き換え可能な値を`.current`プロパティ内に保持する「箱」のようなもの。オブジェクトはコンポーネントの存在期間全体に渡って存在し続ける。つまり毎回のレンダーで同じオブジェクトを返す。

`useRef`は`.current`プロパティが変更されてもそのことを通知しないことに注意。マウント/アンマウント時にコードを実行したい場合コールバックrefを使用する。

### useImperativeHandle

```
useImperativeHandle(ref, createHandle, [deps]);
```

親コンポーネントに渡されるインスタンス値をカスタマイズする。コンポーネントに直接の操作を付与できる。

`forwardRef`と組み合わせてコンポーネントを`export`する。

### useLayoutEffect

`useEffect`と同じだが、DOMの変更があった後で同期的に副作用が呼び出される。DOMからレイアウトを呼び出して同期的に再描画する場合に使う（？）。

### useDebugValue

DevToolsでカスタムフックのラベルを表示する。