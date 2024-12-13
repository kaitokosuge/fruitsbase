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

<details>
<summary>auth & DB setup</summary>

```
npm install @clerk/nextjs
```

env ファイルへ提供された環境変数をセット

middleware.ts に api を監視させる

```
matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
```

layout.tsx で clerk provider を設定

```
<ClerkProvider></ClerkProvider>
```

↓  
clerk dashboard で webhook を定義する。（https のみ使えるため、ngrok で簡易デプロイする）  
↓  
webhook を作成すると`SIGNING_SECRET`が発行されるため環境変数として定義

## prisma インストール

```
npm install prisma --save-dev
```

スキーマファイル生成

```
npx prisma init
```

ユーザースキーマ定義

```
model User {
  id            String    @id @default(cuid())
  clerkId       String    @unique
  username      String?
  name          String?
  bio           String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  email         String    @unique
}
```

↓  
supabase で DB を作成し、環境変数に DB URL を記載

マイグレート

```
npx prisma migrate dev --name init
```

svix install

```
svix
```

参考資料

clerk×Next.js に関して  
https://clerk.com/docs/quickstarts/nextjs

prisma  
https://www.prisma.io/docs/orm/tools/prisma-cli#installation

prisma×Next.js に関して
https://vercel.com/guides/nextjs-prisma-postgres

prisma migrate  
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/using-prisma-migrate-typescript-postgresql

prisma best practice  
https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

</details>
