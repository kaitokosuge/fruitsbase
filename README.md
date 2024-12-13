```
npx create-next-app@latest
```

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
