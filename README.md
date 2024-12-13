<details>
<summary>選定技術</summary>
<h4>プログラミング言語</h4>
TypeScript

<h4>フレームワーク</h4>
Next.js

<h4>認証・認可</h4>
clerk

<h4>DB</h4>
supabase(pgsql)

<h4>ORM</h4>
prisma

<h4>テストフレームワーク</h4>
Vitest

<h4>API モック</h4>
msw

<h4>データ通信</h4>
axios

<h4>スタイル</h4>
tailwind css

<h4>コードスタイル</h4>
eslint,prettier

<h4>CI</h4>
github actions

<h4>デプロイ</h4>
vercel

</details>

<details>
<summary>start</summary>
node
20.12.2

next.js 15.1.0

```
npx create-next-app@latest
```

</details>
<details>
<summary>testing setup</summary>
<h2>Vitest インストール</h2>

```
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom
```

<p>vitest.config.ts</p>

```
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
    environment: 'jsdom',
    },
})
```

package.json に test コマンドを追加

```
{
    "scripts": {
        ...
        "test": "vitest"
    }
}

```

<p>カバレッジライブラリインストール</p>

```

npm i -D @vitest/coverage-v8

```

vitest.config.ts

```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8'
    },
  },
})
```

package.json

```
{
  "scripts": {
    ...
    "coverage": "vitest run --coverage"
  }
}
```

レポーターを追加

```
test: {
	environment: "jsdom",
	coverage: {
      //追加
	  reporter: ["text", "json-summary", "html"],
	  provider: "v8",
	},
},

```

カバレッジ対象外を指定

```
coverage: {
	reporter: ["text", "json-summary", "html"],
	provider: "v8",
    //追加
	exclude: [
		"lib/**/*",
		"**/*.test.tsx",
		".next",
		"next.config.js",
		"postcss.config.js",
		"tailwind.config.ts",
		"vitest.config.ts",
	],
	reportOnFailure: true,
},
```

参考資料<br/>
Next.js×Vitest に関して  
https://ja.next-community-docs.dev/docs/app/building-your-application/testing/vitest

カバレッジに関して  
https://vitest.dev/guide/coverage

カバレッジレポーターに関して  
https://github.com/marketplace/actions/vitest-coverage-report

## msv インストール

```
npm install msw@latest --save-dev
```

handler でインターセプトするリクエストとモックデータを定義  
↓  
hello.tsx のテストコードで利用

参考資料  
msw  
https://mswjs.io/docs/getting-started

setupserver  
https://mswjs.io/docs/api/setup-server/

## CI

test,codecheck job を定義し、プルリクエスト作成時に実行。coverage の視覚情報も見れるようにする

![](/public/coverage.png)

</details>
